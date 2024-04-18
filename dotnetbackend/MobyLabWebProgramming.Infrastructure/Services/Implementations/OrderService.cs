using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Migrations;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Net;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class OrderService : IOrderService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public OrderService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<OrderDTO>> GetOrder(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new OrderProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ?
            ServiceResponse<OrderDTO>.ForSuccess(result) :
            ServiceResponse<OrderDTO>.FromError(CommonErrors.OrderNotFound); // Pack the result or error into a ServiceResponse.
    }
    public async Task<ServiceResponse<PagedResponse<OrderDTO>>> GetOrders(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new OrderProjectionSpec(), cancellationToken); // Use the specification and pagination API to get only some entities from the database.
        return ServiceResponse<PagedResponse<OrderDTO>>.ForSuccess(result);
    }



    public async Task<ServiceResponse> AddOrder(OrderAddDTO order, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only logged in can add orders", ErrorCodes.CannotAdd));
        }

        var newOrder = await _repository.AddAsync(new Order
        {
            UserId = order.UserId,
            AddressId = order.AddressId,
        }, cancellationToken);

        // Create a list to store the newly added OrderBooks

        // Iterate over each book in order.OrderBooks and add it to the database
        foreach (var book in order.OrderBooks)
        {
            await _repository.AddAsync(new OrderBook
            {
                OrderId = newOrder.Id,
                BookId = book.BookId,
                Quantity = book.Quantity
            }, cancellationToken);

        }

        return ServiceResponse.ForSuccess();
    }


    public async Task<ServiceResponse> UpdateOrder(OrderUpdateDTO order, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Id != order.UserId)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the own user can update the book!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new OrderSpec(order.Id), cancellationToken);

        if (entity != null)
        {
            /*entity.UserId = order.UserId ?? entity.UserId;
            entity.AddressId = order.AddressId ?? entity.AddressId;*/
            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse> DeleteOrder(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete the order!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Order>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
using MobyLabWebProgramming.Core.Constants;
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

public class AddressService : IAddressService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public AddressService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<AddressDTO>> GetAddress(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new AddressProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ?
            ServiceResponse<AddressDTO>.ForSuccess(result) :
            ServiceResponse<AddressDTO>.FromError(CommonErrors.AddressNotFound); // Pack the result or error into a ServiceResponse.
    }
    public async Task<ServiceResponse<PagedResponse<AddressDTO>>> GetAddresss(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new AddressProjectionSpec(), cancellationToken); // Use the specification and pagination API to get only some entities from the database.
        return ServiceResponse<PagedResponse<AddressDTO>>.ForSuccess(result);
    }



    public async Task<ServiceResponse> AddAddress(AddressAddDTO address, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the logged in can add address!", ErrorCodes.CannotAdd));
        }

        /*var result = await _repository.GetAsync(new BookSpec(book.Title, book.AuthorId, book.PublisherId, book.Year), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The book already exists!", ErrorCodes.BookAlreadyExists));
        }*/
        await _repository.AddAsync(new Address
        {
            AddressField1 = address.AddressField1,
            AddressField2 = address.AddressField2,
            City = address.City,
            Country = address.Country,
            ZipCode = address.ZipCode,
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }


    public async Task<ServiceResponse> UpdateAddress(AddressUpdateDTO address, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the address!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new AddressSpec(address.Id), cancellationToken);

        if (entity != null)
        {
            entity.AddressField1 = address.AddressField1 ?? entity.AddressField1;
            entity.AddressField2 = address.AddressField2 ?? entity.AddressField2;
            entity.City = address.City ?? entity.City;
            entity.Country = address.Country ?? entity.Country;
            entity.ZipCode = address.ZipCode ?? entity.ZipCode;

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse> DeleteAddress(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete the address!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Address>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
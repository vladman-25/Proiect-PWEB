using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Net;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class PublisherService : IPublisherService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public PublisherService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<PublisherDTO>> GetPublisher(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new PublisherProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ?
            ServiceResponse<PublisherDTO>.ForSuccess(result) :
            ServiceResponse<PublisherDTO>.FromError(CommonErrors.PublisherNotFound); // Pack the result or error into a ServiceResponse.
    }
    public async Task<ServiceResponse<PagedResponse<PublisherDTO>>> GetPublishers(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new PublisherProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.
        return ServiceResponse<PagedResponse<PublisherDTO>>.ForSuccess(result);
    }



    public async Task<ServiceResponse> AddPublisher(PublisherAddDTO publisher, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add publishers!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new PublisherSpec(publisher.Name, publisher.Address, publisher.Phone), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The publisher already exists!", ErrorCodes.PublisherAlreadyExists));
        }

        await _repository.AddAsync(new Publisher
        {
            Name = publisher.Name,
            Address = publisher.Address,
            Phone = publisher.Phone
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }


    public async Task<ServiceResponse> UpdatePublisher(PublisherUpdateDTO publisher, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the publisher!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new PublisherSpec(publisher.Id), cancellationToken);

        if (entity != null)
        {
            entity.Name = publisher.Name ?? entity.Name;
            entity.Address = publisher.Address ?? entity.Address;
            entity.Phone = publisher.Phone ?? entity.Phone;

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse> DeletePublisher(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete the publisher!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Publisher>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}

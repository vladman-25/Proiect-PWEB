using MobyLabWebProgramming.Core.Constants;
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

public class FeedbackService : IFeedbackService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public FeedbackService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<int>> GetFeedbackCount(CancellationToken cancellationToken = default) =>
       ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<Feedback>(cancellationToken)); // Get the count of all user entities in the database.
    public async Task<ServiceResponse<FeedbackDTO>> GetFeedback(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new FeedbackProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ?
            ServiceResponse<FeedbackDTO>.ForSuccess(result) :
            ServiceResponse<FeedbackDTO>.FromError(CommonErrors.FeedbackNotFound); // Pack the result or error into a ServiceResponse.
    }
    public async Task<ServiceResponse<PagedResponse<FeedbackDTO>>> GetFeedbacks(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new FeedbackProjectionSpec(), cancellationToken); // Use the specification and pagination API to get only some entities from the database.
        return ServiceResponse<PagedResponse<FeedbackDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddFeedback(FeedbackAddDTO Feedback, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the logged in can add feedback", ErrorCodes.CannotAdd));
        }

        await _repository.AddAsync(new Feedback
        {
            Descriere = Feedback.Descriere,
            Experienta = Feedback.Experienta,
            Nota = Feedback.Nota,
            Likes = Feedback.Likes,
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteFeedback(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete the Feedback!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Feedback>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
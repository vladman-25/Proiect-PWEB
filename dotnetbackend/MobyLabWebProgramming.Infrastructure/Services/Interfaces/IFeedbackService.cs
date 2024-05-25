using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IFeedbackService
{
    public Task<ServiceResponse<int>> GetFeedbackCount(CancellationToken cancellationToken = default);
    public Task<ServiceResponse<FeedbackDTO>> GetFeedback(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<FeedbackDTO>>> GetFeedbacks(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddFeedback(FeedbackAddDTO address, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteFeedback(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}

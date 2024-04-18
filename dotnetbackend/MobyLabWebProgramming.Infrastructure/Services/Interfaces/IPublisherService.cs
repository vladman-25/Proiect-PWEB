using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IPublisherService
{
    public Task<ServiceResponse<int>> GetPublisherCount(CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PublisherDTO>> GetPublisher(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<PublisherDTO>>> GetPublishers(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddPublisher(PublisherAddDTO publisher, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdatePublisher(PublisherUpdateDTO publisher, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeletePublisher(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}

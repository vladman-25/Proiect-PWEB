using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IAddressService
{
    public Task<ServiceResponse<AddressDTO>> GetAddress(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<AddressDTO>>> GetAddresss(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddAddress(AddressAddDTO address, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateAddress(AddressUpdateDTO address, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteAddress(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}

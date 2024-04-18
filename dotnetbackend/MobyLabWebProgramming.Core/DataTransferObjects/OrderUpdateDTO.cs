using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record OrderUpdateDTO(Guid Id, Guid UserId, Guid AddressId);

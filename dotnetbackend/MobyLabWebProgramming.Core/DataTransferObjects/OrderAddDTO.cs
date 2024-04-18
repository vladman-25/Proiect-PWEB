using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class OrderAddDTO
{

    public Guid UserId { get; set; }
    public Guid AddressId { get; set; }
    public ICollection<OrderBook> OrderBooks { get; set; } = default!;
}

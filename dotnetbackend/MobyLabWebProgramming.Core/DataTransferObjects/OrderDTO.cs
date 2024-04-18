using MobyLabWebProgramming.Core.Entities;
namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class OrderDTO
{
    public Guid Id { get; set; }
    public User User { get; set; } = default!;
    public Address Address { get; set; } = default!;
    public ICollection<OrderBook> OrderBooks { get; set; } = default!;
}

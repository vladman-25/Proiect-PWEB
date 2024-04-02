namespace MobyLabWebProgramming.Core.Entities;

public class OrderBook : BaseEntity
{
    public Order Order { get; set; } = default!;
    public Book Book { get; set; } = default!;
    public int Quantity { get; set; } = default!;
}

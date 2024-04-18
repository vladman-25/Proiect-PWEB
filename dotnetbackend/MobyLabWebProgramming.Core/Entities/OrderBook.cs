namespace MobyLabWebProgramming.Core.Entities;

public class OrderBook : BaseEntity
{
    public Guid OrderId { get; set; } = default!;
    /*public Book Book { get; set; } = default!;*/
    public Guid BookId { get; set; } = default!;
    public int Quantity { get; set; } = default!;
}

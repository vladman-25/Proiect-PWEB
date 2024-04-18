namespace MobyLabWebProgramming.Core.Entities;

public class Order : BaseEntity
{
    public float Total { get; set; } = default!;
    public User User { get; set; } = default!;
    public Guid UserId { get; set; }
    public Address Address { get; set; } = default!;
    public Guid AddressId { get; set; }

    public ICollection<Book> Books { get; set; } = default!;

    public ICollection<OrderBook> OrderBooks { get; set; } = default!;
}

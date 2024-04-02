namespace MobyLabWebProgramming.Core.Entities;

public class Order : BaseEntity
{
    public Address Address { get; set; } = default!;
    public float Total { get; set; } = default!;
    public User User { get; set; } = default!;
}

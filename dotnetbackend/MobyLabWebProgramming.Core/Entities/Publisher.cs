namespace MobyLabWebProgramming.Core.Entities;

public class Publisher : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Address { get; set; } = default!;
    public string Phone { get; set; } = default!;

}

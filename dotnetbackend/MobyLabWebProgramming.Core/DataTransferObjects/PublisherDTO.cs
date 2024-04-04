namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class PublisherDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Address { get; set; } = default!;
    public string Phone { get; set; } = default!;
}

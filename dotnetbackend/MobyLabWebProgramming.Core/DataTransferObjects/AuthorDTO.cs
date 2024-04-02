namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class AuthorDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Surname { get; set; } = default!;
}
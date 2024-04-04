using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class BookAddDTO
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Year { get; set; } = default!;
    public float Price { get; set; } = default!;
    public Guid AuthorId { get; set; }
    public Guid PublisherId  { get; set; }
    public BookGenreEnum Genre { get; set; } = default!;
}

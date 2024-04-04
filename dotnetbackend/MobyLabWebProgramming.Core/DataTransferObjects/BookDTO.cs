using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class BookDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Year { get; set; } = default!;
    public float Price { get; set; } = default!;
    public Author Author { get; set; } = default!;
    public Publisher Publisher { get; set; } = default!;
    public BookGenreEnum Genre { get; set; } = default!;
}

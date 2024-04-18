using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class Book : BaseEntity {
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Year { get; set; } = default!;
    public float Price { get; set; } = default!;

    public Author Author { get; set; } = default!;
    public Guid AuthorId { get; set; }
    public Publisher Publisher { get; set; } = default!;
    public Guid PublisherId { get; set; }
    public BookGenreEnum Genre { get; set; } = default!;

    public ICollection<Order> Orders { get; set; } = default!;
}


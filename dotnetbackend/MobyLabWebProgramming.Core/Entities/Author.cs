using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class Author : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Surname { get; set; } = default!;

    public ICollection<Book> Books { get; set; } = default!;
 /*   public ICollection<BookGenreEnum> Genres { get; set; } = default!;*/
}

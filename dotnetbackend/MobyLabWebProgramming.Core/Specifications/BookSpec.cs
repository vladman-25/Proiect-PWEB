using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class BookSpec : BaseSpec<BookSpec, Book>
{
    public BookSpec(Guid id) : base(id)
    {
    }
    public BookSpec(string title, Guid authorId, Guid publisherId, int year)
    {
        Query.Where(e => e.Title == title && e.AuthorId == authorId && e.PublisherId == publisherId && e.Year == year);
    }
}

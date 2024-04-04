using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;


public sealed class BookProjectionSpec : BaseSpec<BookProjectionSpec, Book, BookDTO>
{
    protected override Expression<Func<Book, BookDTO>> Spec => e => new()
    {
        Id = e.Id,
        Title = e.Title,
        Description = e.Description,
        Year = e.Year,
        Price = e.Price,
        Author = new()
        {
            Id = e.Author.Id,
            Name = e.Author.Name,
            Surname = e.Author.Surname,
        },
        Publisher = new()
        {
            Id = e.Publisher.Id,
            Name = e.Publisher.Name,
            Address = e.Publisher.Address,
            Phone = e.Publisher.Phone
        },
        Genre = e.Genre
    };

    public BookProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public BookProjectionSpec(Guid id) : base(id)
    {
    }

    public BookProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Title, searchExpr));
    }
}

using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;


public sealed class AuthorProjectionSpec : BaseSpec<AuthorProjectionSpec, Author, AuthorDTO>
{
    protected override Expression<Func<Author, AuthorDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        Surname = e.Surname
    };

    public AuthorProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public AuthorProjectionSpec(Guid id) : base(id)
    {
    }

    public AuthorProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Surname, searchExpr));
    }
}

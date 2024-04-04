using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;


public sealed class PublisherProjectionSpec : BaseSpec<PublisherProjectionSpec, Publisher, PublisherDTO>
{
    protected override Expression<Func<Publisher, PublisherDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        Address = e.Address,
        Phone = e.Phone 
    };

    public PublisherProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public PublisherProjectionSpec(Guid id) : base(id)
    {
    }

    public PublisherProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}
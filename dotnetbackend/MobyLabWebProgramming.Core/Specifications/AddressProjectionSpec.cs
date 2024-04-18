using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;


public sealed class AddressProjectionSpec : BaseSpec<AddressProjectionSpec, Address, AddressDTO>
{
    protected override Expression<Func<Address, AddressDTO>> Spec => e => new()
    {
        Id = e.Id,
        AddressField1 = e.AddressField1,
        AddressField2 = e.AddressField2,
        City = e.City,
        Country = e.Country,
        ZipCode = e.ZipCode,
    };

    public AddressProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public AddressProjectionSpec(Guid id) : base(id)
    {
    }
}

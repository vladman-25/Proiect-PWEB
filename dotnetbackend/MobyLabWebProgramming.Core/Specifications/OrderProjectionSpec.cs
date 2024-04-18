using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;


public sealed class OrderProjectionSpec : BaseSpec<OrderProjectionSpec, Order, OrderDTO>
{
    protected override Expression<Func<Order, OrderDTO>> Spec => e => new()
    {
        Id = e.Id,
        User = new()
        {
            Id = e.User.Id,
            Name = e.User.Name,
        },
        Address = new()
        {
            Id = e.Address.Id,
            AddressField1 = e.Address.AddressField1,
            AddressField2 = e.Address.AddressField2,
            City = e.Address.City,
            Country = e.Address.Country,
            ZipCode = e.Address.ZipCode,
        },
        OrderBooks = e.OrderBooks
    };

    public OrderProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public OrderProjectionSpec(Guid id) : base(id)
    {
    }
}

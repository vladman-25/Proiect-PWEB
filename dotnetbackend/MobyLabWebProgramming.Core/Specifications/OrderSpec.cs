﻿using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class OrderSpec : BaseSpec<OrderSpec, Order>
{
    public OrderSpec(Guid id) : base(id)
    {
    }
}
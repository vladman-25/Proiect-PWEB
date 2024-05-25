using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Specifications;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Linq.Expressions;

public sealed class FeedbackProjectionSpec : BaseSpec<FeedbackProjectionSpec, Feedback, FeedbackDTO>
{
    protected override Expression<Func<Feedback, FeedbackDTO>> Spec => e => new()
    {
        Id = e.Id,
        Descriere = e.Descriere,
        Nota = e.Nota,
        Likes = e.Likes,
        Experienta = e.Experienta
    };

    public FeedbackProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public FeedbackProjectionSpec(Guid id) : base(id)
    {
    }
}
using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class AuthorSpec : BaseSpec<AuthorSpec, Author>
{
    public AuthorSpec(Guid id) : base(id)
    {
    }

    public AuthorSpec(string name, string surname)
    {
        Query.Where(e => e.Name == name && e.Surname == surname);
    }
}
using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class PublisherSpec : BaseSpec<PublisherSpec, Publisher>
{
    public PublisherSpec(Guid id) : base(id)
    {
    }

    public PublisherSpec(string name, string address, string phone)
    {
        Query.Where(e => e.Name == name && e.Address == address && e.Phone == phone);
    }
}

namespace MobyLabWebProgramming.Core.Entities;

public class Address : BaseEntity
{
    public string AddressField1 { get; set; } = default!;
    public string AddressField2 { get; set; } = default!;
    public string City { get; set; } = default!;
    public string Country { get; set; } = default!;
    public string ZipCode { get; set; } = default!;

}

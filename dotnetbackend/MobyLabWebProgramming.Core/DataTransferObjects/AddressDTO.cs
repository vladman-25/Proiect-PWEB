namespace MobyLabWebProgramming.Core.DataTransferObjects;


/*
 * public string AddressField1 { get; set; } = default!;
    public string AddressField2 { get; set; } = default!;
    public string City { get; set; } = default!;
    public string Country { get; set; } = default!;
    public string ZipCode { get; set; } = default!;
 */
public class AddressDTO
{
    public Guid Id { get; set; }
    public string AddressField1 { get; set; } = default!;
    public string AddressField2 { get; set; } = default!;
    public string City { get; set; } = default!;
    public string Country { get; set; } = default!;
    public string ZipCode { get; set; } = default!;
}

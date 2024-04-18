namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record AddressUpdateDTO(Guid Id, 
    string? AddressField1 = default, 
    string? AddressField2 = default,
    string? City = default,
    string? Country = default,
    string? ZipCode = default);
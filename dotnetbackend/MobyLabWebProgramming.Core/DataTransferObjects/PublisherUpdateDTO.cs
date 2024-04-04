namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record PublisherUpdateDTO(Guid Id, string? Name = default, string? Address = default, string? Phone = default);
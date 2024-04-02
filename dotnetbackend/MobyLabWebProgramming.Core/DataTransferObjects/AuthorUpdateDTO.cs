namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record AuthorUpdateDTO(Guid Id, string? Name = default, string? Surname = default);

using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record BookUpdateDTO(Guid Id, 
    string? Title = default, 
    string? Description = default,
    int? Year = default,
    float? Price = default,
    Guid? AuthorId = default,
    Guid? PublisherId = default,
    BookGenreEnum? Genre = default);
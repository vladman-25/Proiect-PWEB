﻿using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a user entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class Feedback : BaseEntity
{
    public string Descriere { get; set; } = default!;
    public Boolean Experienta { get; set; } = default!;
    public FeedbackSelectEnum Nota { get; set; } = default!;
    public ICollection<FeedbackCheckbox> Likes { get; set; } = default!;

}

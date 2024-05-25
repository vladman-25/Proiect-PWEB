using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class FeedbackDTO
{
    public Guid Id { get; set; }
    public string Descriere { get; set; } = default!;
    public Boolean Experienta { get; set; } = default!;
    public FeedbackSelectEnum Nota { get; set; } = default!;
    public ICollection<FeedbackCheckbox> Likes { get; set; } = default!;
}

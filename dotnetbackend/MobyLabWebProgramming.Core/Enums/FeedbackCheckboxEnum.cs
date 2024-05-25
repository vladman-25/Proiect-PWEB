using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

/// <summary>
/// This is and example of a smart enum, you can modify it however you see fit.
/// Note that the class is decorated with a JsonConverter attribute so that it is properly serialized as a JSON.
/// </summary>
[JsonConverter(typeof(SmartEnumNameConverter<FeedbackCheckboxEnum, string>))]
public sealed class FeedbackCheckboxEnum : SmartEnum<FeedbackCheckboxEnum, string>
{
    public static readonly FeedbackCheckboxEnum Speed = new(nameof(Speed), "Speed");
    public static readonly FeedbackCheckboxEnum Responsive = new(nameof(Responsive), "Responsive");
    public static readonly FeedbackCheckboxEnum Accessible = new(nameof(Accessible), "Accessible");
    public static readonly FeedbackCheckboxEnum WebPages = new(nameof(WebPages), "WebPages");
    private FeedbackCheckboxEnum(string name, string value) : base(name, value)
    {
    }
}

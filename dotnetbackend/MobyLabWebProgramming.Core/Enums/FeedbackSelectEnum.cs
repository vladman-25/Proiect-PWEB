using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

/// <summary>
/// This is and example of a smart enum, you can modify it however you see fit.
/// Note that the class is decorated with a JsonConverter attribute so that it is properly serialized as a JSON.
/// </summary>
[JsonConverter(typeof(SmartEnumNameConverter<FeedbackSelectEnum, string>))]
public sealed class FeedbackSelectEnum : SmartEnum<FeedbackSelectEnum, string>
{
    public static readonly FeedbackSelectEnum Nota1 = new(nameof(Nota1), "Nota1");
    public static readonly FeedbackSelectEnum Nota2 = new(nameof(Nota2), "Nota2");
    public static readonly FeedbackSelectEnum Nota3 = new(nameof(Nota3), "Nota3");
    public static readonly FeedbackSelectEnum Nota4 = new(nameof(Nota4), "Nota4");
    public static readonly FeedbackSelectEnum Nota5 = new(nameof(Nota5), "Nota5");
    private FeedbackSelectEnum(string name, string value) : base(name, value)
    {
    }
}

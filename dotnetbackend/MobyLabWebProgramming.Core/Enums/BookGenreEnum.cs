using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

/// <summary>
/// This is and example of a smart enum, you can modify it however you see fit.
/// Note that the class is decorated with a JsonConverter attribute so that it is properly serialized as a JSON.
/// </summary>
[JsonConverter(typeof(SmartEnumNameConverter<BookGenreEnum, string>))]
public sealed class BookGenreEnum : SmartEnum<BookGenreEnum, string>
{
    public static readonly BookGenreEnum Thriller = new(nameof(Thriller), "Thriller");
    public static readonly BookGenreEnum Romance = new(nameof(Romance), "Romance");
    public static readonly BookGenreEnum Mystery = new(nameof(Mystery), "Mystery");
    public static readonly BookGenreEnum Fantasy = new(nameof(Fantasy), "Fantasy");
    public static readonly BookGenreEnum Dystopian = new(nameof(Dystopian), "Dystopian");
    public static readonly BookGenreEnum Classic = new(nameof(Classic), "Classic");
    public static readonly BookGenreEnum Fiction = new(nameof(Fiction), "Fiction");
    private BookGenreEnum(string name, string value) : base(name, value)
    {
    }
}

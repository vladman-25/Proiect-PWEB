﻿using System.Net;

namespace MobyLabWebProgramming.Core.Errors;

/// <summary>
/// Common error messages that may be reused in various places in the code.
/// </summary>
public static class CommonErrors
{
    public static ErrorMessage UserNotFound => new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage FileNotFound => new(HttpStatusCode.NotFound, "File not found on disk!", ErrorCodes.PhysicalFileNotFound);
    public static ErrorMessage TechnicalSupport => new(HttpStatusCode.InternalServerError, "An unknown error occurred, contact the technical support!", ErrorCodes.TechnicalError);
    public static ErrorMessage AuthorNotFound => new(HttpStatusCode.NotFound, "Author doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage PublisherNotFound => new(HttpStatusCode.NotFound, "Publisher doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage BookNotFound => new(HttpStatusCode.NotFound, "Book doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage OrderNotFound => new(HttpStatusCode.NotFound, "Order doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage AddressNotFound => new(HttpStatusCode.NotFound, "Address doesn't exist!", ErrorCodes.EntityNotFound);
}

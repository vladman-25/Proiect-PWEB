using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Infrastructure.Workers;

/// <summary>
/// This is an example of a worker service, this service is called on the applications start to do some asynchronous work.
/// </summary>
public class InitializerWorker : BackgroundService
{
    private readonly ILogger<InitializerWorker> _logger;
    private readonly IServiceProvider _serviceProvider;

    public InitializerWorker(ILogger<InitializerWorker> logger, IServiceProvider serviceProvider)
    {
        _logger = logger; // The logger instance is injected here.
        _serviceProvider = serviceProvider; // Here the service provider is injected to request other components on runtime at request.
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        try
        {
            await using var scope = _serviceProvider.CreateAsyncScope(); // Here a new scope is created, this is useful to get new scoped instances.
            var userService = scope.ServiceProvider.GetService<IUserService>(); // Here an instance for a service is requested, it may fail if the component is not declared or
                                                                                // an exception is thrown on it’s creation.

            var authorService = scope.ServiceProvider.GetService<IAuthorService>();
            var publisherService = scope.ServiceProvider.GetService<IPublisherService>();
            var bookService = scope.ServiceProvider.GetService<IBookService>();

            if (userService == null)
            {
                _logger.LogInformation("Couldn't create the user service!");

                return;
            }

            if (authorService == null)
            {
                _logger.LogInformation("Couldn't create the author service!");

                return;
            }

            if (publisherService == null)
            {
                _logger.LogInformation("Couldn't create the publisher service!");

                return;
            }

            if (bookService == null)
            {
                _logger.LogInformation("Couldn't create the book service!");

                return;
            }

            var count = await userService.GetUserCount(cancellationToken);

            var countA = await authorService.GetAuthorCount(cancellationToken);
            var countP = await publisherService.GetPublisherCount(cancellationToken);
            var countB = await bookService.GetBookCount(cancellationToken);

            if (count.Result == 0)
            {
                _logger.LogInformation("No user found, adding default user!");

                await userService.AddUser(new()
                {
                    Email = "admin@default.com",
                    Name = "Admin",
                    Role = UserRoleEnum.Admin,
                    Password = PasswordUtils.HashPassword("default")
                }, cancellationToken: cancellationToken);
            }

            if (countP.Result == 0)
            {
                _logger.LogInformation("No publishers found, adding default publishers!");

                await publisherService.AddPublisher(new()
                {
                    Name = "Editura Humanitas",
                    Address = "Strada 1",
                    Phone = "0711111111"
                }, cancellationToken: cancellationToken);

                await publisherService.AddPublisher(new()
                {
                    Name = "Editura Polirom",
                    Address = "Strada 2",
                    Phone = "0722222222"
                }, cancellationToken: cancellationToken);

                await publisherService.AddPublisher(new()
                {
                    Name = "Editura Nemira",
                    Address = "Strada 3",
                    Phone = "0733333333"
                }, cancellationToken: cancellationToken);

                await publisherService.AddPublisher(new()
                {
                    Name = "Editura Cartea Românească",
                    Address = "Strada 4",
                    Phone = "0744444444"
                }, cancellationToken: cancellationToken);

                await publisherService.AddPublisher(new()
                {
                    Name = "Editura Trei",
                    Address = "Strada 5",
                    Phone = "0755555555"
                }, cancellationToken: cancellationToken);

            }

            if (countA.Result == 0)
            {
                _logger.LogInformation("No authors found, adding default authors!");

                await authorService.AddAuthor(new()
                {
                    Name = "J.K.",
                    Surname = "Rowling"
                }, cancellationToken: cancellationToken);

                await authorService.AddAuthor(new()
                {
                    Name = "George",
                    Surname = "Orwell"
                }, cancellationToken: cancellationToken);

                await authorService.AddAuthor(new()
                {
                    Name = "Jane",
                    Surname = "Austen"
                }, cancellationToken: cancellationToken);

                await authorService.AddAuthor(new()
                {
                    Name = "F. Scott",
                    Surname = "Fitzgerald"
                }, cancellationToken: cancellationToken);

                await authorService.AddAuthor(new()
                {
                    Name = "J.R.R.",
                    Surname = "Tolkien"
                }, cancellationToken: cancellationToken);

            }

            if (countB.Result == 0)
            {
                _logger.LogInformation("No books found, adding default books!");

                await bookService.AddBook(new()
                {
                    Title = "Harry Potter and the Sorcerer's Stone",
                    Description = "The first book in the Harry Potter series.",
                    Year = 1997,
                    Price = 15.99f,
                    AuthorId = (await authorService.GetAuthors(new PaginationSearchQueryParams { Search = "Rowling" }, cancellationToken)).Result.Data[0].Id,
                    PublisherId = (await publisherService.GetPublishers(new PaginationSearchQueryParams { Search = "Editura Trei" }, cancellationToken)).Result.Data[0].Id,
                    Genre = BookGenreEnum.Fantasy // Adjust genre as needed
                }, cancellationToken: cancellationToken);

                // Add book for George Orwell
                await bookService.AddBook(new()
                {
                    Title = "1984",
                    Description = "A dystopian novel depicting a totalitarian regime.",
                    Year = 1949,
                    Price = 12.99f,
                    AuthorId = (await authorService.GetAuthors(new PaginationSearchQueryParams { Search = "Orwell" }, cancellationToken)).Result.Data[0].Id,
                    PublisherId = (await publisherService.GetPublishers(new PaginationSearchQueryParams { Search = "Editura Polirom" }, cancellationToken)).Result.Data[0].Id,
                    Genre = BookGenreEnum.Dystopian // Adjust genre as needed
                }, cancellationToken: cancellationToken);

                // Add book for Jane Austen
                await bookService.AddBook(new()
                {
                    Title = "Pride and Prejudice",
                    Description = "A classic novel of manners set in early 19th-century England.",
                    Year = 1813,
                    Price = 10.99f,
                    AuthorId = (await authorService.GetAuthors(new PaginationSearchQueryParams { Search = "Austen" }, cancellationToken)).Result.Data[0].Id,
                    PublisherId = (await publisherService.GetPublishers(new PaginationSearchQueryParams { Search = "Editura Humanitas" }, cancellationToken)).Result.Data[0].Id,
                    Genre = BookGenreEnum.Classic // Adjust genre as needed
                }, cancellationToken: cancellationToken);

                // Add book for F. Scott Fitzgerald
                await bookService.AddBook(new()
                {
                    Title = "The Great Gatsby",
                    Description = "A novel depicting the decadence and excess of the Jazz Age.",
                    Year = 1925,
                    Price = 11.99f,
                    AuthorId = (await authorService.GetAuthors(new PaginationSearchQueryParams { Search = "Fitzgerald" }, cancellationToken)).Result.Data[0].Id,
                    PublisherId = (await publisherService.GetPublishers(new PaginationSearchQueryParams { Search = "Editura Nemira" }, cancellationToken)).Result.Data[0].Id,
                    Genre = BookGenreEnum.Fiction // Adjust genre as needed
                }, cancellationToken: cancellationToken);

                // Add book for Tolkien
                await bookService.AddBook(new()
                {
                    Title = "The Hobbit",
                    Description = "A fantasy novel about the journey of a hobbit named Bilbo Baggins.",
                    Year = 1937,
                    Price = 14.99f,
                    AuthorId = (await authorService.GetAuthors(new PaginationSearchQueryParams { Search = "Tolkien" }, cancellationToken)).Result.Data[0].Id,
                    PublisherId = (await publisherService.GetPublishers(new PaginationSearchQueryParams { Search = "Editura Cartea Românească" }, cancellationToken)).Result.Data[0].Id,
                    Genre = BookGenreEnum.Fantasy // Adjust genre as needed
                }, cancellationToken: cancellationToken);
            }

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initializing database!");
        }
    }
}
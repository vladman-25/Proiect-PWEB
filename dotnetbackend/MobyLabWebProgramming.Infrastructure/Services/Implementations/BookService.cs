using MobyLabWebProgramming.Core.Constants;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Migrations;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Net;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class BookService : IBookService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    public BookService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }
    public async Task<ServiceResponse<int>> GetBookCount(CancellationToken cancellationToken = default) =>
       ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<Book>(cancellationToken)); // Get the count of all user entities in the database.
    public async Task<ServiceResponse<BookDTO>> GetBook(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new BookProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ?
            ServiceResponse<BookDTO>.ForSuccess(result) :
            ServiceResponse<BookDTO>.FromError(CommonErrors.BookNotFound); // Pack the result or error into a ServiceResponse.
    }
    public async Task<ServiceResponse<PagedResponse<BookDTO>>> GetBooks(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new BookProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.
        return ServiceResponse<PagedResponse<BookDTO>>.ForSuccess(result);
    }



    public async Task<ServiceResponse> AddBook(BookAddDTO book, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add books!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new BookSpec(book.Title, book.AuthorId, book.PublisherId, book.Year), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The book already exists!", ErrorCodes.BookAlreadyExists));
        }

        await _repository.AddAsync(new Book
        {
            Title = book.Title,
            Description = book.Description,
            Year = book.Year,
            Price = book.Price,
            AuthorId = book.AuthorId,
            PublisherId = book.PublisherId,
            Genre = book.Genre,
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }


    public async Task<ServiceResponse> UpdateBook(BookUpdateDTO book, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the book!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new BookSpec(book.Id), cancellationToken);

        if (entity != null)
        {
            entity.Title = book.Title ?? entity.Title;
            entity.Description = book.Description ?? entity.Description;
            entity.Year = book.Year ?? entity.Year;
            entity.Price = book.Price ?? entity.Price;
            entity.AuthorId = book.AuthorId ?? entity.AuthorId;
            entity.PublisherId = book.PublisherId ?? entity.PublisherId;
            entity.Genre = book.Genre ?? entity.Genre;

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse> DeleteBook(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete the book!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<Book>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}

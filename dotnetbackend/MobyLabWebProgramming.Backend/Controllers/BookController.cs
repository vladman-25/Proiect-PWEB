using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;


[ApiController]
[Route("api/[controller]/[action]")]
public class BookController : AuthorizedController
{

    private readonly IBookService _bookService;

    public BookController(IUserService userService, IBookService bookService) : base(userService)
    {
        _bookService = bookService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<BookDTO>>> GetById([FromRoute] Guid id)
    {
        return this.FromServiceResponse(await _bookService.GetBook(id));
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<BookDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                              // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        return this.FromServiceResponse(await _bookService.GetBooks(pagination));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] BookAddDTO book)
    {
        var currentUser = await GetCurrentUser();
        return this.FromServiceResponse(await _bookService.AddBook(book, currentUser.Result));
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] BookUpdateDTO book)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _bookService.UpdateBook(book, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _bookService.DeleteBook(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}

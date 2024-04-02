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
public class AuthorController : AuthorizedController
{

    private readonly IAuthorService _authorService;

    public AuthorController(IUserService userService, IAuthorService authorService) : base(userService)
    {
        _authorService = authorService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<AuthorDTO>>> GetById([FromRoute] Guid id)
    {
        return this.FromServiceResponse(await _authorService.GetAuthor(id));
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<AuthorDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                         // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        return this.FromServiceResponse(await _authorService.GetAuthors(pagination));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] AuthorAddDTO author)
    {
        var currentUser = await GetCurrentUser();
        return this.FromServiceResponse(await _authorService.AddAuthor(author, currentUser.Result));
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] AuthorUpdateDTO author)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _authorService.UpdateAuthor(author, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _authorService.DeleteAuthor(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
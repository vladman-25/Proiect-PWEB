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
public class FeedbackController : AuthorizedController
{

    private readonly IFeedbackService _FeedbackService;

    public FeedbackController(IUserService userService, IFeedbackService FeedbackService) : base(userService)
    {
        _FeedbackService = FeedbackService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<FeedbackDTO>>> GetById([FromRoute] Guid id)
    {
        return this.FromServiceResponse(await _FeedbackService.GetFeedback(id));
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<FeedbackDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                         // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        return this.FromServiceResponse(await _FeedbackService.GetFeedbacks(pagination));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] FeedbackAddDTO book)
    {
        var currentUser = await GetCurrentUser();
        return this.FromServiceResponse(await _FeedbackService.AddFeedback(book, currentUser.Result));
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _FeedbackService.DeleteFeedback(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}

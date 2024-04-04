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
public class PublisherController : AuthorizedController
{

    private readonly IPublisherService _publisherService;

    public PublisherController(IUserService userService, IPublisherService publisherService) : base(userService)
    {
        _publisherService = publisherService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<PublisherDTO>>> GetById([FromRoute] Guid id)
    {
        return this.FromServiceResponse(await _publisherService.GetPublisher(id));
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<PublisherDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                           // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        return this.FromServiceResponse(await _publisherService.GetPublishers(pagination));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] PublisherAddDTO publisher)
    {
        var currentUser = await GetCurrentUser();
        return this.FromServiceResponse(await _publisherService.AddPublisher(publisher, currentUser.Result));
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] PublisherUpdateDTO publisher)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _publisherService.UpdatePublisher(publisher, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _publisherService.DeletePublisher(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}

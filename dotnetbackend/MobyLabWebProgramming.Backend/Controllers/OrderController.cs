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
public class OrderController : AuthorizedController
{

    private readonly IOrderService _orderService;

    public OrderController(IUserService userService, IOrderService orderService) : base(userService)
    {
        _orderService = orderService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<OrderDTO>>> GetById([FromRoute] Guid id)
    {
        return this.FromServiceResponse(await _orderService.GetOrder(id));
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<OrderDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                         // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        return this.FromServiceResponse(await _orderService.GetOrders(pagination));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] OrderAddDTO book)
    {
        var currentUser = await GetCurrentUser();
        return this.FromServiceResponse(await _orderService.AddOrder(book, currentUser.Result));
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] OrderUpdateDTO book)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _orderService.UpdateOrder(book, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _orderService.DeleteOrder(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
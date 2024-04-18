﻿using Microsoft.AspNetCore.Authorization;
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
public class AddressController : AuthorizedController
{

    private readonly IAddressService _addressService;

    public AddressController(IUserService userService, IAddressService addressService) : base(userService)
    {
        _addressService = addressService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<AddressDTO>>> GetById([FromRoute] Guid id)
    {
        return this.FromServiceResponse(await _addressService.GetAddress(id));
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<AddressDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
                                                                                                                                           // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        return this.FromServiceResponse(await _addressService.GetAddresss(pagination));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] AddressAddDTO author)
    {
        var currentUser = await GetCurrentUser();
        return this.FromServiceResponse(await _addressService.AddAddress(author, currentUser.Result));
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] AddressUpdateDTO author)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _addressService.UpdateAddress(author, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _addressService.DeleteAddress(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
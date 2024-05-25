/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  FeedbackAddDTO,
  FeedbackDTOPagedResponseRequestResponse,
  FeedbackDTORequestResponse,
  RequestResponse,
} from '../models';
import {
    FeedbackAddDTOFromJSON,
    FeedbackAddDTOToJSON,
    FeedbackDTOPagedResponseRequestResponseFromJSON,
    FeedbackDTOPagedResponseRequestResponseToJSON,
    FeedbackDTORequestResponseFromJSON,
    FeedbackDTORequestResponseToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models';

export interface ApiFeedbackAddPostRequest {
    feedbackAddDTO?: FeedbackAddDTO;
}

export interface ApiFeedbackDeleteIdDeleteRequest {
    id: string;
}

export interface ApiFeedbackGetByIdIdGetRequest {
    id: string;
}

export interface ApiFeedbackGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

/**
 * 
 */
export class FeedbackApi extends runtime.BaseAPI {

    /**
     */
    async apiFeedbackAddPostRaw(requestParameters: ApiFeedbackAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FeedbackAddDTOToJSON(requestParameters.feedbackAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackAddPost(requestParameters: ApiFeedbackAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiFeedbackAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiFeedbackDeleteIdDeleteRaw(requestParameters: ApiFeedbackDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiFeedbackDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackDeleteIdDelete(requestParameters: ApiFeedbackDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiFeedbackDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiFeedbackGetByIdIdGetRaw(requestParameters: ApiFeedbackGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FeedbackDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiFeedbackGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeedbackDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackGetByIdIdGet(requestParameters: ApiFeedbackGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FeedbackDTORequestResponse> {
        const response = await this.apiFeedbackGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiFeedbackGetPageGetRaw(requestParameters: ApiFeedbackGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FeedbackDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeedbackDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackGetPageGet(requestParameters: ApiFeedbackGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FeedbackDTOPagedResponseRequestResponse> {
        const response = await this.apiFeedbackGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
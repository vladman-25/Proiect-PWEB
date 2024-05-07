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
  PublisherAddDTO,
  PublisherDTOPagedResponseRequestResponse,
  PublisherDTORequestResponse,
  PublisherUpdateDTO,
  RequestResponse,
} from '../models';
import {
    PublisherAddDTOFromJSON,
    PublisherAddDTOToJSON,
    PublisherDTOPagedResponseRequestResponseFromJSON,
    PublisherDTOPagedResponseRequestResponseToJSON,
    PublisherDTORequestResponseFromJSON,
    PublisherDTORequestResponseToJSON,
    PublisherUpdateDTOFromJSON,
    PublisherUpdateDTOToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models';

export interface ApiPublisherAddPostRequest {
    publisherAddDTO?: PublisherAddDTO;
}

export interface ApiPublisherDeleteIdDeleteRequest {
    id: string;
}

export interface ApiPublisherGetByIdIdGetRequest {
    id: string;
}

export interface ApiPublisherGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiPublisherUpdatePutRequest {
    publisherUpdateDTO?: PublisherUpdateDTO;
}

/**
 * 
 */
export class PublisherApi extends runtime.BaseAPI {

    /**
     */
    async apiPublisherAddPostRaw(requestParameters: ApiPublisherAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Publisher/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PublisherAddDTOToJSON(requestParameters.publisherAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiPublisherAddPost(requestParameters: ApiPublisherAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiPublisherAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiPublisherDeleteIdDeleteRaw(requestParameters: ApiPublisherDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiPublisherDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Publisher/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiPublisherDeleteIdDelete(requestParameters: ApiPublisherDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiPublisherDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiPublisherGetByIdIdGetRaw(requestParameters: ApiPublisherGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublisherDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiPublisherGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Publisher/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublisherDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiPublisherGetByIdIdGet(requestParameters: ApiPublisherGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublisherDTORequestResponse> {
        const response = await this.apiPublisherGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiPublisherGetPageGetRaw(requestParameters: ApiPublisherGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PublisherDTOPagedResponseRequestResponse>> {
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
            path: `/api/Publisher/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PublisherDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiPublisherGetPageGet(requestParameters: ApiPublisherGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PublisherDTOPagedResponseRequestResponse> {
        const response = await this.apiPublisherGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiPublisherUpdatePutRaw(requestParameters: ApiPublisherUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Publisher/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PublisherUpdateDTOToJSON(requestParameters.publisherUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiPublisherUpdatePut(requestParameters: ApiPublisherUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiPublisherUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
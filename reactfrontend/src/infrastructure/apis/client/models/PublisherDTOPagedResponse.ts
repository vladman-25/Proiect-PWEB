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

import { exists, mapValues } from '../runtime';
import type { PublisherDTO } from './PublisherDTO';
import {
    PublisherDTOFromJSON,
    PublisherDTOFromJSONTyped,
    PublisherDTOToJSON,
} from './PublisherDTO';

/**
 * 
 * @export
 * @interface PublisherDTOPagedResponse
 */
export interface PublisherDTOPagedResponse {
    /**
     * 
     * @type {number}
     * @memberof PublisherDTOPagedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof PublisherDTOPagedResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PublisherDTOPagedResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<PublisherDTO>}
     * @memberof PublisherDTOPagedResponse
     */
    data?: Array<PublisherDTO> | null;
}

/**
 * Check if a given object implements the PublisherDTOPagedResponse interface.
 */
export function instanceOfPublisherDTOPagedResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PublisherDTOPagedResponseFromJSON(json: any): PublisherDTOPagedResponse {
    return PublisherDTOPagedResponseFromJSONTyped(json, false);
}

export function PublisherDTOPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PublisherDTOPagedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'data': !exists(json, 'data') ? undefined : (json['data'] === null ? null : (json['data'] as Array<any>).map(PublisherDTOFromJSON)),
    };
}

export function PublisherDTOPagedResponseToJSON(value?: PublisherDTOPagedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': value.page,
        'pageSize': value.pageSize,
        'totalCount': value.totalCount,
        'data': value.data === undefined ? undefined : (value.data === null ? null : (value.data as Array<any>).map(PublisherDTOToJSON)),
    };
}


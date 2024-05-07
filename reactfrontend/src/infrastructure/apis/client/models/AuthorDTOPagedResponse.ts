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
import type { AuthorDTO } from './AuthorDTO';
import {
    AuthorDTOFromJSON,
    AuthorDTOFromJSONTyped,
    AuthorDTOToJSON,
} from './AuthorDTO';

/**
 * 
 * @export
 * @interface AuthorDTOPagedResponse
 */
export interface AuthorDTOPagedResponse {
    /**
     * 
     * @type {number}
     * @memberof AuthorDTOPagedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof AuthorDTOPagedResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof AuthorDTOPagedResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<AuthorDTO>}
     * @memberof AuthorDTOPagedResponse
     */
    data?: Array<AuthorDTO> | null;
}

/**
 * Check if a given object implements the AuthorDTOPagedResponse interface.
 */
export function instanceOfAuthorDTOPagedResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AuthorDTOPagedResponseFromJSON(json: any): AuthorDTOPagedResponse {
    return AuthorDTOPagedResponseFromJSONTyped(json, false);
}

export function AuthorDTOPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthorDTOPagedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'data': !exists(json, 'data') ? undefined : (json['data'] === null ? null : (json['data'] as Array<any>).map(AuthorDTOFromJSON)),
    };
}

export function AuthorDTOPagedResponseToJSON(value?: AuthorDTOPagedResponse | null): any {
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
        'data': value.data === undefined ? undefined : (value.data === null ? null : (value.data as Array<any>).map(AuthorDTOToJSON)),
    };
}

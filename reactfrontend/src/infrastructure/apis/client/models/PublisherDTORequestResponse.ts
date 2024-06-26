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
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { PublisherDTO } from './PublisherDTO';
import {
    PublisherDTOFromJSON,
    PublisherDTOFromJSONTyped,
    PublisherDTOToJSON,
} from './PublisherDTO';

/**
 * 
 * @export
 * @interface PublisherDTORequestResponse
 */
export interface PublisherDTORequestResponse {
    /**
     * 
     * @type {PublisherDTO}
     * @memberof PublisherDTORequestResponse
     */
    response?: PublisherDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof PublisherDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the PublisherDTORequestResponse interface.
 */
export function instanceOfPublisherDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PublisherDTORequestResponseFromJSON(json: any): PublisherDTORequestResponse {
    return PublisherDTORequestResponseFromJSONTyped(json, false);
}

export function PublisherDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PublisherDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : PublisherDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function PublisherDTORequestResponseToJSON(value?: PublisherDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': PublisherDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


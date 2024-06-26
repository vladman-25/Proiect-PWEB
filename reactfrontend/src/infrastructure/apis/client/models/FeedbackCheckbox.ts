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
import type { FeedbackCheckboxEnum } from './FeedbackCheckboxEnum';
import {
    FeedbackCheckboxEnumFromJSON,
    FeedbackCheckboxEnumFromJSONTyped,
    FeedbackCheckboxEnumToJSON,
} from './FeedbackCheckboxEnum';

/**
 * 
 * @export
 * @interface FeedbackCheckbox
 */
export interface FeedbackCheckbox {
    /**
     * 
     * @type {string}
     * @memberof FeedbackCheckbox
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof FeedbackCheckbox
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof FeedbackCheckbox
     */
    updatedAt?: Date;
    /**
     * 
     * @type {FeedbackCheckboxEnum}
     * @memberof FeedbackCheckbox
     */
    like?: FeedbackCheckboxEnum;
}

/**
 * Check if a given object implements the FeedbackCheckbox interface.
 */
export function instanceOfFeedbackCheckbox(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeedbackCheckboxFromJSON(json: any): FeedbackCheckbox {
    return FeedbackCheckboxFromJSONTyped(json, false);
}

export function FeedbackCheckboxFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeedbackCheckbox {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'like': !exists(json, 'like') ? undefined : FeedbackCheckboxEnumFromJSON(json['like']),
    };
}

export function FeedbackCheckboxToJSON(value?: FeedbackCheckbox | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'like': FeedbackCheckboxEnumToJSON(value.like),
    };
}


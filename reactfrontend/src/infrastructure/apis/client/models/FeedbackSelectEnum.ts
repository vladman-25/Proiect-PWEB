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


/**
 * 
 * @export
 */
export const FeedbackSelectEnum = {
    Nota1: 'Nota1',
    Nota2: 'Nota2',
    Nota3: 'Nota3',
    Nota4: 'Nota4',
    Nota5: 'Nota5'
} as const;
export type FeedbackSelectEnum = typeof FeedbackSelectEnum[keyof typeof FeedbackSelectEnum];


export function FeedbackSelectEnumFromJSON(json: any): FeedbackSelectEnum {
    return FeedbackSelectEnumFromJSONTyped(json, false);
}

export function FeedbackSelectEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeedbackSelectEnum {
    return json as FeedbackSelectEnum;
}

export function FeedbackSelectEnumToJSON(value?: FeedbackSelectEnum | null): any {
    return value as any;
}


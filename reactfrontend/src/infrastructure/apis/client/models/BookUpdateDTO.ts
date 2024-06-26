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
import type { BookGenreEnum } from './BookGenreEnum';
import {
    BookGenreEnumFromJSON,
    BookGenreEnumFromJSONTyped,
    BookGenreEnumToJSON,
} from './BookGenreEnum';

/**
 * 
 * @export
 * @interface BookUpdateDTO
 */
export interface BookUpdateDTO {
    /**
     * 
     * @type {string}
     * @memberof BookUpdateDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof BookUpdateDTO
     */
    title?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookUpdateDTO
     */
    description?: string | null;
    /**
     * 
     * @type {number}
     * @memberof BookUpdateDTO
     */
    year?: number | null;
    /**
     * 
     * @type {number}
     * @memberof BookUpdateDTO
     */
    price?: number | null;
    /**
     * 
     * @type {string}
     * @memberof BookUpdateDTO
     */
    authorId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookUpdateDTO
     */
    publisherId?: string | null;
    /**
     * 
     * @type {BookGenreEnum}
     * @memberof BookUpdateDTO
     */
    genre?: BookGenreEnum;
}

/**
 * Check if a given object implements the BookUpdateDTO interface.
 */
export function instanceOfBookUpdateDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BookUpdateDTOFromJSON(json: any): BookUpdateDTO {
    return BookUpdateDTOFromJSONTyped(json, false);
}

export function BookUpdateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): BookUpdateDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'year': !exists(json, 'year') ? undefined : json['year'],
        'price': !exists(json, 'price') ? undefined : json['price'],
        'authorId': !exists(json, 'authorId') ? undefined : json['authorId'],
        'publisherId': !exists(json, 'publisherId') ? undefined : json['publisherId'],
        'genre': !exists(json, 'genre') ? undefined : BookGenreEnumFromJSON(json['genre']),
    };
}

export function BookUpdateDTOToJSON(value?: BookUpdateDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'description': value.description,
        'year': value.year,
        'price': value.price,
        'authorId': value.authorId,
        'publisherId': value.publisherId,
        'genre': BookGenreEnumToJSON(value.genre),
    };
}


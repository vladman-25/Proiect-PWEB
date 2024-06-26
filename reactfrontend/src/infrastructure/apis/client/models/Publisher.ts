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
import type { Book } from './Book';
import {
    BookFromJSON,
    BookFromJSONTyped,
    BookToJSON,
} from './Book';

/**
 * 
 * @export
 * @interface Publisher
 */
export interface Publisher {
    /**
     * 
     * @type {string}
     * @memberof Publisher
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof Publisher
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Publisher
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof Publisher
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Publisher
     */
    address?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Publisher
     */
    phone?: string | null;
    /**
     * 
     * @type {Array<Book>}
     * @memberof Publisher
     */
    books?: Array<Book> | null;
}

/**
 * Check if a given object implements the Publisher interface.
 */
export function instanceOfPublisher(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PublisherFromJSON(json: any): Publisher {
    return PublisherFromJSONTyped(json, false);
}

export function PublisherFromJSONTyped(json: any, ignoreDiscriminator: boolean): Publisher {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'address': !exists(json, 'address') ? undefined : json['address'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'books': !exists(json, 'books') ? undefined : (json['books'] === null ? null : (json['books'] as Array<any>).map(BookFromJSON)),
    };
}

export function PublisherToJSON(value?: Publisher | null): any {
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
        'name': value.name,
        'address': value.address,
        'phone': value.phone,
        'books': value.books === undefined ? undefined : (value.books === null ? null : (value.books as Array<any>).map(BookToJSON)),
    };
}


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
import type { Address } from './Address';
import {
    AddressFromJSON,
    AddressFromJSONTyped,
    AddressToJSON,
} from './Address';
import type { Book } from './Book';
import {
    BookFromJSON,
    BookFromJSONTyped,
    BookToJSON,
} from './Book';
import type { OrderBook } from './OrderBook';
import {
    OrderBookFromJSON,
    OrderBookFromJSONTyped,
    OrderBookToJSON,
} from './OrderBook';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    updatedAt?: Date;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    total?: number;
    /**
     * 
     * @type {User}
     * @memberof Order
     */
    user?: User;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    userId?: string;
    /**
     * 
     * @type {Address}
     * @memberof Order
     */
    address?: Address;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    addressId?: string;
    /**
     * 
     * @type {Array<Book>}
     * @memberof Order
     */
    books?: Array<Book> | null;
    /**
     * 
     * @type {Array<OrderBook>}
     * @memberof Order
     */
    orderBooks?: Array<OrderBook> | null;
}

/**
 * Check if a given object implements the Order interface.
 */
export function instanceOfOrder(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OrderFromJSON(json: any): Order {
    return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'total': !exists(json, 'total') ? undefined : json['total'],
        'user': !exists(json, 'user') ? undefined : UserFromJSON(json['user']),
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'address': !exists(json, 'address') ? undefined : AddressFromJSON(json['address']),
        'addressId': !exists(json, 'addressId') ? undefined : json['addressId'],
        'books': !exists(json, 'books') ? undefined : (json['books'] === null ? null : (json['books'] as Array<any>).map(BookFromJSON)),
        'orderBooks': !exists(json, 'orderBooks') ? undefined : (json['orderBooks'] === null ? null : (json['orderBooks'] as Array<any>).map(OrderBookFromJSON)),
    };
}

export function OrderToJSON(value?: Order | null): any {
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
        'total': value.total,
        'user': UserToJSON(value.user),
        'userId': value.userId,
        'address': AddressToJSON(value.address),
        'addressId': value.addressId,
        'books': value.books === undefined ? undefined : (value.books === null ? null : (value.books as Array<any>).map(BookToJSON)),
        'orderBooks': value.orderBooks === undefined ? undefined : (value.orderBooks === null ? null : (value.orderBooks as Array<any>).map(OrderBookToJSON)),
    };
}


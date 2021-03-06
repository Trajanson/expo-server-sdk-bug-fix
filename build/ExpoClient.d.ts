/// <reference types="node" />
import { Agent } from 'http';
import { Response as FetchResponse } from 'node-fetch';
export declare class Expo {
    static pushNotificationChunkSizeLimit: number;
    static pushNotificationReceiptChunkSizeLimit: number;
    _httpAgent: Agent | undefined;
    _limitConcurrentRequests: <T>(thunk: () => Promise<T>) => Promise<T>;
    constructor(options?: ExpoClientOptions);
    /**
     * Returns `true` if the token is an Expo push token
     */
    static isExpoPushToken(token: ExpoPushToken): boolean;
    /**
     * Sends the given messages to their recipients via push notifications and returns an array of
     * push tickets. Each ticket corresponds to the message at its respective index (the nth receipt
     * is for the nth message) and contains a receipt ID. Later, after Expo attempts to deliver the
     * messages to the underlying push notification services, the receipts with those IDs will be
     * available for a period of time (approximately a day).
     *
     * There is a limit on the number of push notifications you can send at once. Use
     * `chunkPushNotifications` to divide an array of push notification messages into appropriately
     * sized chunks.
     */
    sendPushNotificationsAsync(messages: ExpoPushMessage[]): Promise<ExpoPushTicket[]>;
    getPushNotificationReceiptsAsync(receiptIds: ExpoPushReceiptId[]): Promise<{
        [id: string]: ExpoPushReceipt;
    }>;
    chunkPushNotifications(messages: ExpoPushMessage[]): ExpoPushMessage[][];
    chunkPushNotificationReceiptIds(receiptIds: ExpoPushReceiptId[]): ExpoPushReceiptId[][];
    _chunkItems<T>(items: T[], chunkSize: number): T[][];
    _requestAsync(url: string, options: RequestOptions): Promise<any>;
    _parseErrorResponseAsync(response: FetchResponse): Promise<Error>;
    _getTextResponseErrorAsync(response: FetchResponse, text: string): Promise<Error>;
    /**
     * Returns an error for the first API error in the result, with an optional `others` field that
     * contains any other errors.
     */
    _getErrorFromResult(result: ApiResult): Error;
    /**
     * Returns an error for a single API error
     */
    _getErrorFromResultError(errorData: ApiResultError): Error;
}
export default Expo;
export declare type ExpoClientOptions = {
    httpAgent?: Agent;
    maxConcurrentRequests?: number;
};
export declare type ExpoPushToken = string;
export declare type ExpoPushMessage = {
    to: ExpoPushToken;
    data?: Object;
    title?: string;
    body?: string;
    sound?: 'default' | null;
    ttl?: number;
    expiration?: number;
    priority?: 'default' | 'normal' | 'high';
    badge?: number;
};
export declare type ExpoPushReceiptId = string;
export declare type ExpoPushTicket = {
    id: ExpoPushReceiptId;
};
declare type ExpoPushSuccessReceipt = {
    status: 'ok';
    details?: Object;
    __debug?: any;
};
declare type ExpoPushErrorReceipt = {
    status: 'error';
    message: 'string';
    details?: {
        error?: 'DeviceNotRegistered' | 'InvalidCredentials' | 'MessageTooBig' | 'MessageRateExceeded';
    };
    __debug?: any;
};
export declare type ExpoPushReceipt = ExpoPushSuccessReceipt | ExpoPushErrorReceipt;
declare type RequestOptions = {
    httpMethod: 'get' | 'post';
    body?: any;
    shouldCompress: (body: string) => boolean;
};
declare type ApiResult = {
    errors?: ApiResultError[];
    data?: any;
};
declare type ApiResultError = {
    message: string;
    code: string;
    details?: any;
    stack?: string;
};

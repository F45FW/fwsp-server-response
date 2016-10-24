# Server Response [![Build Status](https://travis-ci.org/flywheelsports/fwsp-server-response.svg?branch=master)](https://travis-ci.org/flywheelsports/fwsp-server-response)
A server response module for use with Node / ExpressJS.

The goal of this module is to standardize responses from JSON enabled servers. Each response sent contains the `statusCode`, `statusMessage`, `statusDescription` and `result`.

```javascript
{
  "statusCode": 200,
  "statusMessage": "OK",
  "statusDescription": "Request succeeded without error",
  "result": {}
}
```

#### So why is this a big issue?

Because the server responses have the potential to travel between multiple chained service endpoints each of which might otherwise have its own idea of how a response should be formatted. Using this module offers multiple processes the opportunity to easily standardize on a uniform response format.

Other client, servers, and services which receive the formatted response can always depend on knowing where to retrieve the HTTP status (`statusCode`) and where to find the actual response body (`result`).

## Installation

```shell
$ npm -i install fwsp-server-response
```

## Usage

The easiest way to use `server-response` is to use one of the provided responders. The first parameter `res` is a Node HTTP response object or an ExpressJS response object. This allows serverResponse to send a response back through the provided res object.

```javascript
serverResponse.sendOk(res, {
  result: {
    key: value
    key: value
  }
})
```

In the example above the data object sent provided is merged with the following object to build a response:

```javascript
{
  "statusCode": 200,
  "statusMessage": "OK",
  "statusDescription": "Request succeeded without error",
  "result": {
    key: value
    key: value
  }
}
```

> Note: ServerResponse automatically fills the `statusCode`, `statusMessage` and `statusDescription` fields based on the response member used. In the above example we're sending an HTTP_OK response using the `sendOk` member function.

So in the above example, the provided `.result` it merged in.  This means that you can also overwrite the `statusCode`, `statusMessage` and `statusDescription` fields as well.  However, it's recommended that only the `statusDescription` be modified in order to maintain consistency throughout a distributed system.


```javascript
serverResponse.sendInvalidRequest(res, {
  statusDescription: 'The `to` field is missing from your request'
})
```

You can also add and override HTTP headers by providing a `headers` sub-object:

```javascript
serverResponse.sendInvalidRequest(res, {
  headers: {
    'Content-Type': 'text/plain',
    'X-Powered-By': 'myCoolService/1.0'
  },
  result: {
    key: value
    key: value
  }
})
```

## List of responders

#### enableCORS
Enable / Disable CORS support
```javascript
/**
* @name enableCORS
* @summary Enable / Disable CORS support
* @param {boolean} state - true if CORS should be enabled
*/
```

#### createResponseObject
Create a data response object.
```javascript
/**
* @name createResponseObject
* @summary Create a data response object.
* @description This creates a consistently formatted HTTP response. It can be used
*              with any of the server-response send methods in the data param.
* @param {number} httpCode - HTTP code (Ex. 404)
* @param {object} resultPayload - object with {result: somevalue}
* @return {object} response - object suitable for sending via HTTP
*/
createResponseObject(httpCode, resultPayload)
```

#### sendResponse
Send a server response to caller
```javascript
/**
 * @name sendResponse
 * @summary Send a server response to caller.
 * @param {number} code - HTTP response code
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendResponse(code, res, data)
```

#### sendOk
Send an HTTP_OK server response to caller
```javascript
/**
 * @name sendOk
 * @summary Send an HTTP_OK server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendOk(res, data)
```

#### sendCreated
Send an HTTP_CREATED server response to caller
```javascript
/**
 * @name sendCreated
 * @summary Send an HTTP_CREATED server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendCreated(res, data)
 ```

#### sendMovedPermanently
Send an HTTP_MOVED_PERMANENTLY server response to caller
```javascript
/**
 * @name sendMovedPermanently
 * @summary Send an HTTP_MOVED_PERMANENTLY server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendMovedPermanently(res, data)
 ```

#### sendNotFound
Send an HTTP_NOT_FOUND server response to caller
 ```javascript
 /**
  * @name sendNotFound
  * @summary Send an HTTP_NOT_FOUND server response to caller.
  * @param {object} res - Node HTTP response object
  * @param {object} data - An object to send
  * @return {object} res - Returns the (res) response object when in test mode, else undefined
  */
 sendNotFound(res, data)
 ```

#### sendInvalidRequest
Send an HTTP_BAD_REQUEST server response to caller
```javascript
/**
 * @name sendInvalidRequest
 * @summary Send an HTTP_BAD_REQUEST server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendInvalidRequest(res, data)
```

#### sendInvalidSession
Send an HTTP_BAD_REQUEST server response to caller
```javascript
/**
 * @name sendInvalidSession
 * @summary Send an HTTP_BAD_REQUEST server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendInvalidSession(res, data)
```

#### sendInvalidUserCredentials
Send an HTTP_UNAUTHORIZED server response to caller
```javascript
/**
 * @name sendInvalidUserCredentials
 * @summary Send an HTTP_UNAUTHORIZED server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendInvalidUserCredentials(res, data)
```

#### sendRequestFailed
Send an HTTP_REQUEST_FAILED server response to caller
```javascript
/**
 * @name sendRequestFailed
 * @summary Send an HTTP_REQUEST_FAILED server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendRequestFailed(res, data)
```

#### sendDataConflict
Send an HTTP_CONFLICT server response to caller.
```javascript
/**
 * @name sendDataConflict
 * @summary Send an HTTP_CONFLICT server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendDataConflict(res, data)
```

#### sendTooLarge
Send an HTTP_TOO_LARGE server response to caller
```javascript
/**
 * @name sendTooLarge
 * @summary Send an HTTP_TOO_LARGE server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendDataConflict(res, data)
```

#### sendTooManyRequests
Send an HTTP_TOO_MANY_REQUEST server response to caller
```javascript
/**
 * @name sendTooManyRequests
 * @summary Send an HTTP_TOO_MANY_REQUEST server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendTooManyRequests(res, data)
```

#### sendServerError
Send an HTTP_SERVER_ERROR server response to caller
```javascript
/**
 * @name sendServerError
 * @summary Send an HTTP_SERVER_ERROR server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendServerError(res, data)
```

#### sendInternalError
Alias for sendResponseServerError
```javascript
/**
 * @name sendInternalError
 * @summary Alias for sendResponseServerError
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendInternalError(res, data)
```

#### sendMethodNotImplemented
Send an HTTP_METHOD_NOT_IMPLEMENTED server response to caller
```javascript
/**
 * @name sendMethodNotImplemented
 * @summary Send an HTTP_METHOD_NOT_IMPLEMENTED server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendMethodNotImplemented(res, data)
```

#### sendConnectionRefused
Send an HTTP_CONNECTION_REFUSED server response to caller
```javascript
/**
 * @name sendConnectionRefused
 * @summary Send an HTTP_CONNECTION_REFUSED server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendUnavailableError(res, data)
```

#### sendUnavailableError
Send an HTTP_METHOD_NOT_IMPLEMENTED server response to caller
```javascript
/**
 * @name sendUnavailableError
 * @summary Send an HTTP_METHOD_NOT_IMPLEMENTED server response to caller.
 * @param {object} res - Node HTTP response object
 * @param {object} data - An object to send
 * @return {object} res - Returns the (res) response object when in test mode, else undefined
 */
sendUnavailableError(res, data)
```

## Exported HTTP codes

```
ServerResponse.HTTP_OK = 200;
ServerResponse.HTTP_CREATED = 201;
ServerResponse.HTTP_MOVED_PERMANENTLY = 301;
ServerResponse.HTTP_BAD_REQUEST = 400;
ServerResponse.HTTP_UNAUTHORIZED = 401;
ServerResponse.HTTP_REQUEST_FAILED = 402;
ServerResponse.HTTP_NOT_FOUND = 404;
ServerResponse.HTTP_METHOD_NOT_ALLOWED = 405;
ServerResponse.HTTP_CONFLICT = 409;
ServerResponse.HTTP_TOO_LARGE = 413;
ServerResponse.HTTP_TOO_MANY_REQUEST = 429;
ServerResponse.HTTP_SERVER_ERROR = 500;
ServerResponse.HTTP_METHOD_NOT_IMPLEMENTED = 501;
ServerResponse.HTTP_CONNECTION_REFUSED = 502;
ServerResponse.HTTP_SERVICE_UNAVAILABLE = 503;
```

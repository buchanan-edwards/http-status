# http-status

Provides the `HttpStatus` class for managing HTTP response status codes.

Version 1.0.2

## Installation

This is a scoped package under the `be` namespace.

```
$ npm install --save @be/http-status
```

## Usage

Include the `be` namespace when using this package.

```javascript
const HttpStatus = require('@be/http-status')
```

### Creating status objects

There is a factory method for each HTTP status code. The following creates a 404 (Not Found) status.

```javascript
let status = HttpStatus.notFound()

console.log(status.toString())
// 404 (Not Found)
```

The status name is also set as a property with a `true` value on the created status instance. (The status name is the same as the factory method name.)

```javascript
console.log(status.notFound)
// true

console.log(status.ok)
// undefined
```

### Creating error objects

Each status can also be converted into an error object. The error object is an instance of the `HttpError` class, which is attached to the `HttpStatus` class returned by this module. The `status.error` method accepts `util.format` arguments.

```javascript
let docid = 'A12345'
let error = status.error('This document (%s) is not available.', docid)

console.error(error.toString())
// HttpError: 404 (Not Found) This document (A12345) is not available.
```

The `status.error` method also accepts an `Error` object. In that case, the message from the specified error is used.

```javascript
let err = new Error('No such record exists.')
console.error(status.error(err).toString())
// HttpError: 404 (Not Found) No such record exists.
```

In all cases:

- A `RangeError` will be thrown if the status code is not in the 4xx or 5xx range of error codes.
- The code and reason phrase is always added to the beginning of the error message.
- If the `message` is not specified, the status class ('Client Error' or 'Server Error') is used instead.
- Calling `new HttpStatus.HttpError(status, message)` is the same as calling `status.error(message)`.

### Using the module constructor

The `HttpStatus` class is exported by the module. You can call this constructor directly instead of using the factory methods.

```javascript
let conflict = new HttpStatus(409)
// Instead of HttpStatus.conflict()
```

Using the factory method is more readable and does not require the `new` keyword.

## Status Codes

The following is the array of status codes along with the reason phrase (text) and the identifier (name) for each code.

```javascript
[
    { code: 0, text: 'Unreachable', name: 'unreachable' },
    { code: 100, text: 'Continue', name: 'continue' },
    { code: 101, text: 'Switching Protocols', name: 'switchingProtocols' },
    { code: 102, text: 'Processing', name: 'processing' },
    { code: 200, text: 'OK', name: 'ok' },
    { code: 201, text: 'Created', name: 'created' },
    { code: 202, text: 'Accepted', name: 'accepted' },
    { code: 203, text: 'Non-Authoritative Information', name: 'nonAuthoritativeInformation' },
    { code: 204, text: 'No Content', name: 'noContent' },
    { code: 205, text: 'Reset Content', name: 'resetContent' },
    { code: 206, text: 'Partial Content', name: 'partialContent' },
    { code: 207, text: 'Multi-Status', name: 'multiStatus' },
    { code: 208, text: 'Already Reported', name: 'alreadyReported' },
    { code: 226, text: 'IM Used', name: 'imUsed' },
    { code: 300, text: 'Multiple Choices', name: 'multipleChoices' },
    { code: 301, text: 'Moved Permanently', name: 'movedPermanently' },
    { code: 302, text: 'Found', name: 'found' },
    { code: 303, text: 'See Other', name: 'seeOther' },
    { code: 304, text: 'Not Modified', name: 'notModified' },
    { code: 305, text: 'Use Proxy', name: 'useProxy' },
    { code: 306, text: 'Unused', name: 'unused' },
    { code: 307, text: 'Temporary Redirect', name: 'temporaryRedirect' },
    { code: 308, text: 'Permanent Redirect', name: 'permanentRedirect' },
    { code: 400, text: 'Bad Request', name: 'badRequest' },
    { code: 401, text: 'Unauthorized', name: 'unauthorized' },
    { code: 402, text: 'Payment Required', name: 'paymentRequired' },
    { code: 403, text: 'Forbidden', name: 'forbidden' },
    { code: 404, text: 'Not Found', name: 'notFound' },
    { code: 405, text: 'Method Not Allowed', name: 'methodNotAllowed' },
    { code: 406, text: 'Not Acceptable', name: 'notAcceptable' },
    { code: 407, text: 'Proxy Authentication Required', name: 'proxyAuthenticationRequired' },
    { code: 408, text: 'Request Timeout', name: 'requestTimeout' },
    { code: 409, text: 'Conflict', name: 'conflict' },
    { code: 410, text: 'Gone', name: 'gone' },
    { code: 411, text: 'Length Required', name: 'lengthRequired' },
    { code: 412, text: 'Precondition Failed', name: 'preconditionFailed' },
    { code: 413, text: 'Payload Too Large', name: 'payloadTooLarge' },
    { code: 414, text: 'URI Too Long', name: 'uriTooLong' },
    { code: 415, text: 'Unsupported Media Type', name: 'unsupportedMediaType' },
    { code: 416, text: 'Range Not Satisfiable', name: 'rangeNotSatisfiable' },
    { code: 417, text: 'Expectation Failed', name: 'expectationFailed' },
    { code: 418, text: 'I\'m a teapot', name: 'imATeapot' },
    { code: 420, text: 'Enhance Your Calm', name: 'enhanceYourCalm' },
    { code: 421, text: 'Misdirected Request', name: 'misdirectedRequest' },
    { code: 422, text: 'Unprocessable Entity', name: 'unprocessableEntity' },
    { code: 423, text: 'Locked', name: 'locked' },
    { code: 424, text: 'Failed Dependency', name: 'failedDependency' },
    { code: 425, text: 'Unordered Collection', name: 'unorderedCollection' },
    { code: 426, text: 'Upgrade Required', name: 'upgradeRequired' },
    { code: 428, text: 'Precondition Required', name: 'preconditionRequired' },
    { code: 429, text: 'Too Many Requests', name: 'tooManyRequests' },
    { code: 431, text: 'Request Header Fields Too Large', name: 'requestHeaderFieldsTooLarge' },
    { code: 444, text: 'No Response', name: 'noResponse' },
    { code: 449, text: 'Retry With', name: 'retryWith' },
    { code: 450, text: 'Blocked By Windows Parental Controls', name: 'blockedByWindowsParentalControls' },
    { code: 451, text: 'Unavailable For Legal Reasons', name: 'unavailableForLegalReasons' },
    { code: 499, text: 'Client Closed Request', name: 'clientClosedRequest' },
    { code: 500, text: 'Internal Server Error', name: 'internalServerError' },
    { code: 501, text: 'Not Implemented', name: 'notImplemented' },
    { code: 502, text: 'Bad Gateway', name: 'badGateway' },
    { code: 503, text: 'Service Unavailable', name: 'serviceUnavailable' },
    { code: 504, text: 'Gateway Timeout', name: 'gatewayTimeout' },
    { code: 505, text: 'HTTP Version Not Supported', name: 'httpVersionNotSupported' },
    { code: 506, text: 'Variant Also Negotiates', name: 'variantAlsoNegotiates' },
    { code: 507, text: 'Insufficient Storage', name: 'insufficientStorage' },
    { code: 508, text: 'Loop Detected', name: 'loopDetected' },
    { code: 509, text: 'Bandwidth Limit Exceeded', name: 'bandwidthLimitExceeded' },
    { code: 510, text: 'Not Extended', name: 'notExtended' },
    { code: 511, text: 'Network Authentication Required', name: 'networkAuthenticationRequired' },
    { code: 598, text: 'Network Read Timeout Error', name: 'networkReadTimeoutError' },
    { code: 599, text: 'Network Connect Timeout Error', name: 'networkConnectTimeoutError' }
]

```

## License

MIT License

Copyright (c) 2017 Buchanan & Edwards

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
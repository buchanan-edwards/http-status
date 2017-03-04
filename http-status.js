// Copyright (c) 2017 Buchanan & Edwards
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

'use strict'

const util = require('util')

const statuses = [
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

// Given a code, returns the status.
function findStatus(code) {
    let status = statuses.find(status => {
        return status.code === code
    })
    return status || { code: code, text: 'Unassigned', name: 'Unassigned' }
}

// Given a code, returns the class of that code.
function responseClass(code) {
    if (code >= 100 && code <= 199) {
        return 'Informational'
    } else if (code >= 200 && code <= 299) {
        return 'Successful'
    } else if (code >= 300 && code < 400) {
        return 'Redirection'
    } else if (code >= 400 && code < 500) {
        return 'Client Error'
    } else if (code >= 500 && code < 600) {
        return 'Server Error'
    } else {
        return 'Unknown Class'
    }
}

// Used internally by the HttpStatus error method.
class HttpError extends Error {
    constructor(message, code) {
        super(message)
        this.code = code
        this.name = 'HttpError'
    }
}

// Represents an HTTP status.
class HttpStatus {

    constructor(code) {
        let status
        if (typeof code === 'object') { // internal use
            status = code
        } else if (typeof code === 'number') {
            status = findStatus(code)
        } else {
            throw new TypeError(`Expected a number for the code (got ${typeof code} instead).`)
        }
        this._code = status.code
        this._text = status.text
        this._name = status.name
        this._class = responseClass(code)
        this[status.name] = true
    }

    get code() {
        return this._code
    }

    get text() {
        return this._text
    }

    get() {
        return this._text
    }

    get class() {
        return this._class
    }

    toString() {
        return `${this._code} (${this._text})`
    }

    isError() {
        return this._code === 0 || (this._code >= 400 && this._code <= 500)
    }

    error(message) {
        if (!this.isError()) {
            throw new RangeError(`A status code of ${this._code} does not represent an error.`)
        }
        if (!message) {
            message = this._class
        } else if (message instanceof Error) {
            message = message.message
        } else if (typeof message === 'string') {
            let args = Array.prototype.slice.call(arguments)
            message = util.format.apply(util, args)
        } else {
            throw new TypeError(`Expected an Error or a string for the message (got ${typeof message} instead).`)
        }
        return new HttpError(`${this.toString()} ${message}`, this._code)
    }
}

// Create a static factory method for each status. The factory method takes
// an error object or one or more arguments that are passed to util.format.
statuses.forEach(status => {
    HttpStatus[status.name] = function () {
        if (arguments.length > 0) {
            throw new RangeError(`The ${status.name} factory method takes no arguments (got ${arguments.length} instead).`)
        }
        return new HttpStatus(status)
    }
})

module.exports = HttpStatus
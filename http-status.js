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
    { name: 'unreachable', code: 0, text: "Unreachable" },
    { name: 'continue', code: 100, text: "Continue" },
    { name: 'switchingProtocols', code: 101, text: "Switching Protocols" },
    { name: 'processing', code: 102, text: "Processing" },
    { name: 'ok', code: 200, text: "OK" },
    { name: 'created', code: 201, text: "Created" },
    { name: 'accepted', code: 202, text: "Accepted" },
    { name: 'nonAuthoritativeInformation', code: 203, text: "Non-Authoritative Information" },
    { name: 'noContent', code: 204, text: "No Content" },
    { name: 'resetContent', code: 205, text: "Reset Content" },
    { name: 'partialContent', code: 206, text: "Partial Content" },
    { name: 'multiStatus', code: 207, text: "Multi-Status" },
    { name: 'alreadyReported', code: 208, text: "Already Reported" },
    { name: 'imUsed', code: 226, text: "IM Used" },
    { name: 'multipleChoices', code: 300, text: "Multiple Choices" },
    { name: 'movedPermanently', code: 301, text: "Moved Permanently" },
    { name: 'found', code: 302, text: "Found" },
    { name: 'seeOther', code: 303, text: "See Other" },
    { name: 'notModified', code: 304, text: "Not Modified" },
    { name: 'useProxy', code: 305, text: "Use Proxy" },
    { name: 'temporaryRedirect', code: 307, text: "Temporary Redirect" },
    { name: 'permanentRedirect', code: 308, text: "Permanent Redirect" },
    { name: 'badRequest', code: 400, text: "Bad Request" },
    { name: 'unauthorized', code: 401, text: "Unauthorized" },
    { name: 'paymentRequired', code: 402, text: "Payment Required" },
    { name: 'forbidden', code: 403, text: "Forbidden" },
    { name: 'notFound', code: 404, text: "Not Found" },
    { name: 'methodNotAllowed', code: 405, text: "Method Not Allowed" },
    { name: 'notAcceptable', code: 406, text: "Not Acceptable" },
    { name: 'proxyAuthenticationRequired', code: 407, text: "Proxy Authentication Required" },
    { name: 'requestTimeout', code: 408, text: "Request Timeout" },
    { name: 'conflict', code: 409, text: "Conflict" },
    { name: 'gone', code: 410, text: "Gone" },
    { name: 'lengthRequired', code: 411, text: "Length Required" },
    { name: 'preconditionFailed', code: 412, text: "Precondition Failed" },
    { name: 'payloadTooLarge', code: 413, text: "Payload Too Large" },
    { name: 'uriTooLong', code: 414, text: "URI Too Long" },
    { name: 'unsupportedMediaType', code: 415, text: "Unsupported Media Type" },
    { name: 'rangeNotSatisfiable', code: 416, text: "Range Not Satisfiable" },
    { name: 'expectationFailed', code: 417, text: "Expectation Failed" },
    { name: 'imATeapot', code: 418, text: "I'm a teapot" },
    { name: 'enhanceYourCalm', code: 420, text: "Enhance Your Calm" },
    { name: 'misdirectedRequest', code: 421, text: "Misdirected Request" },
    { name: 'unprocessableEntity', code: 422, text: "Unprocessable Entity" },
    { name: 'locked', code: 423, text: "Locked" },
    { name: 'failedDependency', code: 424, text: "Failed Dependency" },
    { name: 'unorderedCollection', code: 425, text: "Unordered Collection" },
    { name: 'upgradeRequired', code: 426, text: "Upgrade Required" },
    { name: 'preconditionRequired', code: 428, text: "Precondition Required" },
    { name: 'tooManyRequests', code: 429, text: "Too Many Requests" },
    { name: 'requestHeaderFieldsTooLarge', code: 431, text: "Request Header Fields Too Large" },
    { name: 'noResponse', code: 444, text: "No Response" },
    { name: 'retryWith', code: 449, text: "Retry With" },
    { name: 'blockedByWindowsParentalControls', code: 450, text: "Blocked By Windows Parental Controls" },
    { name: 'unavailableForLegalReasons', code: 451, text: "Unavailable For Legal Reasons" },
    { name: 'clientClosedRequest', code: 499, text: "Client Closed Request" },
    { name: 'internalServerError', code: 500, text: "Internal Server Error" },
    { name: 'notImplemented', code: 501, text: "Not Implemented" },
    { name: 'badGateway', code: 502, text: "Bad Gateway" },
    { name: 'serviceUnavailable', code: 503, text: "Service Unavailable" },
    { name: 'gatewayTimeout', code: 504, text: "Gateway Timeout" },
    { name: 'httpVersionNotSupported', code: 505, text: "HTTP Version Not Supported" },
    { name: 'variantAlsoNegotiates', code: 506, text: "Variant Also Negotiates" },
    { name: 'insufficientStorage', code: 507, text: "Insufficient Storage" },
    { name: 'loopDetected', code: 508, text: "Loop Detected" },
    { name: 'bandwidthLimitExceeded', code: 509, text: "Bandwidth Limit Exceeded" },
    { name: 'notExtended', code: 510, text: "Not Extended" },
    { name: 'networkAuthenticationRequired', code: 511, text: "Network Authentication Required" },
    { name: 'networkReadTimeoutError', code: 598, text: "Network Read Timeout Error" },
    { name: 'networkConnectTimeoutError', code: 599, text: "Network Connect Timeout Error" }
]

// Given a code, returns the text description.
function reasonPhrase(code) {
    let status = statuses.find(status => {
        return status.code === code
    })
    return status ? status.text : 'Unknown Code'
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

// Represents an HTTP status having code and text properties.
class HttpStatus {

    constructor(code, text) {
        if (typeof code !== 'number') {
            throw new TypeError(`Expected a number for the code (got ${typeof code} instead).`)
        }
        this._code = code
        if (text) {
            if (typeof text !== 'string') {
                throw new TypeError(`Expected a string for the text (got ${typeof text} instead).`)
            }
            this._text = text
        } else {
            this._text = reasonPhrase(code)
        }
        this._class = responseClass(code)
    }

    get code() {
        return this._code
    }

    get text() {
        return this._text
    }

    get class() {
        return this._class
    }

    toString() {
        return `${this.code} (${this.text})`
    }

    isError() {
        return this._code >= 400 && code <= 500
    }

    error(message) {
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
        return new HttpStatus(status.code, status.text)
    }
})

module.exports = HttpStatus
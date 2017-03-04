# http-status

Provides the `HttpStatus` class and associated factory methods.

Version 1.0.0

## Usage

```
$ npm install --save @be/http-status
```

```javascript
const HttpStatus = require('@be/http-status')

// Use the factory method.
let response = HttpStatus.notFound()

console.log(response.toString())
// 404 (Not Found)

// Convert it into an exception.
throw response.error('Document unavailable')
// 404 (Not Found) Document unavailable

// From another error object.
let err = new Error('That record already exists');
throw HttpStatus.conflict.error(err)
// 409 (Conflict) That record already exists
```

In the examples above, the `notFound` and `conflict` methods are factory methods. No `new` keyword is required. There is one factory method for each HTTP status code.

If you want to call the constructor yourself, you can:

```javascript
function sqrt(val) {
	if (val < 0) {
	    throw new HttpStatus(400).error(util.format('Value %d cannot be negative.', val))
	} else {
	    return Math.sqrt(val);
    }
}
```

As you can see, using the factory method...

- is more readable,
- does not require the `new` keyword,
- handles `util.format` arguments.

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

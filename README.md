## Ext-To-MimeType-Mode
ExtToMime is a JavaScript module that provides you a easy way to map a file extension to a MimeType/CodeMirror mode. You can provide the module a file extension without a dot and you will get back the CodeMirror mode. 

### Requirements
The module requires the following in order to work:
- jQuery ( I used _1.11.3_ )
- Underscore ( I used _1.8.3_ )


### Data sources
The MimeTypes/Modes were taken from *Brackets* repository since CodeMirror uses the same types/modes in order to change it's syntax highlighting. The module has already a _map_ of those build inside, but it has a function called `reload` that allows you to reload this map from brackets repository and update the internal state for further use.

### Getting started

1. Make sure you have the right dependencies
2. Download the file called ext_to_mime.js and include it in your application
3. The module will be exported globally and you can use it (See below how)

## How to use

#### ExtToMime
The module name is ExtToMime and you can call it's public methods in order to get the data processed by it. 

#### ExtToMime.getByExtension(ext)
`ExtToMime.getByExtension(ext)` expects `ext` to be a string that represents the extension without the `.` character. Eg: rb, html, cpp, c, java, css, yaml, sql, etc

It returns a string that contains the Mime-Type or the CodeMirror mode. You can use this to apply it to your CodeMirror instance as follows: `codeMirrorInstance.setOption("mode", ExtToMime.getByExtension("rb"));`


#### ExtToMime.reload(true)
`ExtToMime.reload(true)` - this method reloads the map source from brackets repository and set's the state internally. This function has by default the parameter set to true, so you don't need to provide it. If the param is set to false, some MimeTypes will contain "-brakets-" in it. Eg: "text/x-brackets-html" or "text/x-brackets-css". By default the module removes this to ensure CodeMirror will work as expected.


#### It's yours with love!

Copyright (c) 2015 Lamba Andrei-Alexandru

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

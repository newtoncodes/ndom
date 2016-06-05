# ndom

A DOM wrapper with IntelliSense.

## Installation

`npm install --save ndom`

The UMD build is in the dist directory.

## Short story

Why not any of the others? Because I like this syntax more, actual property getters for every get operation. The collection of elements extends a real Array object so you get all the methods of the Array prototype.
Small code. Only necessary functions, maybe even missing some.

```javascript
const ndom = require('ndom');

ndom('body').html = '<div id="div1">DIV IN BODY</div>';
ndom('#div1').html = '<a>l1</a><a>l2</a><a>l3</a>';

console.log(ndom('#div1').width, ndom('#div1').size.width === ndom('#div1').width);
console.log(ndom('#div1 a').html);

ndom('#div1 a').forEach((a, i) => {
    console.log(a);
    ndom(a).html += ' - <b>' + i + '</b>';
});

ndom('#div1 a').on('click', e => console.log('CLICK', e));
ndom('#div1 a').once('click', (e, node) => console.log('CLICK ONCE', node, e));
ndom('#div1 a').on('click', function(e) {
    console.log('Binds to: ', this);
});

// etc...
```

## Long story

#### Classes

<dl>
<dt><a href="#Collection">Collection</a> ⇐ <code>Array</code></dt>
<dd></dd>
<dt><a href="#ndom">ndom</a></dt>
<dd></dd>
</dl>


<a name="ndom"></a>

#### ndom

* [ndom](#ndom)
    * [ndom(selector, [parent])](#new_ndom_new)
    * [.match(el, selector)](#ndom.match) ⇒ <code>boolean</code>
    * [.onLoad(callback)](#ndom.onLoad) ⇒ <code>[ndom](#ndom)</code>
    * [.onReady(callback)](#ndom.onReady) ⇒ <code>[ndom](#ndom)</code>

<a name="new_ndom_new"></a>

##### ndom(selector, [parent])

| Param | Type |
| --- | --- |
| selector | <code>\*</code> | 
| [parent] | <code>\*</code> | 

<a name="ndom.match"></a>

##### ndom.match(el, selector) ⇒ <code>boolean</code>

| Param | Type |
| --- | --- |
| el | <code>\*</code> | 
| selector | <code>\*</code> | 

<a name="ndom.onLoad"></a>

##### ndom.onLoad(callback) ⇒ <code>[ndom](#ndom)</code>

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="ndom.onReady"></a>

##### ndom.onReady(callback) ⇒ <code>[ndom](#ndom)</code>

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Collection"></a>

#### Collection ⇐ <code>Array</code>
**Kind**: global class  
**Extends:** <code>Array</code>  

* [Collection](#Collection) ⇐ <code>Array</code>
    * _instance_
        * [.node](#Collection+node) ⇒ <code>HTMLElement</code>
        * [.parent](#Collection+parent) ⇒ <code>[Collection](#Collection)</code>
        * [.size](#Collection+size) ⇒ <code>Object</code>
        * [.width](#Collection+width) ⇒ <code>number</code>
        * [.height](#Collection+height) ⇒ <code>number</code>
        * [.outerSize](#Collection+outerSize) ⇒ <code>Object</code>
        * [.offset](#Collection+offset) ⇒ <code>Object</code>
        * [.offsetParent](#Collection+offsetParent) ⇒ <code>[Collection](#Collection)</code>
        * [.offsetViewport](#Collection+offsetViewport) ⇒ <code>ClientRect</code>
        * [.position](#Collection+position) ⇒ <code>Object</code>
        * [.left](#Collection+left) ⇒ <code>number</code>
        * [.top](#Collection+top) ⇒ <code>number</code>
        * [.html](#Collection+html) ⇒ <code>string</code>
        * [.outerHtml](#Collection+outerHtml) ⇒ <code>string</code>
        * [.text](#Collection+text) ⇒ <code>string</code>
        * [.class](#Collection+class) ⇒ <code>string</code>
        * [.classes](#Collection+classes) ⇒ <code>Array</code>
        * [.children](#Collection+children) ⇒ <code>[Collection](#Collection)</code>
        * [.length](#Collection+length) ⇒ <code>number</code>
        * [.html](#Collection+html)
        * [.text](#Collection+text)
        * [.query(selector)](#Collection+query) ⇒ <code>[Collection](#Collection)</code>
        * [.queryParents(selector)](#Collection+queryParents) ⇒ <code>[Collection](#Collection)</code>
        * [.contains(child)](#Collection+contains) ⇒ <code>boolean</code>
        * [.clone()](#Collection+clone) ⇒ <code>[Collection](#Collection)</code>
        * [.getAttr(name)](#Collection+getAttr) ⇒ <code>string</code> &#124; <code>null</code>
        * [.hasClass(name)](#Collection+hasClass) ⇒ <code>boolean</code>
        * [.setAttr(name, value)](#Collection+setAttr) ⇒ <code>[Collection](#Collection)</code>
        * [.addClass(name)](#Collection+addClass) ⇒ <code>[Collection](#Collection)</code>
        * [.removeClass(name)](#Collection+removeClass) ⇒ <code>[Collection](#Collection)</code>
        * [.setHtml(html)](#Collection+setHtml) ⇒ <code>[Collection](#Collection)</code>
        * [.setText(text)](#Collection+setText) ⇒ <code>[Collection](#Collection)</code>
        * [.serialize([asObject])](#Collection+serialize) ⇒ <code>string</code> &#124; <code>object</code>
        * [.append(children)](#Collection+append) ⇒ <code>[Collection](#Collection)</code>
        * [.prepend(children)](#Collection+prepend) ⇒ <code>[Collection](#Collection)</code>
        * [.remove()](#Collection+remove) ⇒ <code>[Collection](#Collection)</code>
        * [.replace(html)](#Collection+replace) ⇒ <code>[Collection](#Collection)</code>
        * [.insertAfter(html)](#Collection+insertAfter) ⇒ <code>[Collection](#Collection)</code>
        * [.insertBefore(html)](#Collection+insertBefore) ⇒ <code>[Collection](#Collection)</code>
        * [.empty()](#Collection+empty) ⇒ <code>[Collection](#Collection)</code>
        * [.on(type, [selector], handler)](#Collection+on) ⇒ <code>[Collection](#Collection)</code>
        * [.once(type, [selector], handler)](#Collection+once) ⇒ <code>[Collection](#Collection)</code>
        * [.off(type, [selector], handler)](#Collection+off) ⇒ <code>[Collection](#Collection)</code>
        * [.emit(eventName)](#Collection+emit) ⇒ <code>[Collection](#Collection)</code>
        * [.dispatch(event)](#Collection+dispatch) ⇒ <code>[Collection](#Collection)</code>
    * _static_
        * [.wrap(collection, ndom, window)](#Collection.wrap) ⇒ <code>[Collection](#Collection)</code>

<a name="Collection+node"></a>

##### collection.node ⇒ <code>HTMLElement</code>
<a name="Collection+parent"></a>

##### collection.parent ⇒ <code>[Collection](#Collection)</code>
<a name="Collection+size"></a>

##### collection.size ⇒ <code>Object</code>
<a name="Collection+width"></a>

##### collection.width ⇒ <code>number</code>
<a name="Collection+height"></a>

##### collection.height ⇒ <code>number</code>
<a name="Collection+outerSize"></a>

##### collection.outerSize ⇒ <code>Object</code>
<a name="Collection+offset"></a>

##### collection.offset ⇒ <code>Object</code>
<a name="Collection+offsetParent"></a>

##### collection.offsetParent ⇒ <code>[Collection](#Collection)</code>
<a name="Collection+offsetViewport"></a>

##### collection.offsetViewport ⇒ <code>ClientRect</code>
<a name="Collection+position"></a>

##### collection.position ⇒ <code>Object</code>
<a name="Collection+left"></a>

##### collection.left ⇒ <code>number</code>
<a name="Collection+top"></a>

##### collection.top ⇒ <code>number</code>
<a name="Collection+html"></a>

##### collection.html ⇒ <code>string</code>
<a name="Collection+outerHtml"></a>

##### collection.outerHtml ⇒ <code>string</code>
<a name="Collection+text"></a>

##### collection.text ⇒ <code>string</code>
<a name="Collection+class"></a>

##### collection.class ⇒ <code>string</code>
<a name="Collection+classes"></a>

##### collection.classes ⇒ <code>Array</code>
<a name="Collection+children"></a>

##### collection.children ⇒ <code>[Collection](#Collection)</code>
<a name="Collection+length"></a>

##### collection.length ⇒ <code>number</code>
<a name="Collection+html"></a>

##### collection.html

| Param | Type |
| --- | --- |
| html | <code>string</code> | 

<a name="Collection+text"></a>

##### collection.text

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="Collection+query"></a>

##### collection.query(selector) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| selector | <code>string</code> &#124; <code>[Collection](#Collection)</code> &#124; <code>HTMLElement</code> &#124; <code>\*</code> | 

<a name="Collection+queryParents"></a>

##### collection.queryParents(selector) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| selector | <code>string</code> &#124; <code>[Collection](#Collection)</code> &#124; <code>HTMLElement</code> &#124; <code>\*</code> | 

<a name="Collection+contains"></a>

##### collection.contains(child) ⇒ <code>boolean</code>

| Param | Type |
| --- | --- |
| child | <code>string</code> &#124; <code>[Collection](#Collection)</code> &#124; <code>HTMLElement</code> &#124; <code>\*</code> | 

<a name="Collection+clone"></a>

##### collection.clone() ⇒ <code>[Collection](#Collection)</code>
<a name="Collection+getAttr"></a>

##### collection.getAttr(name) ⇒ <code>string</code> &#124; <code>null</code>

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Collection+hasClass"></a>

##### collection.hasClass(name) ⇒ <code>boolean</code>

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Collection+setAttr"></a>

##### collection.setAttr(name, value) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| value | <code>\*</code> | 

<a name="Collection+addClass"></a>

##### collection.addClass(name) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Collection+removeClass"></a>

##### collection.removeClass(name) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Collection+setHtml"></a>

##### collection.setHtml(html) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| html | <code>string</code> | 

<a name="Collection+setText"></a>

##### collection.setText(text) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="Collection+serialize"></a>

##### collection.serialize([asObject]) ⇒ <code>string</code> &#124; <code>object</code>

| Param | Type |
| --- | --- |
| [asObject] | <code>boolean</code> | 

<a name="Collection+append"></a>

##### collection.append(children) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| children | <code>[Collection](#Collection)</code> &#124; <code>HTMLElement</code> &#124; <code>Array</code> &#124; <code>\*</code> | 

<a name="Collection+prepend"></a>

##### collection.prepend(children) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| children | <code>[Collection](#Collection)</code> &#124; <code>HTMLElement</code> &#124; <code>\*</code> | 

<a name="Collection+remove"></a>

##### collection.remove() ⇒ <code>[Collection](#Collection)</code>
<a name="Collection+replace"></a>

##### collection.replace(html) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| html | <code>string</code> &#124; <code>[Collection](#Collection)</code> &#124; <code>HTMLElement</code> &#124; <code>\*</code> | 

<a name="Collection+insertAfter"></a>

##### collection.insertAfter(html) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| html | <code>string</code> &#124; <code>[Collection](#Collection)</code> &#124; <code>HTMLElement</code> &#124; <code>\*</code> | 

<a name="Collection+insertBefore"></a>

##### collection.insertBefore(html) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| html | <code>string</code> &#124; <code>[Collection](#Collection)</code> &#124; <code>HTMLElement</code> &#124; <code>\*</code> | 

<a name="Collection+empty"></a>

##### collection.empty() ⇒ <code>[Collection](#Collection)</code>
<a name="Collection+on"></a>

##### collection.on(type, [selector], handler) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| [selector] | <code>string</code> &#124; <code>function</code> | 
| handler | <code>function</code> | 

<a name="Collection+once"></a>

##### collection.once(type, [selector], handler) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| [selector] | <code>string</code> &#124; <code>function</code> | 
| handler | <code>function</code> | 

<a name="Collection+off"></a>

##### collection.off(type, [selector], handler) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| [selector] | <code>string</code> &#124; <code>function</code> | 
| handler | <code>function</code> | 

<a name="Collection+emit"></a>

##### collection.emit(eventName) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 

<a name="Collection+dispatch"></a>

##### collection.dispatch(event) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| event | <code>Event</code> &#124; <code>\*</code> | 

<a name="Collection.wrap"></a>

##### Collection.wrap(collection, ndom, window) ⇒ <code>[Collection](#Collection)</code>

| Param | Type |
| --- | --- |
| collection | <code>Array</code> &#124; <code>[Collection](#Collection)</code> &#124; <code>NodeList</code> | 
| ndom | <code>[ndom](#ndom)</code> | 
| window | <code>Window</code> | 


## TODO

Test test test.

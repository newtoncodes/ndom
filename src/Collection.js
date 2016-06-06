'use strict';

const isArray = Array.isArray || (arg => Object.prototype.toString.call(arg) === '[object Array]');


/**
 * @extends Array
 */
class Collection extends Array {
    /**
     * @param {Array|Collection|NodeList} collection
     * @param {ndom} ndom
     * @param {Window} window
     * @returns {Collection}
     */
    static wrap(collection, ndom, window) {
        if (!collection) collection = [];
        if (collection.hasOwnProperty('____wrapped____')) return collection;

        let tmp = [];
        for (let i = 0; i < collection.length; i++) tmp.push(collection[i]);
        collection = tmp;

        Object.getOwnPropertyNames(Collection.prototype).forEach(key => {
            if (key === 'length') return;

            let descriptor = Object.getOwnPropertyDescriptor(Collection.prototype, key);
            descriptor.enumerable = false;
            Object.defineProperty(collection, key, descriptor);
        });

        Object.defineProperty(collection, '____wrapped____', {
            configurable: false,
            writable: false,
            value: true,
            enumerable: false
        });

        Object.defineProperty(collection, '____ndom____', {
            configurable: false,
            writable: false,
            value: ndom,
            enumerable: false
        });

        Object.defineProperty(collection, '____window____', {
            configurable: false,
            writable: false,
            value: window,
            enumerable: false
        });

        return collection;
    }

    /**
     * @param {string|Collection|HTMLElement|*} selector
     * @returns {Collection}
     */
    query(selector) {
        if (!this.length) return Collection.wrap([], this.____ndom____, this.____window____);

        let results = [];

        this.forEach(node => this.____ndom____.query(selector, node).forEach(node => {
            if (results.indexOf(node) !== -1) return;
            results.push(node);
        }));

        return Collection.wrap(results, this.____ndom____, this.____window____);
    }

    /**
     * @param {string|Collection|HTMLElement|*} selector
     * @returns {Collection}
     */
    queryParents(selector) {
        if (!this.length) return Collection.wrap([], this.____ndom____, this.____window____);

        let results = [];

        this.forEach(node => {
            let target = node.parentNode;
            if (!target) return;

            let isRight = !selector || this.____ndom____.match(target, selector);

            if (!isRight) while (!isRight && target.parentNode) {
                target = target.parentNode;

                if (this.____ndom____.match(target, selector)) {
                    isRight = true;
                    break;
                }
            }

            if (isRight) {
                if (results.indexOf(target) !== -1) return;
                results.push(target);
            }
        });

        return Collection.wrap(results, this.____ndom____, this.____window____);
    }

    /**
     * @param {string|Collection|HTMLElement|*} child
     * @returns {boolean}
     */
    contains(child) {
        if (!this.length) return false;

        let node = this.node;

        return node !== child && node.contains(child);
    }

    /**
     * @returns {Collection}
     */
    clone() {
        if (!this.length) return Collection.wrap([], this.____ndom____, this.____window____);

        return Collection.wrap([this.node.cloneNode(true)], this.____ndom____, this.____window____);
    }

    /**
     * @param {string} name
     * @returns {string|null}
     */
    getAttr(name) {
        if (!this.length) return null;

        return this.node.getAttribute(name);
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    hasClass(name) {
        if (!this.length) return false;

        let node = this.node;

        if (node.classList) return node.classList.contains(name);
        else return (new RegExp('(^| )' + name + '( |$)', 'gi')).test(node.className);
    }

    /**
     * @param {string} name
     * @param {*} value
     * @returns {Collection}
     */
    setAttr(name, value) {
        this.forEach(node => node.setAttribute(name, value));

        return this;
    }

    /**
     * @param {string} name
     * @returns {Collection}
     */
    addClass(name) {
        this.forEach(node => {
            let hasIt;
            if (node.classList) hasIt = node.classList.contains(name);
            else hasIt = (new RegExp('(^| )' + name + '( |$)', 'gi')).test(node.className);
            if (hasIt) return;

            if (node.classList) node.classList.add(name);
            else node.className += ' ' + name;
        });

        return this;
    }

    /**
     * @param {string} name
     * @returns {Collection}
     */
    removeClass(name) {
        this.forEach(node => {
            let hasIt;
            if (node.classList) hasIt = node.classList.contains(name);
            else hasIt = (new RegExp('(^| )' + name + '( |$)', 'gi')).test(node.className);
            if (!hasIt) return;

            if (node.classList) node.classList.remove(name);
            else node.className = node.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        });

        return this;
    }

    /**
     * @param {string} html
     * @returns {Collection}
     */
    setHtml(html) {
        this.html = html;

        return this;
    }

    /**
     * @param {string} text
     * @returns {Collection}
     */
    setText(text) {
        this.text = text;

        return this;
    }

    /**
     * @param {boolean} [asObject]
     * @returns {string|object}
     */
    serialize(asObject) {
        let form = this.node, len, i, j;

        if (asObject) {
            let data = {};

            if (!form) return data;

            if ((typeof form === 'object') && (typeof form.elements !== 'undefined')) {
                len = form.elements.length;

                for (i = 0; i < len; i++) {
                    field = form.elements[i];
                    if (['input', 'select', 'textarea'].indexOf(field.tagName.toLocaleLowerCase()) === -1) continue;

                    if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                        if (field.type == 'select-multiple') {
                            for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                                if (field.options[j].selected) data[field.name] = field.options[j].value;
                            }
                        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                            data[field.name] = field.value;
                        }
                    }
                }
            }

            return data;
        }

        if (!form) return '';

        let field, s = [];

        if ((typeof form === 'object') && (typeof form.elements !== 'undefined')) {
            len = form.elements.length;

            for (i = 0; i < len; i++) {
                field = form.elements[i];
                if (['input', 'select', 'textarea'].indexOf(field.tagName.toLocaleLowerCase()) === -1) continue;

                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                            if (field.options[j].selected) s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                    }
                }
            }
        }

        return s.join('&').replace(/%20/g, '+');
    }

    /**
     * @param {Collection|HTMLElement|Array|*} children
     * @returns {Collection}
     */
    append(children) {
        if (!this.length) return this;

        if (isArray(children)) children.forEach(child => this.node.appendChild(child));
        else this.node.appendChild(children);

        return this;
    }

    /**
     * @param {Collection|HTMLElement|*} children
     * @returns {Collection}
     */
    prepend(children) {
        if (!this.length) return this;

        let node = this.node;

        if (isArray(children)) for (let i = children.length - 1; i >= 0; i--) node.insertBefore(children[i], node.firstChild);
        else node.insertBefore(children, node.firstChild);

        return this;
    }

    /**
     * @returns {Collection}
     */
    remove() {
        this.forEach(node => node.parentNode.removeChild(node));

        return this;
    }

    /**
     * @param {string|Collection|HTMLElement|*} html
     * @returns {Collection}
     */
    replace(html) {
        this.forEach(node => {
            if (typeof html === 'string') node.outerHTML = html;
            else {
                let parent = node.parentNode;

                if (isArray(html)) for (let i = html.length - 1; i >= 0; i--) parent.insertBefore(html[i], node);
                else parent.insertBefore(html, node);

                parent.removeChild(node);
            }
        });

        return this;
    }

    /**
     * @param {string|Collection|HTMLElement|*} html
     * @returns {Collection}
     */
    insertAfter(html) {
        this.forEach(node => {
            if (typeof html === 'string') node.insertAdjacentHTML('afterend', html);
            else {
                let parent = node.parentNode;

                if (isArray(html)) {
                    for (let i = 0; i < html.length; i++) {
                        if (node.nextSibling) parent.insertBefore(html, node.nextSibling);
                        else parent.appendChild(html[i]);
                    }
                } else {
                    if (node.nextSibling) parent.insertBefore(html, node.nextSibling);
                    else parent.appendChild(html);
                }
            }
        });

        return this;
    }

    /**
     * @param {string|Collection|HTMLElement|*} html
     * @returns {Collection}
     */
    insertBefore(html) {
        this.forEach(node => {
            if (typeof html === 'string') node.insertAdjacentHTML('beforebegin', html);
            else {
                let parent = node.parentNode;

                if (isArray(html)) for (let i = html.length - 1; i >= 0; i--) parent.insertBefore(html[i], node);
                else parent.insertBefore(html, node);
            }
        });

        return this;
    }

    /**
     * @returns {Collection}
     */
    empty() {
        this.forEach(node => {
            while (node.firstChild) node.removeChild(node.firstChild);
        });

        return this;
    }

    /**
     * @param {string} type
     * @param {string|function} [selector]
     * @param {function} handler
     * @returns {Collection}
     */
    on(type, selector, handler) {
        if (!handler) {
            handler = selector;
            selector = undefined;
        }
        if (!type || !handler || (typeof handler !== 'function')) return this;

        this.forEach(node => addListener(this.____ndom____, node, type, handler, false, selector));

        return this;
    }

    /**
     * @param {string} type
     * @param {string|function} [selector]
     * @param {function} handler
     * @returns {Collection}
     */
    once(type, selector, handler) {
        if (!handler) {
            handler = selector;
            selector = undefined;
        }
        if (!type || !handler || (typeof handler !== 'function')) return this;

        this.forEach(node => addListener(this.____ndom____, node, type, handler, true, selector));

        return this;
    }

    /**
     * @param {string} type
     * @param {string|function} [selector]
     * @param {function} handler
     * @returns {Collection}
     */
    off(type, selector, handler) {
        if (!handler) {
            handler = selector;
            selector = undefined;
        }

        if (!type || !handler || (typeof handler !== 'function')) return this;

        this.forEach(node => removeListener(this.____ndom____, node, type, handler, selector));

        return this;
    }

    /**
     * @param {string} eventName
     * @returns {Collection}
     */
    emit(eventName) {
        this.forEach(node => {
            if (this.____window____.document.createEvent) {
                let event = this.____window____.document.createEvent('HTMLEvents');
                event.initEvent(eventName, true, false);
                node.dispatchEvent(event);
            } else node.fireEvent('on' + eventName);
        });

        return this;
    }

    /**
     * @param {Event|*} event
     * @returns {Collection}
     */
    dispatch(event) {
        this.forEach(node => node.dispatchEvent(event));

        return this;
    }


    // ---

    /** @returns {HTMLElement} */
    get node() {
        if (!this.length) return null;

        return this[0];
    }

    /** @returns {Collection} */
    get parent() {
        if (!this.length) return null;

        return Collection.wrap([this.node.parentNode], this.____ndom____, this.____window____);
    }

    /** @returns {{width: number, height: number}} */
    get size() {
        if (!this.length) return {width: 0, height: 0};
        let node = this.node;

        return {width: node.offsetWidth, height: node.offsetHeight};
    }

    /** @returns {number} */
    get width() {
        if (!this.length) return 0;
        return this.node.offsetWidth;
    }

    /** @returns {number} */
    get height() {
        if (!this.length) return 0;
        return this.node.offsetHeight;
    }

    /** @returns {{width: number, height: number}} */
    get outerSize() {
        if (!this.length) return {width: 0, height: 0};

        let node = this.node;
        let width, height, style;

        height = node.offsetHeight;
        style = node.currentStyle || getComputedStyle(node);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);

        width = node.offsetWidth;
        style = node.currentStyle || getComputedStyle(node);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);

        return {width, height};
    }

    /** @returns {{top: number, left: number}} */
    get offset() {
        if (!this.length) return {top: 0, left: 0};

        let rect = this.node.getBoundingClientRect();

        return {
            top: rect.top + this.____window____.document.body.scrollTop,
            left: rect.left + this.____window____.document.body.scrollLeft
        };
    }

    /** @returns {Collection} */
    get offsetParent() {
        if (!this.length) return null;

        return Collection.wrap([this.node.offsetParent || this.node], this.____ndom____, this.____window____);
    }

    /** @returns {ClientRect} */
    get offsetViewport() {
        return this.node.getBoundingClientRect();
    }

    /** @returns {{top: number, left: number}} */
    get position() {
        if (!this.length) return {top: 0, left: 0};

        let node = this.node;

        return {left: node.offsetLeft, top: node.offsetTop};
    }

    /** @returns {number} */
    get left() {
        if (!this.length) return 0;
        return this.node.offsetLeft;
    }

    /** @returns {number} */
    get top() {
        if (!this.length) return 0;
        return this.node.offsetTop;
    }

    /** @returns {string} */
    get html() {
        if (!this.length) return '';
        return this.node.innerHTML;
    }

    /** @returns {string} */
    get outerHtml() {
        if (!this.length) return '';
        return this.node.outerHTML;
    }

    /** @returns {string} */
    get text() {
        if (!this.length) return '';

        let node = this.node;

        return node.textContent || node.innerText;
    }

    /** @returns {string} */
    get class() {
        if (!this.length) return '';
        return this.node.className;
    }

    /** @returns {Array} */
    get classes() {
        if (!this.length) return [];
        return this.node.className.trim().split(/\s+/);
    }

    /** @returns {Collection} */
    get children() {
        if (!this.length) return Collection.wrap([], this.____ndom____, this.____window____);

        let node = this.node;
        let children = [];

        for (let i = node.children.length; i--;) {
            if (node.children[i].nodeType != 8) children.unshift(node.children[i]);
        }

        return Collection.wrap(children, this.____ndom____, this.____window____);
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @returns {number}
     */
    get length() {
        return 0;
    }

    /**
     * @param {string} html
     */
    set html(html) {
        this.forEach(node => node.innerHTML = html);
    }

    /**
     * @param {string} text
     */
    set text(text) {
        this.forEach(node => {
            if (node.textContent !== undefined) node.textContent = text;
            else node.innerText = text;
        });
    }
}


function addListener(ndom, node, type, handler, once, selector) {
    if (!node._____events_____) node._____events_____ = {};
    if (!node._____events_____[type]) node._____events_____[type] = [];

    let list = node._____events_____[type];
    for (let i = 0, l = list.length; i < l; i++) {
        if (list[i].____handler____ === handler) return;
    }

    let cb = !selector ? (e) => {
        if (once) removeListener(ndom, node, type, handler);
        handler.call(node, e, node);
    } : (e) => {
        let target = e.target;
        let isRight = target && ndom.match(target, selector);

        if (!isRight) while (!isRight && target && target.parentNode) {
            target = target.parentNode;
            if (ndom.match(target, selector)) {
                isRight = true;
                break;
            }
        }

        if (!isRight) return;

        e.realTarget = target;

        if (once) removeListener(ndom, node, type, handler, selector);
        handler.call(node, e, node);
    };
    cb.____handler____ = handler;
    cb.____selector____ = selector;

    if (node.addEventListener) node.addEventListener(type, cb);
    else node.attachEvent('on' + type, cb);

    list.push(cb);
}

function removeListener(ndom, node, type, handler, selector) {
    if (!handler || !node._____events_____ || !node._____events_____[type]) return;

    let list = node._____events_____[type];
    for (let i = 0, l = list.length; i < l; i++) {
        if (list[i].____handler____ !== handler || list[i].____selector____ !== selector) continue;

        if (node.removeEventListener) node.removeEventListener(type, list[i]);
        else node.detachEvent('on' + type, list[i]);

        list.splice(i, 1);
        break;
    }

    if (list.length === 0) delete node._____events_____[type];
}


module.exports = Collection;
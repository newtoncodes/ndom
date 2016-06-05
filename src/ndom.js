'use strict';

const Collection = require('./Collection');
const isArray = Array.isArray || (arg => Object.prototype.toString.call(arg) === '[object Array]');


/**
 * @param {*} selector
 * @param {*} [parent]
 * @return {Collection}
 * @constructor
 */
function ndom(selector, parent) {
    return ndom.query(selector, parent);
}

/**
 * @param {*} selector
 * @param {*} [parent]
 * @return {Collection}
 */
ndom.query = (selector, parent) => {
    if (typeof selector !== 'string') return ndom.wrap(selector);

    if (parent && (typeof parent['____wrapped____'] !== 'undefined')) parent = parent[0] || null;
    if (parent && isArray(parent)) parent = parent[0] || null;

    return Collection.wrap((parent || window.document).querySelectorAll(selector), ndom, window);
};

/**
 * @param {*} collection
 * @return {Collection}
 */
ndom.wrap = (collection) => {
    if (!collection) return Collection.wrap([], ndom, window);
    if (isArray(collection)) return Collection.wrap(collection, ndom, window);

    return Collection.wrap([collection], ndom, window);
};

/**
 * @param {*} el
 * @param {*} selector
 * @return {boolean}
 */
ndom.match = (el, selector) => {
    if (typeof selector !== 'string') return el === selector;

    let _matches = (
        el['matches'] ||
        el['matchesSelector'] ||
        el['msMatchesSelector'] ||
        el['mozMatchesSelector'] ||
        el['webkitMatchesSelector'] ||
        el['oMatchesSelector']
    );

    if (_matches) return _matches.call(el, selector);
    else if (el.parentNode) {
        let nodes = el.parentNode.querySelectorAll(selector);

        for (var i = nodes.length; i--;) {
            if (nodes[i] === el) return true;
        }
    }

    return false;
};

/**
 * @param {function} callback
 * @return {ndom}
 */
ndom.onLoad = function (callback) {
    if (load || window.document['readyState'] != 'loading') {
        callback();
        return ndom;
    }

    loadListeners.push(callback);

    if (loadInitiated) return ndom;

    loadInitiated = true;

    if (window.document['readyState'] != 'loading') loadHandler();
    else if (window.addEventListener) window.addEventListener('load', loadHandler);
    else {
        window.attachEvent('onload', () => {
            if (window['readyState'] != 'loading') loadHandler();
        });

        window.attachEvent('load', () => {
            if (window['readyState'] != 'loading') loadHandler();
        });

        window.attachEvent('onreadystatechange', () => {
            if (window['readyState'] != 'loading') loadHandler();
        });

        window.attachEvent('readystatechange', () => {
            if (window['readyState'] != 'loading') loadHandler();
        });
    }

    return ndom;
};

/**
 * @param {function} callback
 * @return {ndom}
 */
ndom.onReady = function (callback) {
    if (ready || window.document['readyState'] != 'loading') {
        callback();
        return ndom;
    }

    readyListeners.push(callback);

    if (readyInitiated) return ndom;

    readyInitiated = true;

    if (window.document.readyState != 'loading') setTimeout(readyHandler, 0);
    else if (window.document.addEventListener) window.document.addEventListener('DOMContentLoaded', readyHandler);
    else {
        window.document.attachEvent('onreadystatechange', () => {
            if (window.document.readyState != 'loading') readyHandler();
        });

        window.document.attachEvent('readystatechange', () => {
            if (window.document.readyState != 'loading') readyHandler();
        });
    }

    return ndom;
};


let ready = false;
let readyInitiated = false;
let readyListeners = [];

let load = false;
let loadInitiated = false;
let loadListeners = [];

function readyHandler() {
    if (ready) return;
    ready = true;
    readyListeners.forEach(callback => callback());
    readyListeners = [];
}

function loadHandler() {
    if (load) return;
    load = true;

    loadListeners.forEach(function (callback) {
        callback();
    });
    loadListeners = [];
}


module.exports = ndom;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ajax {
    static create(opts, callback) {
        let xHttp = new XMLHttpRequest();
        xHttp.addEventListener('load', () => {
            callback(xHttp.response);
        });
        xHttp.open(opts.method ? opts.method : Ajax.defaults.method, opts.url ? opts.url : Ajax.defaults.url, opts.async ? opts.async : Ajax.defaults.async);
        if (opts.hasOwnProperty('contentType')) {
            xHttp.setRequestHeader('Content-Type', opts.contentType ? opts.contentType : Ajax.defaults.contentType);
        }
        if (opts.hasOwnProperty('responseType')) {
            xHttp.responseType = opts.responseType;
        }
        if (opts.hasOwnProperty('data') && typeof opts.data === 'object') {
            opts.data = JSON.stringify(opts.data);
        }
        xHttp.send(opts.data ? opts.data : null);
    }
}
Ajax.defaults = {
    url: '',
    method: 'GET',
    contentType: 'text/html',
    async: true,
    data: null
};
exports.Ajax = Ajax;

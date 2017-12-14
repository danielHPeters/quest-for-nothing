export class Ajax {
  private static defaults = {
    url: '',
    method: 'GET',
    contentType: 'text/html',
    async: true,
    data: null
  }

  /**
   * Create and send an XML-HTTP request.
   * Requires an options object.
   *
   * @param opts Possible option properties:
   * url = url to send the request to.
   * method = request method. GET, POST, PUT, DELETE.
   * contentType = specify the content type of the request.
   * async = boolean flag for async calls. Defaults to true.
   * data = request body.
   * @param callback success callback function
   */
  public static create (opts, callback): void {
    let xHttp = new XMLHttpRequest()
    xHttp.addEventListener('load', () => {
      callback(xHttp.response)
    })
    xHttp.open(
      opts.method ? opts.method : Ajax.defaults.method,
      opts.url ? opts.url : Ajax.defaults.url,
      opts.async ? opts.async : Ajax.defaults.async
    )
    if (opts.hasOwnProperty('contentType')) {
      xHttp.setRequestHeader(
        'Content-Type',
        opts.contentType ? opts.contentType : Ajax.defaults.contentType
      )
    }
    if (opts.hasOwnProperty('responseType')) {
      xHttp.responseType = opts.responseType
    }
    if (opts.hasOwnProperty('data') && typeof opts.data === 'object') {
      opts.data = JSON.stringify(opts.data)
    }
    xHttp.send(opts.data ? opts.data : null)
  }
}

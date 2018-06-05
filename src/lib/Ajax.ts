export enum HttpMethod {
  GET = 'GET', POST = 'POST'
}

export interface AjaxOptions {
  url: string
  method: HttpMethod
  contentType: string
  responseType: XMLHttpRequestResponseType
  async: boolean
  data
}

/**
 * Class used to create Ajax requests.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Ajax {
  private static defaults = {
    url: '',
    method: HttpMethod.GET,
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
  static create (opts: Partial<AjaxOptions>, callback: (response: any) => void): void {
    const xHttp = new XMLHttpRequest()
    xHttp.addEventListener('load', () => callback(xHttp.response))
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

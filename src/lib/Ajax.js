export default class Ajax {
  /**
   * Create an createAndSendRequest request and submit data to an url location.
   * Sends the data as JSON string.
   *
   * @param {{}} data object containing data to submit
   * @param url location to submit the data to
   * @param callback success callback function
   */
  static createAndSendRequest (data, url, callback) {
    let xHttp = new XMLHttpRequest()
    xHttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        callback()
      }
    }
    xHttp.open('POST', url)
    xHttp.setRequestHeader('Content-Type', 'application/json')
    xHttp.send(JSON.stringify(data))
  }
}

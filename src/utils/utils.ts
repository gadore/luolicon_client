
function debounce (method: any, timeout: number, ...context:Array<any>) {
  clearTimeout(method.timeout)
  method.timeout = setTimeout(function () {
    method(...context)
  }, timeout)
}

function isNull (arg: any) {
  if (arg === undefined || arg === null || arg === 'undefined' || arg === 'null' || arg === 'NaN' || arg === '') {
    return true
  } else {
    return false
  }
}

function errorMsgMaker (fileName: string, methodName: string, errorMessage: string) {
  return '[' + fileName + ']<' + methodName + '> :' + errorMessage
}

function logger (msg: any) {
  // eslint-disable-next-line no-console
  console.log(msg)
}

function notify (type:string, title: string, content: string) {
  const customEvent = new CustomEvent('notify', { detail: { type, title, content, duration: 3000 } })
  document.dispatchEvent(customEvent)
}

export default {
  debounce, isNull, errorMsgMaker, logger, notify
}

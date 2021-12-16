import utils from './utils'

interface WebSocketClient {
  client: WebSocket,
  heartbeatsCallBack: Function | undefined,
  connectedCallBack: Function | undefined
}

const WSClient: Map<string, WebSocketClient> = new Map<string, WebSocketClient>()

const handleMessage = (e: any) => {
  try {
    const msg = JSON.parse(e)
    if (!utils.isNull(msg.serviceName)) {
      switch (msg.serviceName) {
        case 'register':
          document.dispatchEvent(new CustomEvent('register', { detail: msg }))
          break
      }
    }
  } catch (e) {
    utils.logger(utils.errorMsgMaker('WebSocketService', 'handleMessage', '处理WebSocket信息出错: ' + String(e)))
  }
}

const send = (clientId: string, msg: any) => {
  try {
    WSClient.get(clientId)?.client.send(JSON.stringify(msg.detail))
  } catch (e) {
    utils.logger(utils.errorMsgMaker('WebSocketService', 'send', '发送WebSocket信息出错: ' + String(e)))
  }
}

const CreateWebSocketClient = (clientId: string, wsUrl: string, autoReconnect: Boolean, onConnectedCallBack: Function, onHeartbeatsCallBack: Function) => {
  try {
    const tempWS = new WebSocket(wsUrl)

    tempWS.onopen = () => onConnectedCallBack()

    tempWS.onmessage = (e: MessageEvent) => handleMessage(e.data)

    tempWS.onclose = () => {
      if (autoReconnect && tempWS.readyState === 3) {
        CreateWebSocketClient(clientId, wsUrl, autoReconnect, onConnectedCallBack, onHeartbeatsCallBack)
      }
    }

    document.removeEventListener('wsSend', (e) => { send(clientId, e) })
    document.addEventListener('wsSend', (e) => { send(clientId, e) })

    WSClient.set(clientId, {
      client: tempWS,
      heartbeatsCallBack: onHeartbeatsCallBack,
      connectedCallBack: onConnectedCallBack
    })
  } catch (e) {
    utils.logger(utils.errorMsgMaker('WebSocketService', 'webSocketClient', '无法初始化WebSocket: ' + String(e)))
  }
}

setInterval(() => {
  WSClient.forEach((client: WebSocketClient) => {
    if (client.heartbeatsCallBack !== undefined) {
      client.heartbeatsCallBack()
    }
  }, 2000)
})

export default CreateWebSocketClient

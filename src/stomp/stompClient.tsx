import * as StompJS from '@stomp/stompjs';

export const wsClient = new StompJS.Client();

export const wsConnect = (connectAction: () => void) => {
  wsClient.configure({
    brokerURL: process.env.NEXT_PUBLIC_WS_URL,
    connectHeaders: {
      login: 'user',
      passcode: 'password',
    },
    onStompError: frame => {
      console.log(`Broker reported error: ${frame.headers.message}`);
      console.log(`Additional details: ${frame.body}`);
    },
    onConnect: () => {
      if (wsClient.connected) {
        connectAction();
      }
    },
    debug(message) {
      console.log(message);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  wsClient.activate();
};

export const wsDisconnect = () => {
  wsClient.deactivate();
};

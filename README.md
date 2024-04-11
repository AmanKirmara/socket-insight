# SocketInsight

SocketInsight is a production-grade real-time WebSockets debugging package that allows developers to efficiently monitor and debug WebSocket connections in real time. It provides an easy-to-use API for handling WebSocket events, messages, and errors, making WebSocket debugging simpler and more efficient.

## Installation

To install SocketInsight, use one of the following commands:

```bash
# Using npm
npm install socket-insight

# Or using yarn
yarn add socket-insight


Usage: mycli [options]

Foos your bar.

Options:
  -b, --bar <string>  foo what?
  -h, --help          display help for command

```

# API Documentation

```js
import SocketInsight from 'socket-insight';

// Create a new instance of SocketInsight
const url = 'wss://echo.websocket.org';
const debuggerInstance = new SocketInsight(url, {
    retryAttempts: 3, // Number of retry attempts after disconnection
    retryDelay: 1000 // Delay between retry attempts in milliseconds
});

// Register event listeners
debuggerInstance.on('open', () => console.log('Connected to WebSocket.'));
debuggerInstance.on('message', (message) => console.log('Received message:', message));
debuggerInstance.on('close', (code, reason) => console.log('Disconnected:', code, reason));
debuggerInstance.on('error', (error) => console.error('Error:', error));

// Send a message through the WebSocket
debuggerInstance.sendMessage('Hello, WebSocket!');

// Close the connection
debuggerInstance.closeConnection();


```

## Function Documentation

### foo(value) ⇒ <code>any</code>

Returns whatever value is passed.

**Kind**: global function  
**Returns**: <code>any</code> - Whatever value it was passed.

| Param | Type | Description |



## Connect with Me

Stay updated with the latest news and updates. Follow me on social media:

- [Instagram](https://www.instagram.com/itsahil143)
- [LinkedIn](https://www.linkedin.com/in/aman-janagal-36505829b?trk=people-guest_people_search-card)


See more great templates and other tools on
[my GitHub Profile](https://github.com/amankirmara)!
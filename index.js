import { WebSocket } from 'ws';

/**
 * SocketInsight - Real-Time WebSockets Debugger
 * 
 * SocketInsight is a utility for debugging and monitoring WebSocket connections in real-time.
 * It provides a convenient interface for handling events such as connection, messages, errors, and disconnections.
 * 
 * Usage:
 * 
 * const debugger = new SocketInsight('wss://example.com', {
 *     retryAttempts: 3, // Number of retry attempts after disconnection
 *     retryDelay: 1000 // Delay between retry attempts in milliseconds
 * });
 * 
 * debugger.on('open', () => console.log('Connected'));
 * debugger.on('message', (message) => console.log('Received message:', message));
 * debugger.on('close', (code, reason) => console.log('Disconnected:', code, reason));
 * debugger.on('error', (error) => console.error('Error:', error));
 * 
 * debugger.sendMessage('Hello, WebSocket!');
 * debugger.closeConnection();
 */
class SocketInsight {
    /**
     * Constructor for creating a new SocketInsight instance.
     * @param {string} url - The WebSocket URL to connect to.
     * @param {object} [options={}] - Configuration options.
     * @param {number} [options.retryAttempts=3] - Number of retry attempts after disconnection.
     * @param {number} [options.retryDelay=1000] - Delay between retry attempts in milliseconds.
     */
    constructor(url, options = {}) {
        this.url = url;
        this.retryAttempts = options.retryAttempts || 3;
        this.retryDelay = options.retryDelay || 1000; // in milliseconds
        this.listeners = {};
        this.connect();
    }

    /**
     * Establishes a connection to the WebSocket URL.
     */
    connect() {
        this.socket = new WebSocket(this.url);
        
        // Attach event listeners
        this.socket.addEventListener('open', this.handleOpen.bind(this));
        this.socket.addEventListener('message', this.handleMessage.bind(this));
        this.socket.addEventListener('close', this.handleClose.bind(this));
        this.socket.addEventListener('error', this.handleError.bind(this));
    }

    /**
     * Handles the open event of the WebSocket connection.
     * Executes the user-defined 'open' listener, if available.
     */
    handleOpen() {
        console.log(`[SocketInsight] Connected to ${this.url}`);
        if (this.listeners.open) {
            this.listeners.open();
        }
    }

    /**
     * Handles incoming messages from the WebSocket connection.
     * Executes the user-defined 'message' listener, if available.
     * @param {MessageEvent} event - The message event containing the data.
     */
    handleMessage(event) {
        console.log(`[SocketInsight] Received message: ${event.data}`);
        if (this.listeners.message) {
            this.listeners.message(event.data);
        }
    }

    /**
     * Handles the close event of the WebSocket connection.
     * Implements retry logic if disconnection is unexpected.
     * Executes the user-defined 'close' listener, if available.
     * @param {CloseEvent} event - The close event containing the code and reason for closure.
     */
    handleClose(event) {
        console.log(`[SocketInsight] Disconnected with code ${event.code} and reason: ${event.reason}`);
        
        // Retry connection if necessary
        if (event.code !== 1000 && this.retryAttempts > 0) {
            console.log(`[SocketInsight] Retrying connection in ${this.retryDelay}ms...`);
            setTimeout(() => {
                this.retryAttempts--;
                this.connect();
            }, this.retryDelay);
        }

        if (this.listeners.close) {
            this.listeners.close(event.code, event.reason);
        }
    }

    /**
     * Handles errors that occur on the WebSocket connection.
     * Executes the user-defined 'error' listener, if available.
     * @param {ErrorEvent} event - The error event containing the error message.
     */
    handleError(event) {
        console.error(`[SocketInsight] Error: ${event.message}`);
        if (this.listeners.error) {
            this.listeners.error(event);
        }
    }

    /**
     * Sends a message through the WebSocket connection.
     * Only sends the message if the WebSocket is open.
     * @param {string} message - The message to send.
     */
    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
            console.log(`[SocketInsight] Sent message: ${message}`);
        } else {
            console.error(`[SocketInsight] Cannot send message, WebSocket is not open. Current readyState: ${this.socket.readyState}`);
        }
    }
    
    /**
     * Closes the WebSocket connection gracefully.
     */
    closeConnection() {
        this.socket.close(1000, 'Client closed the connection');
        console.log(`[SocketInsight] Closed connection to ${this.url}`);
    }

    /**
     * Registers an event listener for a specified event.
     * @param {string} event - The event to listen for ('open', 'message', 'close', or 'error').
     * @param {function} listener - The callback function to execute when the event occurs.
     */
    on(event, listener) {
        this.listeners[event] = listener;
    }
}

export default SocketInsight;

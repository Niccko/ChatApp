import SockJS from "sockjs-client"
import {Stomp} from "@stomp/stompjs";

export function createWebsocketProvider() {
    let _stomp;
    let connected;

    function connect() {
        _stomp = Stomp.over(() => {

            return new SockJS("http://localhost:8075/chat");

        });
        _stomp.debug = () => {
        };
        _stomp.reconnect_delay = 5000;
        _stomp.connect({}, (f) => {
            connected = true;
            console.log("Connected websocket.")
        });

    }

    function disconnect() {
        if (_stomp) {
            _stomp.disconnect(() => console.log("Disconnected websocket."))
            _stomp = null;
            connected=false;
        }
    }

    function send(destination, body) {
        if (_stomp) {
            _stomp.send("/app/" + destination, {}, body);
        }
    }

    function subscribe(topic, callback) {
        if (_stomp) {
            _stomp.subscribe(topic, (m) => console.log(m.body),callback);
        }
    }

    function isConnected(){
        return connected;
    }

    return {
        connect,
        disconnect,
        send,
        subscribe,
        isConnected
    }
}

export const {connect, disconnect, send, subscribe,isConnected} = createWebsocketProvider();
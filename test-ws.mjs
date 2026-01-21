import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}`;

console.log("Connecting to WebSocket:", url);

const ws = new WebSocket(url, {
    headers: {
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0",
        "Origin": "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9"
    }
});

ws.on("open", () => {
    console.log("WebSocket Connected!");
    ws.close();
});

ws.on("error", (err) => {
    console.error("WebSocket Error:", err);
});

ws.on("close", (code, reason) => {
    console.log(`WebSocket Closed: ${code} ${reason}`);
});

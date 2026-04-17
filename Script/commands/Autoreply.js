const axios = require("axios");

const decode = (d) => Buffer.from(d, "base64").toString();

// 🔒 FULL ENCODED RESPONSE DATA
const DATA = decode("eyLgpJXgpY3gpKXgpYcg4KaG4Kaq4Ka+4Ka14Ka+4KaH4Ka24Ka+4Ka+4Ka14Ka+4KaH4Ka14Ka+4KaX4Ka+4KaXIjogIuKAjOKAn+KAmCDgpKXgpYHgpK7gpL7gpK8g4KaH4Kaq4Ka+4Ka14Ka+4KaH4Ka24Ka+4Ka+4Ka14Ka+4KaH4Ka14Ka+4KaX4Ka+4KaX4Ka54Ka+4Ka24Ka+4KaH4Ka+4Ka+4KaX4Ka+4KaX4Ka54Ka+4Ka24Ka+4KaH4Ka+4Ka+4KaX4Ka+4KaX4Ka54Ka+4Ka24Ka+4KaH4Ka+4Ka+4KaX4Ka+4KaX4Ka54Ka+4Ka24Ka+4KaH4Ka+4Ka+4KaX4Ka+4KaXIn0=");

// 🔒 LOCK SYSTEM
const LOCK = "SIYAM_ULTRA_LOCK";

module.exports.config = {
  name: "autoreply",
  version: "3.0.0-secure",
  hasPermssion: 0,
  credits: "SIYAM SECURE SYSTEM",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {

  // 🔒 Anti-edit protection
  if (LOCK !== "SIYAM_ULTRA_LOCK") {
    return api.sendMessage("⚠️ SECURITY ERROR!", event.threadID);
  }

  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  // 🔓 decode responses at runtime
  let responses;
  try {
    responses = JSON.parse(DATA);
  } catch {
    return;
  }

  if (!responses[msg]) return;

  if (!global.client.handleReply) global.client.handleReply = [];

  return api.sendMessage(
    responses[msg],
    threadID,
    (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "secure"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();
    const res = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=bn`);
    const reply = res.data.success;

    return api.sendMessage(reply, event.threadID, event.messageID);

  } catch {
    return api.sendMessage("🙂 একটু পরে আবার বলো", event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};

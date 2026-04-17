const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

// 🔒 ENCRYPTED DATA
const NAME = Buffer.from("VURBWSBIQVNBTiBTSU0=", "base64").toString();
const LOCATION = Buffer.from("S0lTSE9SRUdBTkosIEJE", "base64").toString();
const FB = Buffer.from("ZmFjZWJvb2suY29tLzYxNTY4NDExMzEwNzQ4", "base64").toString();
const MSG = Buffer.from("NjE1Njg0MTEzMTA3NDg=", "base64").toString();
const WA = Buffer.from("Kzg4MDE3ODkxMzgxNTc=", "base64").toString();

module.exports.config = {
  name: "admin",
  version: "2.0.0-encrypted",
  hasPermssion: 0,
  credits: "SIYAM SECURE",
  description: "Encrypted Owner Info",
  commandCategory: "info",
  usages: "admin",
  cooldowns: 2
};

module.exports.run = async function({ api, event }) {
  const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

  const callback = () => api.sendMessage({
    body: `
╔════════════════════════════════════════════╗
║   ⚡👑  𝗩𝗜𝗣 𝗡𝗘𝗢𝗡 𝗚𝗟𝗜𝗧𝗖𝗛 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 👑⚡   ║
╚════════════════════════════════════════════╝

▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓

      ✦  SYSTEM ONLINE :: ROYAL MODE  ✦

▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓

╔═══ 💠 PROFILE DATA 💠 ═══╗

➤ 🧑‍💼 NAME      :: ${NAME}
➤ 💖 STATUS    :: SINGLE
➤ 🎂 AGE       :: 17+
➤ 🎓 STUDY     :: CLASS 10
➤ 💼 POSITION :: STUDENT
➤ 🏡 LOCATION :: ${LOCATION}

╚══════════════════════════════╝


╔═══ 📡 CONTACT NETWORK ═══╗

➤ 📘 FACEBOOK   :: ${FB}
➤ 💬 MESSENGER  :: ${MSG}
➤ 📞 WHATSAPP   :: ${WA}

╚══════════════════════════════╝


╔═══ ⚙️ SYSTEM CORE ═══╗

➤ 🤖 BOT NAME   :: SIYAM CHAT BOT
➤ 💎 VERSION    :: 2.0 VIP NEON GLITCH
➤ 🟢 STATUS     :: ONLINE
➤ ⏰ TIME       :: ${time}

╚══════════════════════════════╝


▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓
      🔥 DREAM • WORK • RULE YOUR LIFE 🔥
▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓
`,
    attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

  return request("https://i.imgur.com/QCHmU8Z.jpeg")
    .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
    .on('close', () => callback());
};

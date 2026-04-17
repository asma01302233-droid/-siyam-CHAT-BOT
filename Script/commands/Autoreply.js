const axios = require("axios");

const apiList = "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {
    "আসসালামু আলাইকুম":   " ╔═══════════════【 💬 REPLY 】═══════════════╗   ওয়ালাইকুম আসসালাম কেমন আছো😘[FV_https://www.facebook.com/profile.php?id=61568411310748   ╚══════════════════════════════════════════╝,

"Assalamu Alaikum":   " ╔═══════════════【 💬 REPLY 】═══════════════╗   💎🌷 ওয়ালাইকুম আসসালাম 💕 কেমন আছো তুমি? 💕😊FV_https://www.facebook.com/profile.php?id=61568411310748   ╚══════════════════════════════════════════╝,

"কেমন আছো":    "╔═══════════════【 💬 REPLY 】═══════════════╗   💎🌷 আলহামদুলিল্লাহ, অনেক ভালো আছি 🌷💎😊💕 তুমি কেমন আছো বলো তো? 💕😊FV_https://www.facebook.com/profile.php?id=61568411310748   ╚══════════════════════════════════════════╝,

"সিয়াম":    "╔═══════════════【 💬 REPLY 】═══════════════╗   👤✨ নাম: উদয় হাসান সিয়াম 💫 🏡🌿 বাসা: কিশোরগঞ্জ, বাংলাদেশ 🇧🇩 📚🎓 পড়ালেখা: ক্লাস ১০ 🏫 💔🙂 স্ট্যাটাস: সিঙ্গেল 😌 🎂🎉 বয়স: ১৭+ 🔥 🏫📖 ইস্কুল: এম এ মান্নান মানিক উচ্চ বিদ্যালয় 🏫 👨‍🎓💼 কাজ: স্টুডেন্ট 📘 FV_https://www.facebook.com/profile.php?id=61568411310748    ╚══════════════════════════════════════════╝,

"Hi":    "╔═══════════════【 💬 REPLY 】═══════════════╗   এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵FV_https://www.facebook.com/profile.php?id=61568411310748   ╚══════════════════════════════════════════╝,

"তোমার নাম কি":    "╔═══════════════【 💬 REPLY 】═══════════════╗   💖🤖 আমার নাম: সিয়াম হাসান চ্যাট বট ✨🌙 🌸💕 তোমার নাম কী, প্রিয়? 🥰💫 🕊️💖 বলবে না একটু? তোমার নামটা শুনতে ইচ্ছা করছে... 😊🌷 FV_https://www.facebook.com/profile.php?id=61568411310748   ╚══════════════════════════════════════════╝,

"ভার্চুয়াল কিং":   " ╔═══════════════【 💬 REPLY 】═══════════════╗   👑🔥 VIRTUAL KING 👑 🔥👑 ⚔️😈 নাম: উদয় হাসান সিয়াম 💀✨ 📚📌 পড়ালেখা: ক্লাস ১০ 🏫⚡ 🎂🔥 বয়স: ১৭+ 😎💣 💔🖤 স্ট্যাটাস: সিঙ্গেল 😈🥀 🏫📖 স্কুল: এম এ মান্নান মানিক উচ্চ বিদ্যালয় 🏫👀 👨‍🎓⚡ কাজ: স্টুডেন্ট 💥📘   👁️‍🗨️🔥 ATTITUDE LINE: 😈⚔️ আমি শান্ত থাকি মানে এই না যে দুর্বল… 💀🔥 সময় আসলে নামটাই যথেষ্ট ভয়ের জন্য!   💀🔥⚔️ শুনে রাখ... ⚔️🔥💀 😈🖤 ভাগ এখান থেকে! 🖤",
    "hmm": "Hmmm কিসের হুমম জানু 🥵",
    "love": "Love করলে সরাসরি সাহু বস কে বল জানু 😻🔥"
  };

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
        type: "sahu"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();

    const base = await getMainAPI();
    const link = `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!global.client.handleReply) global.client.handleReply = [];

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "sahu"
        });
      },
      event.messageID
    );

  } catch {
    return api.sendMessage("🙂 একটু পরে আবার বলো", event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};

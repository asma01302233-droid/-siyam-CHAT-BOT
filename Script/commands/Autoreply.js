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
    "miss you": "অরেক বেডারে Miss না করে xan মেয়ে হলে বস সাহু রে হাঙ্গা করো😶👻😘",
    "আসসালামু আলাইকুম": "ওয়ালাইকুম আসসালাম কেমন আছো😘[FV_https://www.facebook.com/profile.php?id=61568411310748", "Assalamu Alaikum": "💎🌷 ওয়ালাইকুম আসসালাম 💕 কেমন আছো তুমি? 💕😊FV_https://www.facebook.com/profile.php?id=61568411310748", "কেমন আছো": "💎🌷 আলহামদুলিল্লাহ, অনেক ভালো আছি 🌷💎😊💕 তুমি কেমন আছো বলো তো? 💕😊FV_https://www.facebook.com/profile.php?id=61568411310748", "সিয়াম": "👤✨ নাম: উদয় হাসান সিয়াম 💫 🏡🌿 বাসা: কিশোরগঞ্জ, বাংলাদেশ 🇧🇩 📚🎓 পড়ালেখা: ক্লাস ১০ 🏫 💔🙂 স্ট্যাটাস: সিঙ্গেল 😌 🎂🎉 বয়স: ১৭+ 🔥 🏫📖 ইস্কুল: এম এ মান্নান মানিক উচ্চ বিদ্যালয় 🏫 👨‍🎓💼 কাজ: স্টুডেন্ট 📘 FV_https://www.facebook.com/profile.php?id=61568411310748 ", "Hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵FV_https://www.facebook.com/profile.php?id=61568411310748", "তোমার নাম কি": "💖🤖 আমার নাম: সিয়াম হাসান চ্যাট বট ✨🌙 🌸💕 তোমার নাম কী, প্রিয়? 🥰💫 🕊️💖 বলবে না একটু? তোমার নামটা শুনতে ইচ্ছা করছে... 😊🌷 FV_https://www.facebook.com/profile.php?id=61568411310748", "ভার্চুয়াল কিং": "👑🔥 VIRTUAL KING 👑 🔥👑 ⚔️😈 নাম: উদয় হাসান সিয়াম 💀✨ 📚📌 পড়ালেখা: ক্লাস ১০ 🏫⚡ 🎂🔥 বয়স: ১৭+ 😎💣 💔🖤 স্ট্যাটাস: সিঙ্গেল 😈🥀 🏫📖 স্কুল: এম এ মান্নান মানিক উচ্চ বিদ্যালয় 🏫👀 👨‍🎓⚡ কাজ: স্টুডেন্ট 💥📘   👁️‍🗨️🔥 ATTITUDE LINE: 😈⚔️ আমি শান্ত থাকি মানে এই না যে দুর্বল… 💀🔥 সময় আসলে নামটাই যথেষ্ট ভয়ের জন্য!   💀🔥⚔️ শুনে রাখ... ⚔️🔥💀 😈🖤 ভাগ এখান থেকে! 🖤😈 💣👁️‍🗨️ তোর মেয়ে আমার কাছে কোনো দাম নাই! ❌💀 ⚔️😡 আমার সামনে দাঁড়ানোর লেভেল তোর না... 🔥👑 👿💥 চুপচাপ দূরে থাক, নইলে নামটাই যথেষ্ট ভয় দেখানোর জন্য! 😈⚡🖤💀 DON’T TEST THE KING 👑🔥 FV_https://www.facebook.com/profile.php?id=61568411310748", "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚", "বাই": "😈🔥 কিরে তুই... আবারও চিপায় যাবি নাকি? 💀⚔️  👑💣 আমার বস সিয়ামকে নিয়ে যা… তারপর দেখব তোরা চিপায় কি করস! 😏🔥 😈🔥 ঠিক আছে, চিপায় যা… ⚔️💀😏 👑💖 আমার বস সিয়ামকে একটা GF ফেতরা দিয়ে যা! 😏💤 FV_https://www.facebook.com/profile.php?id=61568411310748", "বাল": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖FV_https://www.facebook.com/profile.php?id=61568411310748", "সিয়াম ভাই": "👑💼 বস সিয়াম এখন কাজে বিজি আছে… ⏳🔥 💖😊 কি বলবা আমাকে বলো জানু… 🌸✨ 📩💌 নাহলে ইনবক্সে নক দাও… 😏💕 FV_https://www.facebook.com/profile.php?id=61568411310748", "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ 👑━━━━━━━━━━━━━👑✨ ROYAL BOT OWNER ✨👑━━━━━━━━━━━━━👑☜⚜️ Name: Uday Hasan Siyam 🤖🔥 🏡 Location: Kishoreganj, Bangladesh 🇧🇩🌿 📚 Education: Class 10 🎓🏫 🎂 Age: 17+ 🔥😎 💔 Status: Single 🖤😈 💔 Status: Single 🖤😈 👑💣 OWNER LINE: 😈 I’m not just a name… I’m a whole vibe people fear! 🔥⚔️👑━━━━━━━━━━━━━👑 FV_ https://www.facebook.com/profile.php?id=61568411310748 \n WhatsApp: +8801789138157", "admin": "👑🔥 এই হচ্ছে উদয় হাসান সিয়াম 🔥👑 💫😎 তাকে সবাই “সিয়াম” নামেই চিনে… ⚡✨ 😈💥 খানকির পোলা তুই এখনো চিনোস না মাদারচোদ নাকি?😏🔥 📩💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "😁": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "chup": "তুই চুপ চুপ কর পাগল 🐐👈😁 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "Assalamualaikum": "Walaikumassalam❤️‍🩹 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "fork": "https://github.com/shahadat-sahu/SHAHADAT-CHAT-BOT.git", "kiss": "তুমি পঁচা তোমাকে কিস দিবো না 🤭 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস সিয়াম রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "i love you": "মেয়ে হলে আমার বস সিয়াম এর ইনবক্সে এখুনি গুঁতা দিন🫢😻 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss সিয়াম এর ইনবক্সে গুতা দিন 😘 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "ওকে বাই": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️ 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "আমি সিয়াম": "👑🙏 হে সিয়াম বস, কেমন আছেন..?☺️ 💼🤍 সব ঠিক আছে তো, কিছু কি হয়েছে? 🤔💫 🌸💖 জানালে ভালো লাগবে, বস… 🙏😊 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "bot er baccha": "আমার বস সিয়াম এর বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️", "তোমার বস কে": "👑🔥 তাকে সবাই “সিয়াম” নামেই চিনে… 😎⚡ 💀👑 ভার্চুয়াল জগতে সে একটাই — TOP KING! মাদারচোদ 🔥😈💖 ✨ আর তুই এখনো চিনস না নাকি খানকির পোলা মাদারচোদ তর মারে রাইতে চ***? 😏💕 🙏এটা যদি বস সিয়াম তুমি বইলা 😭 থাকো তাহলে তোমাকে বলি নাই 🤧🫵🙏 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "একটা পিক দাও": "এন থেকে সর দুরে গিয়া মর😒 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "😡": "রাগ করে না সোনা পাখি 🥰 বস সিয়ামকে নক দাও 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "নিশি না কালকে": "ভাই তুই এত হাসিস না..!🌚🤣 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "ki koros": "তোমার কথা ভাবতে ছি জানু 😚💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "ki siyam": "বস সিয়াম এর সাথে প্রেমে ব্যস্ত আছি 😏💘 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "kire bot": "হ্যাঁ সব কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "valo aso": "হ্যাঁ রে প্রিও, বস সিয়াম এর দোয়ায় ভালো আছি 😌💞 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "pagol": "হুম পাগল, কিন্তু তোমারই পাগল 😏😂💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "breakup": "চিন্তা করিস না… সিয়াম বস তো আছেই তোকে নতুন জন দিয়া দিবে 😎🔥💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "tui ke": "আমি তোর বস সিয়াম এর ChatBot 😏 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "umm": "এতো Umm কেনো জানু… কিছু বলবা? 😉 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "hmm": "Hmmm কিসের হুমম জানু 🥵 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨", "love": "Love করলে সরাসরি সিয়াম বস কে বল জানু 😻🔥 💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨"
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

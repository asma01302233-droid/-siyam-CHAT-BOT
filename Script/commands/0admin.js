const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");

module.exports.config = {
  name: "0admin",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "SIYAM PROTECTED SYSTEM",
  description: "Secure Admin Management System",
  commandCategory: "Admin",
  usages: "[list | add | remove | only | boxonly] [uid | @mention | reply]",
  cooldowns: 0,
  usePrefix: true,
  dependencies: { "fs-extra": "" }
};

// ================== 🔐 SECURITY CORE ==================

const FILE_PATH = __filename;
const BACKUP_PATH = path.join(__dirname, "cache", "admin.backup.js");

// Hash check
function getHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

let originalHash = "";

function initSecurity() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    originalHash = getHash(data);

    // create backup
    if (!fs.existsSync(BACKUP_PATH)) {
      fs.writeFileSync(BACKUP_PATH, data);
    }
  } catch (e) {}
}

// Auto restore system
function autoRestore() {
  try {
    if (!fs.existsSync(FILE_PATH) && fs.existsSync(BACKUP_PATH)) {
      fs.copyFileSync(BACKUP_PATH, FILE_PATH);
    }
  } catch (e) {}
}

// Integrity monitor
setInterval(() => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const currentHash = getHash(data);

    if (originalHash && currentHash !== originalHash) {
      console.log("🚨 FILE MODIFIED DETECTED - RESTORING...");
      fs.writeFileSync(FILE_PATH, fs.readFileSync(BACKUP_PATH, "utf8"));
    }

    autoRestore();
  } catch (e) {}
}, 5000);

// start security
initSecurity();

// ================== LANGUAGE ==================

module.exports.languages = {
  en: {
    listAdmin: "👑 Admin List:\n\n%1",
    noPermission: "❎ No permission for \"%1\"",
    addedAdmin: "✅ Added %1 admin(s):\n\n%2",
    removedAdmin: "❎ Removed %1 admin(s):\n\n%2",
    adminOnlyOn: "🔓 Admin-only mode ON",
    adminOnlyOff: "🔒 Admin-only mode OFF",
    boxOnlyOn: "🔓 Group admin-only ON",
    boxOnlyOff: "🔒 Group admin-only OFF"
  }
};

// ================== INIT FILE ==================

module.exports.onLoad = () => {
  const dataPath = path.resolve(__dirname, "cache", "data.json");
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({ adminbox: {} }, null, 4));
  }
};

// ================== MAIN SYSTEM ==================

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {

  const { threadID, messageID, mentions } = event;
  const content = args.slice(1);
  const mentionIDs = Object.keys(mentions);

  const configPath = global.client.configPath;
  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);

  const ADMINBOT = global.config.ADMINBOT || config.ADMINBOT || [];

  const getUIDs = () => {
    if (event.type === "message_reply") return [event.messageReply.senderID];
    if (mentionIDs.length) return mentionIDs;
    if (!isNaN(content[0])) return [content[0]];
    return [];
  };

  switch (args[0]) {

    case "list":
    case "all": {
      const msg = [];
      for (const id of ADMINBOT) {
        const name = (await Users.getData(id)).name;
        msg.push(`• ${name}\nhttps://facebook.com/${id}`);
      }
      return api.sendMessage(getText("listAdmin", msg.join("\n\n")), threadID, messageID);
    }

    case "add": {
      if (permssion != 3)
        return api.sendMessage(getText("noPermission", "add"), threadID, messageID);

      const ids = getUIDs();
      const added = [];

      for (const id of ids) {
        if (!ADMINBOT.includes(id)) {
          ADMINBOT.push(id);
          config.ADMINBOT.push(id);

          const name = (await Users.getData(id)).name;
          added.push(`• ${name} (${id})`);
        }
      }

      fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(getText("addedAdmin", added.length, added.join("\n")), threadID, messageID);
    }

    case "remove":
    case "rm": {
      if (permssion != 3)
        return api.sendMessage(getText("noPermission", "remove"), threadID, messageID);

      const ids = getUIDs();
      const removed = [];

      for (const id of ids) {
        const index = ADMINBOT.indexOf(id);
        if (index !== -1) {
          ADMINBOT.splice(index, 1);
          config.ADMINBOT.splice(index, 1);

          const name = (await Users.getData(id)).name;
          removed.push(`• ${name} (${id})`);
        }
      }

      fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
      return api.sendMessage(getText("removedAdmin", removed.length, removed.join("\n")), threadID, messageID);
    }

    case "only": {
      if (permssion != 3)
        return api.sendMessage(getText("noPermission", "only"), threadID, messageID);

      config.adminOnly = !config.adminOnly;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

      return api.sendMessage(
        config.adminOnly ? getText("adminOnlyOn") : getText("adminOnlyOff"),
        threadID,
        messageID
      );
    }

    case "boxonly": {
      if (permssion != 3)
        return api.sendMessage(getText("noPermission", "boxonly"), threadID, messageID);

      const dataPath = path.resolve(__dirname, "cache", "data.json");
      delete require.cache[require.resolve(dataPath)];
      const database = require(dataPath);

      database.adminbox[threadID] = !database.adminbox[threadID];

      fs.writeFileSync(dataPath, JSON.stringify(database, null, 4));

      return api.sendMessage(
        database.adminbox[threadID] ? getText("boxOnlyOn") : getText("boxOnlyOff"),
        threadID,
        messageID
      );
    }

    default:
      return;
  }
};

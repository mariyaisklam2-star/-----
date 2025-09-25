const axios = require("axios");
const simsim = "https://simsimi.cyberbot.top";

module.exports.config = {
 name: "baby",
 version: "1.0.3",
 hasPermssion: 0,
 credits: "ULLASH",
 description: "Cute AI Baby Chatbot | Talk, Teach & Chat with Emotion ☢️",
 commandCategory: "simsim",
 usages: "[message/query]",
 cooldowns: 0,
 prefix: false
};

module.exports.run = async function ({ api, event, args, Users }) {
 try {
 const uid = event.senderID;
 const senderName = await Users.getNameUser(uid);
 const query = args.join(" ").toLowerCase();

 if (!query) {
 const ran = ["Bolo baby", "hum"];
 const r = ran[Math.floor(Math.random() * ran.length)];
 return api.sendMessage(r, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 });
 }

 if (["remove", "rm"].includes(args[0])) {
 const parts = query.replace(/^(remove|rm)\s*/, "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage(" | Use: remove [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts;
 const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (args[0] === "list") {
 const res = await axios.get(`${simsim}/list`);
 if (res.data.code === 200) {
 return api.sendMessage(
 `♾ Total Questions Learned: ${res.data.totalQuestions}\n★ Total Replies Stored: ${res.data.totalReplies}\n☠︎︎ Developer: ${res.data.author}`,
 event.threadID,
 event.messageID
 );
 } else {
 return api.sendMessage(`Error: ${res.data.message || "Failed to fetch list"}`, event.threadID, event.messageID);
 }
 }

 if (args[0] === "edit") {
 const parts = query.replace("edit ", "").split(" - ");
 if (parts.length < 3)
 return api.sendMessage(" | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);

 const [ask, oldReply, newReply] = parts;
 const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (args[0] === "teach") {
 const parts = query.replace("teach ", "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage(" | Use: teach [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts;
 const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}`);
 return api.sendMessage(`${res.data.message || "Reply added successfully!"}`, event.threadID, event.messageID);
 }

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(`| Error in baby command: ${err.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleReply = async function ({ api, event, Users, handleReply }) {
 try {
 const senderName = await Users.getNameUser(event.senderID);
 const replyText = event.body ? event.body.toLowerCase() : "";
 if (!replyText) return;

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 }
 );
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(` | Error in handleReply: ${err.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
 try {
 const raw = event.body ? event.body.toLowerCase().trim() : "";
 if (!raw) return;
 const senderName = await Users.getNameUser(event.senderID);
 const senderID = event.senderID;

 if (
 raw === "baby" || raw === "botli" || raw === "beby" ||
 raw === "janu" || raw === "xanu" || raw === "জানু" || raw === "বটলি" || raw === "বেবি"
 ) {
 const greetings = [
 "Bolo baby 💬", "হুম? বলো 😺", "হ্যাঁ জানু 😚", "শুনছি বেবি 😘", "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈", "𝗛𝗶 𝗶𝗺, 𝗕𝗼𝘁𝗹𝗶😘", "আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো😘", "𝗛𝗺𝗺 𝗝𝗮𝗻 𝗯𝗼𝗹𝗼", "𝗕𝗼𝗹 𝗣𝗲𝗺 𝗸𝗼𝗿𝗯𝗶😒😬", "আমাকে ডেকে লাভ নাই কারণ আমার বিএফ আছে🐸", " আমি বট না আমি 𝗕𝗼𝘁𝗹𝗶😐🤖", "-𝙂𝙖𝙮𝙚𝙨-🤗-যৌবনের কসম দিয়ে আমাকে 𝐁𝐥𝐚𝐜𝐤𝐦𝐚𝐢𝐥 করাছে-এই ছেলে টা🥲🤦‍♂️🤧", "-আমার গল্পে আমার জামাই  রানা'ই সেরা-🙊🙆‍", "আমাকে তো ডাকাডাকি না করে আমার বান্ধবী সামিয়া কে পটা🙊 ", "—যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂-আমার বান্ধুবি রিয়া এর সাথে  প্রেম করে তাকে দেখিয়ে দাও-🙈🐸", "বান্ধবী দেখ ওই পোলাটা কতো কিউট", "-𝗜 𝗟𝗢𝗩𝗢 𝗬𝗢𝗨-😽", "বান্ধবী দেখ এই ছেলে আমাকে চোখ মারে😾🤨", "আজ থেকে আর কাউকে পাত্তা দিমু না -!😏-কারণ আমি ফর্সা হওয়ার ক্রিম কিনছি -!🙂🐸", "আজ কেউ নাই বলে,বটে ইনবক্সে পরে থাকি", "𝗕𝗼𝗹 𝗞𝗶 𝗯𝗼𝗹𝗯𝗮🤭", "এই আমাকে বটলি বলে,মেরে বালি'চাপা দিয়ে দিবো🤖😎", "ওই সবাই  দেখো এই ছেলে টা আমাকে ডিস্টার্ব করে🌚", "এতো ডাকো কেন প্রেমে পরছো🙊👻", " নারী'কে সবচেয়ে বেশি কষ্ট দেয় তার শখের পুরুষ...!🥺💔", "কিরে ক্রাশ খাইলি নাকি 🙊😳", "•-কিরে🫵কিছু বলবি🤖", "ভালোবাসা আর এক নাম আমার মহারাজ রানা🥰🌺", "তোর কি চোখে পড়ে না আমি বট রানা এর সাথে ব্যাস্ত আসি😒", "Ummmmha দে 💋🙊, এই নে আমার আইড়ি ইনবক্সে নক দেhttps://www.facebook.com/profile.php?id=61580318219578", "বলেন ভাইয়া🤖", "বলো শুনছি তো💬", "দেখ বেশি বিরক্ত করলে আমার জামাই এর কাছে বিচার দিব😾🔪", "কিরে বলদ এত ডাকাডাকি করিস কেনো 🐸"
 ];
 const randomReply = greetings[Math.floor(Math.random() * greetings.length)];
      const mention = {
        body: `@${senderName} ${randomReply}`,
        mentions: [{
          tag: `@${senderName}`,
          id: senderID
        }]
      };

 return api.sendMessage(mention, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 }, event.messageID);
 }

 if (
 raw.startsWith("beby ") || raw.startsWith("botli ") || raw.startsWith("beby ") ||
 raw.startsWith("janu ") || raw.startsWith("xanu ") ||
 raw.startsWith("জানু ") || raw.startsWith("বটলি ") || raw.startsWith("বেবি ")
 ) {
 const query = raw
 .replace(/^baby\s+|^botli\s+|^beby\s+|^janu\s+|^xanu\s+|^জানু\s+|^বটলি\s+|^বেবি\s+/i, "")
 .trim();
 if (!query) return;

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const reply of responses) {
 await new Promise((resolve) => {
 api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }
 }
 } catch (err) {
 console.error(err);
 return api.sendMessage(`| Error in handleEvent: ${err.message}`, event.threadID, event.messageID);
 }
};

import db from "../../lib/database.js";
import axios from "axios";

const handler = async function (m, { conn, usedPrefix, command, args }) {
  conn.character_ai = conn.character_ai ? conn.character_ai : {};
  const user = db.data.users[m.sender].character_ai;

  if (args[0] == "search") {
    if (!args[1])
      return m.reply(
        `[!] _Input Character Name_\n\n*Example :* ${usedPrefix + command} search HuTao`,
      );
    const { key } = await m.reply("_Searching Character..._");
    const response = await fetch(
      API(
        "arifzyn",
        "/ai/cai/search",
        { query: args.slice(1).join(" ") },
        "apikey",
      ),
    );
    const res = await response.json();

    if (res.status !== 200) throw Error(res);

    let txt = "*[ Character Ai Search ]*\n\n";
    res.result.forEach((x, i) => {
      txt += `${1 + i}. ${x.name}\n`;
      txt += `  - ${x.greeting}\n`;
      txt += `  - ${x.score}\n\n `;
    });
    await conn.sendMessage(m.chat, { text: txt, edit: key }, { quoted: m });

    conn.character_ai[m.sender] = {
      character: res.result.map((v) => v.id),
    };
  } else if (args[0] == "set") {
    if (!conn.character_ai[m.sender]) return m.reply("No Character Ai Session");
    if (!args[1]) return m.reply(`[!] _Input Character Number_`);
    if (isNaN(args[1])) return m.reply("_Only number_");

    const { key } = await m.reply("_Settings Your Character..._");

    const my = conn.character_ai[m.sender].character;
    const response = await (
      await fetch(
        API(
          "arifzyn",
          "/ai/cai/character",
          { character_id: my[Number(args[1]) - 1] },
          "apikey",
        ),
      )
    ).json();
    if (response.status !== 200) throw Error(response);
    let res = response.result;
    let teks = "_*[ Character Info ]*_\n\n";
    teks += `*Name :* ${res.name}\n`;
    teks += `*Greeting :* ${res.greeting}\n`;
    teks += `*Description :* ${res.description}\n\n`;
    teks += `*ID :* \`${my[Number(args[1]) - 1]}\`\n\n`;
    teks += `_Success Settings Character_`;
    await conn.sendMessage(m.chat, { text: teks, edit: key }, { quoted: m });

    user.character = my[Number(args[1]) - 1];
  } else if (args[0] == "create") {
    if (user.character.length == 0)
      return m.reply(
        `[!] _You don't have a character ID_\n\n${usedPrefix + command} search <query>`,
      );

    const { key } = await m.reply("[!] _Creating Chat ID..._");

    const response = await fetch(
      API(
        "arifzyn",
        "/ai/cai/createChat",
        { character_id: user.character },
        "apikey",
      ),
    );
    const res = await response.json();
    if (res.status !== 200) throw Error(res);

    await conn.sendMessage(
      m.chat,
      {
        text: `*_Success Create Chat_*\n\n*Chat ID :* \`${res.result.chatId}\``,
        edit: key,
      },
      { quoted: m },
    );
    user.chatId = res.result.chatId;
  } else if (args[0] == "start") {
    if (user.character.length == 0)
      return m.reply(
        `[!] _You don't have a character ID_\n\n${usedPrefix + command} search <query>`,
      );
    if (user.chat.length == 0)
      return m.reply(
        `[!] _You don't have a chat ID_\n\n${usedPrefix + command} create`,
      );

    if (!args[1]) return m.reply("[!] _No text?_");

    const { key } = await m.reply("[!] _Starting Your Chat..._");

    const { data } = await axios.post(
      API("arifzyn", "/ai/cai/chat", {}, "apikey"),
      {
        character_id: user.character,
        chatId: user.chatId,
        message: args.slice(1).join(" "),
      },
    );

    if (data.status !== 200) throw Error(data);

    await conn.sendMessage(
      m.chat,
      { text: data.result, edit: key },
      { quoted: m },
    );
    user.chat = true;
  } else if (args[0] == "stop") {
    m.reply("_*Success stop chat character ai*_");
    user.chat = false;
  }
};

handler.menuai = ["character_ai"];
handler.tagsai = ["openai"];
handler.command = /^(character_ai|cai)$/i;

export default handler;

import db from "../../lib/database.js";
import { format } from "util";

const handler = async function (m, { conn, args, usedPrefix, command }) {
  conn.diffusion = conn.diffusion ? conn.diffusion : {};
  if (args[0] == "model".toLowerCase()) {
    if (!args[1]) throw "Masukan model";
    db.data.datas.diffusion = args[1];
    await m.reply(`Sukses set model *${args[1]}*`);
  }
  if (args[0] == "models") {
    const response = await fetch(
      API("arifzyn", "/ai/txt2img/model", {}, "apikey"),
    );
    const res = await response.json();
    m.reply(format(res));
    conn.diffusion[m.chat] = {
      model: res.result,
    };
  } else {
    try {
      const model = db.data.datas.diffusion;
      if (!model) throw "model not found";
      if (!args[0])
        return m.reply(`Example : ${usedPrefix + command} 1girl, cute`);
      const msg = await m.reply("[!] _Processing create image_");
      const response = await fetch(
        API(
          "arifzyn",
          "/ai/txt2img",
          { prompt: args.join(" "), model: model },
          "apikey",
        ),
      );
      let res = await response.json();
      if (res.status !== 200) throw res;
      await conn.sendMessage(
        m.chat,
        {
          text: "_Successful create image_",
          edit: msg.key,
        },
        { quoted: m },
      );

      await conn.sendMessage(
        m.chat,
        {
          image: { url: res.result },
          caption: model,
        },
        { quoted: m },
      );
    } catch (e) {
      console.error(e);
      throw "Error...";
    }
  }
};

handler.help = ["txt2img", "diffusion"];
handler.tags = ["maker"];
handler.command = /^(txt2img|diffusion)$/i;

handler.premium = true;

export default handler;

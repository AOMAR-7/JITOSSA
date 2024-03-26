import axios from "axios";
import FormData from "form-data";

const handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || q.mediaType || "";
  if (!mime || mime == "conversation")
    return m.reply("send/reply image message.");
  if (/video/.test(mime)) throw "Video non support.";

  const img = await q.download?.();
  await m.reply("[!] _Processing your image..._");

  try {
    const form = new FormData();
    form.append("image", img, { filename: Date.now() + ".jpg" });
    const { data } = await axios.post(
      API("arifzyn", "/ai/gfpgan", {}, "apikey"),
      form,
      {
        responseType: "json",
      },
    );
    if (data.status !== 200) throw "Error...";

    await conn.sendMsg(
      m.chat,
      { image: { url: data.result }, mimetype: "image/jpeg" },
      { quoted: m },
    );
  } catch (e) {
    console.error(e);
    throw "Error processing image...";
  }
};

handler.help = ["gfpgan"];
handler.tags = ["ai"];
handler.command = /^(gfpgan)$/i;

handler.limit = true;
handler.premium = true;

export default handler;

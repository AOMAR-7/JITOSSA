import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  if (!text) throw "Enter your prompt.\n\n*Example :* .create cat";
  m.reply("[!] _Wait processing create your images..._");

  try {
    const response = await fetch(
      API("arifzyn", "/ai/bingimg", { prompt: text }, "apikey"),
      {
        headers: {
          cookie: api.bing,
        },
      },
    );
    const data = await response.json();
    if (data.status !== 200) throw "Error...";
    m;
    data.result.forEach((x, i) => {
      let txt = `*_images :_* _( ${i + 1} / ${data.result.length} )_\n\n*_Prompt :_* ${text}`;
      conn.sendMessage(
        m.chat,
        { image: { url: x }, caption: txt, mimetype: "image/jpeg" },
        { quoted: m },
      );
    });
  } catch (e) {
    console.error(e);
    throw "_An error occurred while creating the image._";
  }
};

handler.help = ["create"];
handler.tags = ["image"];
handler.command = /^(create|bing(image|img))$/i;

handler.limit = true;

export default handler;

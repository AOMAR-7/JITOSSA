const handler = async (m, { conn, text }) => {
  if (!text) throw "Yes, can I help you?";

  try {
    let res = await fetch(
      API("arifzyn", "/ai/bing", { text: text, model: "balanced" }, "apikey"),
    );
    res = await res.json();
    if (res.status !== 200) throw res;
    res = res.result.text;
    m.reply(res);
  } catch (e) {
    console.error(e);
    throw "Error response bing.";
  }
};

handler.help = ["bing"];
handler.tags = ["ai"];
handler.command = /^(bing)$/i;

handler.limit = true;

export default handler;

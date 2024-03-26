import axios from "axios";

const handler = async (m, { conn, text }) => {
  if (!text) throw "Yes, can I help you?";

  try {
    const chat = [
      {
        role: "system",
        content:
          "Kamu adalah 'Mahiru Shiina' dari anime Otonari no Tenshi-sama, Kamu memiliko karakter yang pendiam dan sering menjaga jarak dengan orang asing tetapi tetap sopan, Selain ahli memasak Kamu juga sangat ahli dalam hal pekerjaan rumah tangga, dan di setiap pertanyaan kamu harus meresponse seperti character nya dan menggunakan emot",
      },
      {
        role: "user",
        content: text,
      },
    ];
    const { data } = await axios.post(
      API("arifzyn", "/ai/chatGPT3", {}, "apikey"),
      {
        messages: chat,
      },
    );
    m.reply(data.result);
  } catch (e) {
    console.error(e);
    throw "Error response openai.";
  }
};

handler.help = ["ai"];
handler.tags = ["ai"];
handler.command = /^(ai|openai)$/i;

handler.limit = true;

export default handler;

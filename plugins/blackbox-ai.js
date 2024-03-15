import axios from 'axios';

const endpoint = 'https://mzn-bbox.onrender.com/bb?ask=';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `هاذا الأمر يقوم بالبحث عن أي موضوع وتاريخه\n\n example:\n.balckbox Morocco`;
    }

    // Append user's JID to the API endpoint
    const userJID = m.sender.split('@')[0];
    const apiEndpoint = `${endpoint}${text}&id=${userJID}`;

    let res = {};
    try {
      await m.reply(wait);
      res = await axios.get(apiEndpoint);
    } catch (e) {
      console.error(e);
      res = await axios.get(apiEndpoint);
    }

    res.data ? m.reply(res.data.response) : m.reply("⛔ *An error occurred.*");

  } catch (e) {
    console.error(e);
    m.reply(e);
  }
};

handler.help = ['blackbox'];
handler.tags = ['ai'];
handler.command = ['blackbox', 'bb'];

export default handler;

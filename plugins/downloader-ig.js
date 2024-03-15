const fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Contoh:* ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`

    try {
        const api = await fetch(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${args[0]}&apikey=${btc}`)
        const res = await api.json()

        const limitnya = 10; // ini jumlah foto yang ingin di kirim ke user (default 10 foto)

        for (let i = 0; i < Math.min(limitnya, res.result.length); i++) {
            await sleep(3000)
            conn.sendFile(m.chat, res.result[i].url, null, `*Instagram Downloader*`, m)
        }
    } catch (e) {
        throw `*Server Down!*`
    }
}

handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igdl|instagramdl|igstroy)$/i
handler.limit = true

module.exports = handler

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `هاذا الأمر خاص بالتحميل من إنستجرام قم باإرسال الرابط الخاص بالفيديو/صورو/ستوري \n\n هاكذا. ig https://www.instagram.com/reel/C1JfJlfq-_n/?igsh=MW95cTlxMGwwY29vag==`;
  m.reply(wait);

  let res;
  try {
    res = await fetch(`https://www.guruapi.tech/api/igdlv1?url=${text}`);
  } catch (error) {
    throw `An error occurred: ${error.message}`;
  }

  let api_response = await res.json();

  if (!api_response || !api_response.data) {
    throw `*فشل في الحصول على طلبك حاول لاحقا ❌*.`;
  }

  const mediaArray = api_response.data;

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type;
    const mediaURL = mediaData.url_download;

    let cap = `*تابع صانع البوت فى إنستجرام ❤️* \n https://www.instagram.com/ovmar_1`;

    if (mediaType === 'video') {
      
      conn.sendFile(m.chat, mediaURL, 'instagram.mp4', cap, m, null, rpig);
    } else if (mediaType === 'image') {
      
      conn.sendFile(m.chat, mediaURL, 'instagram.jpg', cap, m, null, rpig);
    }
  }
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(instagram|igdl|ig|insta)$/i;

export default handler;


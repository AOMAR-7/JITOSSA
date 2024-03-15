import fetch from 'node-fetch';

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


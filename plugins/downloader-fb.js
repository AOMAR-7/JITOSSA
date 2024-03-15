import fetch from 'node-fetch'
import fg from 'api-dylux'


const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*هاذا الأمر خاص بالتحملي من فيسبوك*\n\n📌 مثال :\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw '⚠️ PLEASE GIVE A VALID URL.'
  }

 await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `*تابع صانع البوت فى إنستجرام ❤️* \n https://www.instagram.com/ovmar_1`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    
    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ An error occurred while processing the request. Please try again later.')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler

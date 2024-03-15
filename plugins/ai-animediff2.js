import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
        let wm = global.me
        if (!text) throw `*هاذا الأمر خاص بتوليد الصور على شكل أنمي*\n\n مثال لتوليد الصور\n${ usedPrefix + command } 1girl, blush, megane, school uniform`
        await m.reply(img)
        await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })
        try {
        let ff = await fetch(`https://api.neoxr.eu/api/waifudiff?q=${text}`)
        let anu = await ff.json()
        await conn.sendFile(m.chat, anu.data.url, 'image.jpg', `*تابع صانع البوت فى إنستجرام \n https://www.instagram.com/ovmar_1*`, m)
        m.react('🎐')
      } catch (e) {
        console.log(e)
        m.reply(eror)
      }
    }

handler.help = ['animediff2 <text>']
handler.tags = ['drawing']
handler.command = /^(animediff2)$/i

export default handler

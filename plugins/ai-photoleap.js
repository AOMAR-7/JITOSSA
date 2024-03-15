import axios from "axios"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "هاذا الأمر خاص بتوليد الصور ..\n\n example: .photoleap morocco sahara"
    await m.reply(wait)

    try {
        let data = await textToImage(text)
        if (data) {

            await conn.sendFile(m.chat, data.result_url, '', `*تابع صانع البوت فى إنستجرام ❤️* \n https://www.instagram.com/ovmar_1`, m, false, {
                mentions: [m.sender]
            });

        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["photoleap"]
handler.tags = ["drawing"];
handler.command = /^(photoleap)$/i

export default handler

/* New Line */
async function textToImage(text) {
    try {
        const {
            data
        } = await axios.get("https://tti.photoleapapp.com/api/v1/generate?prompt=" + text)
        return data;
    } catch (err) {
        return null;
    }
}
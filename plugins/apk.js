import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `*هاذا الأمر المعروف خاص بتحميل التطبيقات قم بالإرسال هاكذا*\n*.apk facebbok lite*`;
  try {    
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `*اسم التطبيق:* ${data5.name}\n  *أخر تحديث:* ${data5.lastup}\n *حجم التطبيق:* ${data5.size}\n\n*قم بمتابعة صاحب البوت لكي تتمكن من الإستفادة من جميع البوتات والمزاية 🫵🏻* \ninstagram.com/ovmar_1`
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
 if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ 😁 ]الملف كبير جدًا لذا لن يتم إرساله.'}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `*[😒] خطأ، لم يتم العثور على نتائج لبحثك.*`;
  }    
};
handler.help = ["apk"]
handler.tags = ["applications"]
handler.command = ["apk"] 
export default handler;
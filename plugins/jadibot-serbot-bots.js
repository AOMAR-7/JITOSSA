import ws from 'ws';
async function handler(m, { conn: _envio, usedPrefix }) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
function convertirMsADiasHorasMinutosSegundos(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);
segundos %= 60;
minutos %= 60;
horas %= 24;
var resultado = "";
if (días !== 0) {
resultado += días + " días, ";
}
if (horas !== 0) {
resultado += horas + " horas, ";
}
if (minutos !== 0) {
resultado += minutos + " minutos, ";
}
if (segundos !== 0) {
resultado += segundos + " segundos";
}
return resultado;
}
const message = users.map((v, index) => `👉🏻 wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado (${v.user.name || '-'})\n*🔰 Tiempo activo :* ${ v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : "Desconocido"}`).join('\n\n')
  const replyMessage = message.length === 0 ? '*No hay Sub bots conectado, verifique mas tardes.*' : message;
const totalUsers = users.length;
const responseMessage = `*هاذا هو الرمز الخاص باإنشاء البوت الخاص بك عبر واتساب فقط دون أي منصة ثانية قم بعمل scan من الواتساب الخاص بك في خانة الإجهزة المرتبطة ومبروك عليك بوت جيطوسة الجديد سوف تكون ميزات جديدة في البوت شكرا على إستعمالك البوت الخاص بنا. ❤️:* ${totalUsers || '0'}\n\n${replyMessage.trim()}`.trim();
await _envio.sendMessage(m.chat, { text: responseMessage, contextInfo: {mentionedJid: _envio.parseMention(responseMessage), externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}}, {quoted: m})}
//_envio.sendMessage(m.chat, {text: responseMessage, mentions: _envio.parseMention(responseMessage)}, {quoted: m})}
handler.command = handler.help = ['listjadibot', 'bots', 'subsbots'];
handler.tags = ['jadibot'];
export default handler;

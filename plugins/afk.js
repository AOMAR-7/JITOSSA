let handler = async (m, { text }) => {
  let user = global.DATABASE.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  m.reply(`
${conn.getName(m.sender)} ثم أخد إستراحة من إستخدام البوت ${text ? ': ' + text : ''}
`)
}
handler.help = ['afk [reason]']
handler.tags = ['tools']
handler.command = /^afk$/i

export default handler
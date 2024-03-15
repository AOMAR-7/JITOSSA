import { googleIt } from '@bochilteam/scraper'

let handler = async (m, { conn, text }) => {
    if (!text) throw 'البحث في google مثال \n\n.google morocco'
    let search = await googleIt(text)
    let msg = search.articles.map((v) => `*${v.title}*\n_${v.url}_\n_${v.description}_`).join('\n\n')
    if (!msg.length) throw 'Not Found :/'
    m.reply(msg)
}
handler.help = handler.alias = ['google']
handler.tags = ['tools']
handler.command = /^google$/i

export default handler


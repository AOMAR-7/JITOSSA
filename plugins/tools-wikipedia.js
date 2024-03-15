import axios from 'axios'
import cheerio from 'cheerio'


let handler = async (m, { text }) => {
	if (!text) throw `*هاذا الأمر يقوم بالبحث في موقع وكيبيديا المعروف* \n\n مثال \n ${usedPrefix}${command} تاريخ المغرب ` 
	
    try {
	const link =  await axios.get(`https://es.wikipedia.org/wiki/${text}`)
	const $ = cheerio.load(link.data)
	let wik = $('#firstHeading').text().trim()
	let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
	m.reply(`▢ *Wikipedia*

‣ ${resulw}`)
} catch (e) {
  m.reply(`⚠️ ${mssg.searchError}`)
}
}
handler.help = ['wikipedia']
handler.tags = ['search']
handler.command = ['wiki','wikipedia'] 


export default handler
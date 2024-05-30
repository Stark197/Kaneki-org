import uploadImage from '../lib/uploadImage.js'
import { createSticker } from 'wa-sticker-formatter'
import fs from 'fs'
const effects = ['سجين', 'الوان', 'زجاج', 'خاسر' ,'triggered']

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let effect = text.trim().toLowerCase()
  if (!effects.includes(effect)) throw `
*Usage:* ${usedPrefix}stickmaker <effectname>
*Example:* ${usedPrefix}filter jail

*List Effect:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
`.trim()
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
    	try {
			let img = await q.download?.()
			let out = await uploadImage(img)
			let apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
    avatar: out
  })
            await conn.sendFile(m.chat, apiUrl, 'atet.webp', '', m)
    	} catch (e) {
    		console.log(e)
    	}
    } else {
    	m.reply(`قم باستخدام الأمر التالي مرفقا بالصورة *${usedPrefix + command}*او قم بالرد عليها`)
    }
}

handler.help = ['filter']
handler.tags = ['ادوات']
handler.command = /^(فلاتر)$/i

export default handler

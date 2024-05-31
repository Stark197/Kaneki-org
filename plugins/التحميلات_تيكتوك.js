import { tiktok } from '../lib/tiktok.js'

let handler = async(m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`لا تنسى الرابط!\n\nمثال:\n${usedPrefix + command} https://vt.tiktok.com/ZS8oHC5Ka/`)
    if (!/^http(s)?:\/\/(www|v(t|m)).tiktok.com\/[-a-zA-Z0-9@:%._+~#=]/i.test(args[0])) return m.reply('رابط غير مدعوم')
    await m.reply('_جاري التحميل المرجو الإنتظار..._')
    let { nickname, duration, description, play, music } = await tiktok(args[0])
    let caption = `
Nickname : ${nickname}
Duration : ${duration}

${description}
`.trim()
    let video = await conn.sendFile(m.chat, play, false, caption, m)
    await conn.sendFile(m.chat, music, false, false, video, false, { mimetype: 'audio/mpeg' })
 }
handler.help = ['tiktok']
handler.tags = ['التحميلات']
handler.command = ['تيك']
handler.limit = true
export default handler

import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q || q.msg).mimetype || q.mediaType || ''
    if (!/video|audio/.test(mime)) throw `تأكد من الرد على فيديو لتحويله *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'لم تتم معالجة الفيديو أعد المحاولة مجددا'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'لا يمكن تحويله لصوت🇲🇦'
    conn.sendMessage(m.chat, { audio: audio.data,  mimetype: 'audio/mpeg' }, { quoted: m })
}
handler.help = ['tomp3']
handler.tags = ['ادوات']
handler.alias = ['tomp3', 'toaudio']
handler.command = ['لصوت']

export default handler

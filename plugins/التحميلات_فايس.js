import axios from 'axios'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `ادخل الرابط!\n\nمثال:\n${usedPrefix + command} https://fb.watch/ksK8U7wgHY/?mibextid=GXl451 hd`
    if (!args[1]) throw `ادخل الدقة!\n\nمثال:\n${usedPrefix + command} https://fb.watch/ksK8U7wgHY/?mibextid=GXl451 hd`
    if (!/hd|sd|HD|SD/i.test(args[1])) throw 'تتوفر جودة sd و hd فقط'
    let res = await axios.get(API('lol', '/api/facebook', { url: args[0] }, 'apikey'))
    if (/hd|HD|Hd/i.test(args[1])) {
        m.reply(wait)
        conn.sendFile(m.chat, res.data.result[0], '', '', m, false)
    }
    if (/sd|SD|Sd/i.test(args[1])) {
        m.reply(wait)
        conn.sendFile(m.chat, res.data.result[1], '', '', m, false)
    }
}
handler.help = ['فيس'].map(v => v + ' <url>')
handler.tags = ['التحميلات']
handler.command = /^((فيس|fb)(downloder|dl)?)$/i
handler.limit = true
export default handler

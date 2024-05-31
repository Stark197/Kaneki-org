import uploadFile from '../lib/uploadFile.js'
import fs from 'fs'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let alok = {
	key : {
                          participant : '0@s.whatsapp.net'
                        },
       message: {
                    orderMessage: {
                            itemCount : 99999999,
                            itemCoun : 99999999,
                            surface : 99999999,
                            message: 'T O U R L',
                            orderTitle: 'H A L O',
                            thumbnail: fs.readFileSync('./thumbnail.jpg'), 
                            sellerJid: '0@s.whatsapp.net'
          
                          }
                        }
                      }
let name = await conn.getName(who)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  let caption = `🚩 *رابط:*
${link}
☘️ *sɪᴢᴇ :* ${media.length} بايت
🍁 *ᴇxᴘɪʀᴇᴅ :* ${isTele ? 'بدون انتهاء صلاحية' : 'Unknown'}

– *تفضل الرابط يا حب💜 :* ${await shortUrl(link)}`
  conn.sendMessage(m.chat, {
    text: caption, 
    contextInfo: {
    externalAdReply :{
    mediaUrl: '', 
    mediaType: 1,
    title: '',
    body: 'K A N E K I V 1 6', 
    thumbnailUrl: 'https://telegra.ph/file/27f1cc911b1fe28ae683f.jpg', 
    sourceUrl: 'https://whatsapp.com/channel/0029Vag9bvrLSmbRE2I5Oj2h',
    renderLargerThumbnail: true, 
    showAdAttribution: true
    }}}, { quoted: alok})
}
handler.help = ['tourl']
handler.tags = ['الادوات']
handler.command = ['لرابط']
export default handler

async function shortUrl(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
	return await res.text()
}

import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

var handler = async (m) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
  let name = await conn.getName(who)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime) throw '*⚠️ RESPONDA A UN ARCHIVO*'
  m.react(done)

  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let isAudio = /audio\/(mp3|wav|ogg)/.test(mime)
  
  let link
  if (isTele) {
    link = await uploadImage(media)
  } else if (isAudio) {
    link = await convertAudioToUrl(media)
  } else {
    link = await uploadFile(media)
  }

  let info = ` *🗂️ ENLACE:*\n${link}\n
*⚖️ TAMAÑO:*\n${media.length} bytes\n
*🚀 EXPIRACION:*\n ${isTele ? '✅ NO EXPIRA' : '⚠️ DESCONOCIDO'}\n
*🔰 ACORTADO:*\n${await shortUrl(link)}`

  conn.reply(m.chat, info, m, { contextInfo: { externalAdReply: { mediaUrl: ig, mediaType: 2, title: wm, body: azami, thumbnail: await (await fetch(link)).buffer(), sourceUrl: link } } })
}

handler.help = ['tourl']
handler.tags = ['transformador']
handler.command = /^(99|9)$/i

handler.limit = true

export default handler

async function convertAudioToUrl(media) {
  const freeConvertAPIKey = 'https://api.freeconvert.com/v1/process/jobs'

  const body = {
    tasks: {
      import: {
        operation: 'import/upload',
        file: media.toString('base64')
      },
      convert: {
        operation: 'convert',
        input: 'import',
        output_format: 'mp3'
      },
      export: {
        operation: 'export/url',
        input: 'convert'
      }
    }
  }

  const response = await fetch('https://api.freeconvert.com/v1/process/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': freeConvertAPIKey
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()

  if (data.status === 'ok' && data.tasks.export.result.url) {
    return data.tasks.export.result.url
  } else {
    throw new Error('Failed to convert audio')
  }
}

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
}

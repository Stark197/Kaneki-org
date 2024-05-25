import fetch from 'node-fetch'
import FormData from 'form-data'

var handler = async (m) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
  let name = await conn.getName(who)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime) throw '*⚠️ RESPONDA A UN ARCHIVO*'

  let media = await q.download()
  let isAudio = /audio\/(mp3|wav|ogg)/.test(mime)
  
  if (!isAudio) throw '*⚠️ SOLO SE PERMITEN ARCHIVOS DE AUDIO*'

  try {
    let link = await convertAudioToUrl(media, mime)
    let info = ` *🗂️ ENLACE:*\n${link}\n
*⚖️ TAMAÑO:*\n${media.length} bytes\n
*🚀 EXPIRACION:*\n⚠️ DESCONOCIDO\n
*🔰 ACORTADO:*\n${await shortUrl(link)}`

    conn.reply(m.chat, info, m, { contextInfo: { externalAdReply: { mediaUrl: link, mediaType: 2, title: 'FreeConvert Link', body: 'Link generated', thumbnail: await (await fetch(link)).buffer(), sourceUrl: link } } })
  } catch (error) {
    console.error('Error converting audio:', error)
    conn.reply(m.chat, 'Failed to convert audio. Please try again.', m)
  }
}

handler.help = ['tourl']
handler.tags = ['transformador']
handler.command = ['99']

handler.limit = true

export default handler

async function convertAudioToUrl(media, mime) {
  const freeConvertAPIKey = 'https://api.freeconvert.com/v1'
  
  const formData = new FormData()
  formData.append('file', media, {
    filename: 'audio.' + mime.split('/')[1],
    contentType: mime
  })

  const body = {
    tasks: {
      import: {
        operation: 'import/upload',
        file: formData
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

  const response = await fetch('https://api.freeconvert.com/v1', {
    method: 'POST',
    headers: {
      'x-api-key': freeConvertAPIKey,
      'Content-Type': 'application/json'
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

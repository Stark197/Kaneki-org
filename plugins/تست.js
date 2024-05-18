import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `*البـوت شغـاااال شغال صدعتوني 🐥💔* \n*اكتـب* \nالاوامر.\n *عشان يطلعلك....(يطلعلـك الاوامر)🌚🦦* \n@${m.sender.split('@')[0]} \n`
await conn.reply(m.chat, info, m, { contextInfo: { mentionedJid: [m.sender],forwardingScore: 65,
      isForwarded: true, externalAdReply: { title: author, body: bottime,thumbnail: fs.readFileSync('./thumbnail.jpg') }}})
      await conn.sendMessage(m.chat, {
        audio: {
            url: "♕𝙎𝙃𝙄𝙆𝘼🐥ᵇᵒᵗ♕.mp3"
        },
        seconds: 65,
        ptt: true,
        mimetype: "audio/mpeg",
        fileName: "vn.mp3",
        waveform: []
    }, {
        quoted: m
    })
}
handler.customPrefix = /^(تست|test)$/i
handler.command = new RegExp

export default handler

import yts from "yt-search"
import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"
import { format } from 'util';

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw "*✳️ على ماذا تريد البحث في يوتيوب*\n*مثال: .يوتيوب كانيكي  amv*?"
    let results = await yts(text)
    let tes = results.all
    let teks = results.all.map(v => {
        switch (v.type) {
            case "video":
                return `
📹 *النوع:* ${v.type}
🔗 *الرابط:* ${v.url}
📺 *العنوان:* ${v.title}
🖼️ *الصورة:* ${v.image}
🖼️ *الخلفية:* ${v.thumbnail}
⏰ *الوقت:* ${v.timestamp}
👤 *الاسم:* ${v.author.name}
   `.trim()
            case "canal":
                return `
🔖 *${v.name}* (${v.url})
⚡ ${v.subCountLabel} (${v.subCount}) Suscribe
📽️ ${v.videoCount} videos
`.trim()
        }
    }).filter(v => v).join("\n\n*❉━━━━─━|⊰🇲🇦⊱|━─━━━━❉*\n\n")
    
        let ytthumb = await (await conn.getFile(tes[0].thumbnail)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: teks,
                jpegThumbnail: ytthumb,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: "⟮𝙺𝙰𝙽𝙴𝙺𝙸⤹𝙱𝙾𝚃❯",
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: tes[0].url,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "WudySoft",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: tes[0].url,
                        thumbnail: ytthumb,
                        thumbnailUrl: tes[0].thumbnail,
                        title: htki + " 𝙺 𝙰 𝙽 𝙴 𝙺 𝙸 " + htka
                    }
                }
            }
        }, {
            quoted: m
        })
        await conn.relayMessage(m.chat, msg.message, {})
}
handler.help = ["يوتيوب"].map(v => "يوتيوب" + v + " <pencarian>")
handler.tags = ["التحميلات"]
handler.command = ['يوتيوب']
export default handler

function formatNumber(num) {
  const suffixes = ['', 'k', 'M', 'B', 'T'];
  const numString = Math.abs(num).toString();
  const numDigits = numString.length;

  if (numDigits <= 3) {
    return numString;
  }

  const suffixIndex = Math.floor((numDigits - 1) / 3);
  let formattedNum = (num / Math.pow(1000, suffixIndex)).toFixed(1);
  
  // Menghapus desimal jika angka sudah bulat
  if (formattedNum.endsWith('.0')) {
    formattedNum = formattedNum.slice(0, -2);
  }

  return formattedNum + suffixes[suffixIndex];
}

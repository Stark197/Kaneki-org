let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let videoUrls = [
    'https://telegra.ph/file/65cfc6dd32215a624e9dc.mp4',
    'https://telegra.ph/file/75a7882ef6c55d7be44c0.mp4',
    'https://telegra.ph/file/240ac2c9e878f819a061c.mp4',
    'https://telegra.ph/file/1d1434066793cb9445627.mp4',
    'https://telegra.ph/file/01f36418476dec93369fd.mp4'
  ];
  let randomIndex = Math.floor(Math.random() * videoUrls.length);
  let videoUrl = videoUrls[randomIndex];
  let { name } = global.db.data.users[who]
  m.react('🇲🇦')
  let str = `> ╮─❒ 「 *ترفيه💗* 」
> │○  .احزر
> │○  .علم
> │○  .كوره
> │○  .فعاليه
> │○  .ناروتو
> │○  .عين
> │○  .دين
> │○  .رياضه
> │○  .حزوره
> │○  .سؤال
> │○  .كت
> │○  .فكك
> │○  .رتب
> │○  .ايموجي
> │○  .حساب
> │○  .اكس_او
> │○  .لعبه
> │○  .خمن
> │○  .ثقافة
> │○  .عواصم
> │○  .حيوانات
> │○  .اوستات
> │○  .سياره
> │○  .نادي
> │○  .انمي  
> ╯─────「 *ترفيه💗* 」`
  conn.sendMessage(m.chat, {
    video: { url: videoUrl }, caption: str,
    mentions: [{
      jid: m.sender,
      tag: 'المرسل',
      id: m.sender.split('@')[0]
    }],
    gifPlayback: true, gifAttribution: 0,
    contextInfo: {
      forwardingScore: 9999999,
      isForwarded: false,
      mentionedJid: [m.sender],
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: true,
        title: `إضغط هنا لمتابعة صانع البوت في حسابه `,
        containsAutoReply: true,
        mediaType: 2,
        mediaUrl: videoUrl,
        sourceUrl: "https://instagram.com/noureddine_ouafy",
      },
    },
  }, { quoted: m });
};

handler.help = ['main']
handler.tags = ['group']
handler.command = ['2']

export default handler

import axios from 'axios';
import fs from 'fs';

const handler = async (m, { conn, args, command }) => {
  if (!args[0]) throw 'لا تنسى الرابط يا حب?';
  const userUrl = args[0];

  const apiUrl = `https://skizo.tech/api/download?url=${encodeURIComponent(userUrl)}&apikey=${global.xzn}`;

  try {
    const response = await axios.get(apiUrl);
    const videoUrl = response.data.url[0].url;

    await m.reply(`تحميل الفيديو من  ${videoUrl}`);

    const videoResponse = await axios({
      method: 'GET',
      url: videoUrl,
      responseType: 'stream',
    });

    const videoName = `video-${Date.now()}.mp4`;
    const videoPath = `./${videoName}`;

    const writer = fs.createWriteStream(videoPath);
    videoResponse.data.pipe(writer);

    writer.on('finish', async () => {
      await conn.sendFile(m.chat, fs.readFileSync(videoPath), videoName, '', m);

      fs.unlinkSync(videoPath);

      m.reply('تم تحميل المقطع وارساله🚀!');
    });

    writer.on('خطأ', (err) => {
      m.reply(`حدث خطأ في تحميل الفيديو: ${err.message}`);
    });
  } catch (error) {
    m.reply(`هناك خطأ: ${error.message}`);
  }
};

handler.help = ['تنزيل'].map((v) => v + ' <url>');
handler.tags = ['التحميلات'];
handler.command = ['تنزيل'];

export default handler;

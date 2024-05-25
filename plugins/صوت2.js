import { google } from 'googleapis';
import fs from 'fs';

const apiKey = 'AIzaSyBju01oZkkC8g5DtHf5GU26JK9h6QSt6HA';
const drive = google.drive({ version: 'v3', auth: apiKey });

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  
  if (!mime.startsWith('audio/')) {
    throw '✳️ يرجى الرد على ملف صوتي';
  }
  
  let mediaBuffer = await q.download();
  
  if (mediaBuffer.length > 10 * 1024 * 1024) {
    throw '✴️ حجم الملف يتجاوز 10 ميجابايت. يرجى تحميل ملف أصغر.';
  }
  
  const fileMetadata = {
    'name': `audio_${Date.now()}.${mime.split('/')[1]}`,
    'mimeType': mime
  };
  
  const media = {
    mimeType: mime,
    body: mediaBuffer
  };
  
  const uploadedFile = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id,webViewLink'
  });
  
  const fileLink = uploadedFile.data.webViewLink;
  
  const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2);
  
  m.reply(`✅ *تم تحميل الملف بنجاح*\n♕ *حجم الملف:* ${fileSizeMB} ميجابايت\n♕ *الرابط:* ${fileLink}`);
};

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = ['url', 'صوت'];

export default handler;

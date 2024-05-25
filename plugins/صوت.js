import { google } from 'googleapis';
import fs from 'fs';

// تحميل مفتاح API
const apiKey = 'AIzaSyBju01oZkkC8g5DtHf5GU26JK9h6QSt6HA';
const drive = google.drive({ version: 'v3', auth: apiKey });

// دالة لتحويل الملفات الصوتية إلى روابط مباشرة
let convertAudioToDirectLink = async (audioBuffer, mimeType) => {
  try {
    // التحقق من حجم الملف
    if (audioBuffer.length > 10 * 1024 * 1024) {
      throw '✴️ حجم الملف يتجاوز 10 ميجابايت. يرجى تحميل ملف أصغر.';
    }
    
    // إعداد معلومات الملف
    const fileMetadata = {
      'name': `audio_${Date.now()}.${mimeType.split('/')[1]}`,
      'mimeType': mimeType
    };
    
    // إعداد بيانات الملف
    const media = {
      mimeType: mimeType,
      body: audioBuffer
    };
    
    // تحميل الملف إلى Google Drive
    const uploadedFile = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,webViewLink'
    });
    
    // الحصول على رابط الملف المحمل
    const fileLink = uploadedFile.data.webViewLink;
    
    // إرجاع الرابط المباشر
    return fileLink;
  } catch (error) {
    console.error('حدث خطأ أثناء تحويل الملف الصوتي:', error);
    throw '✴️ حدث خطأ أثناء تحويل الملف الصوتي';
  }
};

// دالة لتحويل الرسائل الصوتية إلى روابط مباشرة
let convertVoiceMessagesToDirectLinks = async (m) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    // التحقق من وجود رسالة صوتية
    if (!mime.startsWith('audio/')) {
      throw '✳️ يرجى الرد على ملف صوتي.';
    }
    
    // تنزيل الرسالة الصوتية
    const voiceBuffer = await q.download();
    
    // تحويل الرسالة الصوتية إلى رابط مباشر
    const directLink = await convertAudioToDirectLink(voiceBuffer, mime);
    
    // إرسال الرابط المباشر إلى المستخدم
    m.reply(`✅ الرابط المباشر للملف الصوتي:\n${directLink}`);
  } catch (error) {
    console.error('حدث خطأ أثناء تحويل الرسالة الصوتية:', error);
    m.reply('✴️ حدث خطأ أثناء تحويل الرسالة الصوتية');
  }
};

// إضافة معلومات للأمر
convertVoiceMessagesToDirectLinks.help = ['تحويل'];
convertVoiceMessagesToDirectLinks.tags = ['tools'];
convertVoiceMessagesToDirectLinks.command = 'تحويل';

export default convertVoiceMessagesToDirectLinks;

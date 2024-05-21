import axios from 'axios';

let timeout = 60000; // مدة الوقت 60 ثانية
let poin = 500; // نقاط الجائزة
const QUESTIONS_URL = 'https://gist.githubusercontent.com/Stark197/ba4ad15cc0f4680764d42dea9387205e/raw/761cc078525523094caf55a4a23bde3010969016/gistfile1.txt';

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    if (id in conn.tekateki) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tekateki[id][0]);
        throw false;
    }

    try {
        // جلب الأسئلة من الرابط
        const response = await axios.get(QUESTIONS_URL);
        const tekateki = response.data;

        // اختيار سؤال عشوائي
        let json = tekateki[Math.floor(Math.random() * tekateki.length)];
        let _clue = json.response;
        let clue = _clue.replace(/[A-Za-z]/g, '_');
        let caption = `
ⷮ *${json.question}*

*الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثواني*
*الـجـائـزة💰↞ ${poin} نقاط*
*بوت الأنمي*
`.trim();
        let image = 'https://telegra.ph/file/f5c021416da60ccd37f00.jpg'; // تغيير رابط الصورة
        conn.tekateki[id] = [
            await conn.sendFile(m.chat, image, 'image.jpg', caption, m),
            json, poin,
            setTimeout(async () => {
                if (conn.tekateki[id]) await conn.reply(m.chat, `*⌛انتهي الوقت⌛*\n *الاجـابـة✅ ${json.response}*`, conn.tekateki[id][0]);
                delete conn.tekateki[id];
            }, timeout)
        ];
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'حدث خطأ أثناء جلب الأسئلة. حاول مرة أخرى لاحقًا.', m);
    }
};

handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(8|88)$/i;

export default handler;
let fetch = require('node-fetch');

let timeout = 60000;
let points = 500;

let handler = async (m, { conn, command, usedPrefix }) => {
    conn.guessContent = conn.guessContent || {};
    let id = m.chat;

    if (id in conn.guessContent) {
        await conn.reply(m.chat, '❐┃لم يتم الإجابة على السؤال بعد┃❌ ❯', conn.guessContent[id][0]);
        return;
    }

    try {
        let urls = [
            'https://gist.githubusercontent.com/Kyutaka101/98d564d49cbf9b539fee19f744de7b26/raw/f2a3e68bbcdd2b06f9dbd5f30d70b9fda42fec14/guessflag', // صور
            'https://gist.githubusercontent.com/Kyutaka101/dc88a825aa085b6c75f4a716590eca11/raw/6b97b082d24c2cd24597165dfef876167e424bc1/gistfile1.txt', // فيديوهات
            'https://gist.githubusercontent.com/Stark197/e6eb5b13b875f2178cc6b6a5c18ee9ac/raw/7e4d026b19799908d3aaf1d728b1d23634999d48/gistfile1.txt', // مقاطع صوتية
            'https://gist.githubusercontent.com/Stark197/ba4ad15cc0f4680764d42dea9387205e/raw/761cc078525523094caf55a4a23bde3010969016/gistfile1.txt'  // أسئلة
        ];

        let randomUrl = urls[Math.floor(Math.random() * urls.length)];

        let response = await fetch(randomUrl);
        let src = await response.json();
        let json = src[Math.floor(Math.random() * src.length)];

        let typeDescription, question;
        if (randomUrl.includes('guessflag')) {
            typeDescription = "النوع: صورة";
            question = "السؤال: حدد من في الصورة";
        } else if (randomUrl.includes('username2')) {
            typeDescription = "النوع: فيديو";
            question = "السؤال: حدد ما يظهر في الفيديو";
        } else if (randomUrl.includes('username3')) {
            typeDescription = "النوع: مقطع صوتي";
            question = "السؤال: اعرف من في الصوت";
        } else if (randomUrl.includes('username4')) {
            typeDescription = "النوع: سؤال نصي";
            question = `السؤال: ${json.question}`;
        }

        let caption = `
*${command.toUpperCase()}*
❐↞┇${typeDescription}┇
❐↞┇${question}┇
❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثانية┇
❐↞┇الـجـائـزة💰↞ ${points} نقاط┇

*استخدم .انسحب للانسحاب*
『𝙺𝙰𝙽𝙴𝙺𝙸-𝙼𝙳』
        `.trim();

        let message;
        if (randomUrl.includes('guessflag')) {
            message = await conn.sendFile(m.chat, json.url, '', caption, m);
        } else if (randomUrl.includes('username2')) {
            message = await conn.sendFile(m.chat, json.url, '', caption, m, { asDocument: true });
        } else if (randomUrl.includes('username3')) {
            message = await conn.sendFile(m.chat, json.url, '', caption, m, { asDocument: true });
        } else if (randomUrl.includes('username4')) {
            message = await conn.reply(m.chat, `${question}\n\n${caption}`, m);
        }

        conn.guessContent[id] = [
            message,
            json,
            points,
            setTimeout(() => {
                if (conn.guessContent[id]) {
                    conn.reply(m.chat, `❮ ⌛┇انتهى الوقت┇⌛❯\n❐↞┇الإجابة الصحيحة✅↞ ${json.answer || json.name}┇`, conn.guessContent[id][0]);
                    delete conn.guessContent[id];
                }
            }, timeout)
        ];
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, '❐┇حدث خطأ أثناء جلب السؤال، حاول لاحقاً┇❌', m);
    }
};

handler.help = ['guesscontent'];
handler.tags = ['game'];
handler.command = /^gg/i;

export default handler;

let joinImpostorGame = async (m, { conn }) => {
    let id = m.chat;
    if (!gameActive) {
        conn.reply(m.chat, 'لم تبدأ أي لعبة. أرسل ".امبوستر" لبدء لعبة جديدة.');
        return;
    }

    if (players.includes(m.sender)) {
        conn.reply(m.chat, 'أنت بالفعل في اللعبة!');
        return;
    }

    players.push(m.sender);
    conn.reply(m.chat, 'انضممت إلى اللعبة!');

    if (players.length >= 3) {
        impostorIndex = Math.floor(Math.random() * players.length);
        conn.reply(m.chat, 'اللعبة جاهزة! ارسل ".خمن <رقم>" لتخمين من هو المحتال.');
    }
}

joinImpostorGame.help = ['انضم']
joinImpostorGame.tags = ['among']
joinImpostorGame.command = /^انضم$/i

export default joinImpostorGame;

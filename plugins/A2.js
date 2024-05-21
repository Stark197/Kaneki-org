let guessImpostor = async (m, { conn, command }) => {
    let id = m.chat;
    if (!gameActive) {
        conn.reply(m.chat, 'لم تبدأ أي لعبة. أرسل ".امبوستر" لبدء لعبة جديدة.');
        return;
    }

    if (players.length < 3) {
        conn.reply(m.chat, 'اللعبة تحتاج إلى 3 لاعبين على الأقل.');
        return;
    }

    const guess = parseInt(command.split(' ')[1], 10);
    if (isNaN(guess) || guess < 1 || guess > players.length) {
        conn.reply(m.chat, 'رقم غير صالح.');
        return;
    }

    if (guess - 1 === impostorIndex) {
        conn.reply(m.chat, `لقد وجدت المحتال! هو اللاعب رقم ${guess}.`);
        gameActive = false;
        players = [];
        impostorIndex = -1;
    } else {
        conn.reply(m.chat, 'هذا ليس المحتال! حاول مرة أخرى.');
    }
}

guessImpostor.help = ['اتهام <رقم>']
guessImpostor.tags = ['among']
guessImpostor.command = /^اتهام \d+$/i

export default guessImpostor;

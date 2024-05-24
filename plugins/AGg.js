let gameState = {
    gameActive: false,
    players: [],
    impostorIndex: -1
};

// بدء اللعبة
let startImpostorGame = async (m, { conn }) => {
    if (gameState.gameActive) {
        conn.reply(m.chat, '❐┃اللعبة جارية بالفعل┃❌ ❯', m);
        return;
    }

    gameState.players = [];
    gameState.impostorIndex = -1;
    gameState.gameActive = true;

    conn.reply(m.chat, 'اللعبة بدأت! يرجى إرسال ".انضم" للانضمام إلى اللعبة.');
}

// الانضمام إلى اللعبة
let joinImpostorGame = async (m, { conn }) => {
    if (!gameState.gameActive) {
        conn.reply(m.chat, 'لم تبدأ أي لعبة. أرسل ".امبوستر" لبدء لعبة جديدة.');
        return;
    }

    if (gameState.players.includes(m.sender)) {
        conn.reply(m.chat, 'أنت بالفعل في اللعبة!');
        return;
    }

    gameState.players.push(m.sender);
    conn.reply(m.chat, 'انضممت إلى اللعبة!');

    if (gameState.players.length >= 3) {
        gameState.impostorIndex = Math.floor(Math.random() * gameState.players.length);
        conn.reply(m.chat, 'اللعبة جاهزة! ارسل ".اتهام <رقم>" لتخمين من هو المحتال.');
    }
}

// تخمين المحتال
let guessImpostor = async (m, { conn, text }) => {
    if (!gameState.gameActive) {
        conn.reply(m.chat, 'لم تبدأ أي لعبة. أرسل ".امبوستر" لبدء لعبة جديدة.');
        return;
    }

    if (gameState.players.length < 3) {
        conn.reply(m.chat, 'اللعبة تحتاج إلى 3 لاعبين على الأقل.');
        return;
    }

    const guess = parseInt(text.split(' ')[1], 10);
    if (isNaN(guess) || guess < 1 || guess > gameState.players.length) {
        conn.reply(m.chat, 'رقم غير صالح.');
        return;
    }

    if (guess - 1 === gameState.impostorIndex) {
        conn.reply(m.chat, `لقد وجدت المحتال! هو اللاعب رقم ${guess}.`);
        gameState.gameActive = false;
        gameState.players = [];
        gameState.impostorIndex = -1;
    } else {
        conn.reply(m.chat, 'هذا ليس المحتال! حاول مرة أخرى.');
    }
}

// إيقاف اللعبة
let stopImpostorGame = async (m, { conn }) => {
    if (!gameState.gameActive) {
        conn.reply(m.chat, 'لا توجد لعبة جارية حالياً.');
        return;
    }

    gameState.gameActive = false;
    gameState.players = [];
    gameState.impostorIndex = -1;

    conn.reply(m.chat, 'تم إيقاف اللعبة.');
}

// تسجيل الأوامر
const commands = [
    {
        handler: startImpostorGame,
        help: ['امبوستر'],
        tags: ['game'],
        command: /^0$/i
    },
    {
        handler: joinImpostorGame,
        help: ['انضم'],
        tags: ['game'],
        command: /^00$/i
    },
    {
        handler: guessImpostor,
        help: ['اتهام <رقم>'],
        tags: ['among'],
        command: /^000 \d+$/i
    },
    {
        handler: stopImpostorGame,
        help: ['اوقف اللعبة'],
        tags: ['game'],
        command: /^0000$/i
    }
]

export default commands;

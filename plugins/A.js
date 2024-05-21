let players = [];
let impostorIndex = -1;
let gameActive = false;

module.exports = {
    name: 'game',
    description: 'Control and play the Impostor game',
    execute: async (client, message) => {
        const { body, from } = message;
        const [handler, command, ...args] = body.split(';');

        if (handler !== '!game') return;

        if (command === 'start') {
            if (gameActive) {
                await client.sendMessage(from, 'اللعبة جارية بالفعل!');
                return;
            }

            players = [];
            impostorIndex = -1;
            gameActive = true;

            await client.sendMessage(from, 'اللعبة بدأت! يرجى إرسال "!game;join" للانضمام إلى اللعبة.');
        } else if (command === 'stop') {
            if (!gameActive) {
                await client.sendMessage(from, 'لا توجد لعبة جارية لإيقافها.');
                return;
            }

            gameActive = false;
            players = [];
            impostorIndex = -1;
            await client.sendMessage(from, 'اللعبة توقفت.');
        } else if (command === 'join') {
            if (!gameActive) {
                await client.sendMessage(from, 'لم تبدأ أي لعبة. أرسل "!game;start" لبدء لعبة جديدة.');
                return;
            }

            if (players.includes(from)) {
                await client.sendMessage(from, 'أنت بالفعل في اللعبة!');
                return;
            }

            players.push(from);
            await client.sendMessage(from, 'انضممت إلى اللعبة!');

            if (players.length >= 3) {
                impostorIndex = Math.floor(Math.random() * players.length);
                await client.sendMessage(from, 'اللعبة جاهزة! ارسل "!game;find;<رقم>" لتخمين من هو المحتال.');
            }
        } else if (command === 'find') {
            if (!gameActive) {
                await client.sendMessage(from, 'لم تبدأ أي لعبة. أرسل "!game;start" لبدء لعبة جديدة.');
                return;
            }

            const guess = parseInt(args[0], 10);
            if (isNaN(guess) || guess < 1 || guess > players.length) {
                await client.sendMessage(from, 'رقم غير صالح.');
                return;
            }

            if (guess - 1 === impostorIndex) {
                await client.sendMessage(from, `لقد وجدت المحتال! هو اللاعب رقم ${guess}`);
                gameActive = false;
                players = [];
                impostorIndex = -1;
            } else {
                await client.sendMessage(from, 'هذا ليس المحتال! حاول مرة أخرى.');
            }
        } else {
            await client.sendMessage(from, 'أمر غير صالح. استخدم "!game;start" لبدء لعبة جديدة أو "!game;stop" لإيقاف اللعبة.');
        }
    }
};

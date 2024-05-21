let gameActive = false;
let players = [];
let impostorIndex = -1;

let startImpostorGame = async (m, { conn }) => {
    let id = m.chat;
    if (gameActive) {
        conn.reply(m.chat, '❐┃اللعبة جارية بالفعل┃❌ ❯', m);
        return;
    }

    players = [];
    impostorIndex = -1;
    gameActive = true;

    conn.reply(m.chat, 'اللعبة بدأت! يرجى إرسال ".انضم" للانضمام إلى اللعبة.');
}

startImpostorGame.help = ['امبوستر']
startImpostorGame.tags = ['among']
startImpostorGame.command = /^امبوستر$/i

export default startImpostorGame;

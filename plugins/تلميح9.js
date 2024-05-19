let hintHandler = async (m, { conn }) => {
    let id = m.chat;
    if (id in conn.tekateki) {
        let hint = conn.tekateki[id][1].hint;
        conn.reply(m.chat, `*التلميح:* ${hint}`, conn.tekateki[id][0]);
    } else {
        conn.reply(m.chat, 'لا يوجد سؤال حالي لعرض تلميح.', m);
    }
};

hintHandler.help = ['hint'];
hintHandler.tags = ['game'];
hintHandler.command = /^تلميح$/i;

export default hintHandler;

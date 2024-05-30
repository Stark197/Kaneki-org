let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  if (typeof werewolf.status == "undefined" || werewolf.status != "playing") {
    conn.reply(m.chat, "اللعبة ليست قيد التقدم", m)
    return
  }
  if (Object.keys(werewolf.players).length < 5) {
    conn.reply(m.chat, "مطلوب ما لا يقل عن 5 لاعبين لبدء اللعبة", m)
    return
  }
  let players = Object.keys(werewolf.players)
  let wolves = []
  while (wolves.length < Math.ceil(players.length / 3)) {
    let wolf = players[Math.floor(Math.random() * players.length)]
    if (werewolf.players[wolf] == "قروي") {
      werewolf.players[wolf] = "مستذئب"
      werewolf.wolves.push(wolf)
      wolves.push(wolf)
    }
  }
  global.db.data.werewolf = werewolf
  conn.reply(m.chat, "اللعبة قد بدأت. هناك " + players.length + " لاعبين, يشمل " + werewolf.wolves.length + " مستذئبين. المرجو ارسال '.اختيار' لاختيار احد اللاعبين", m)
}
handler.help = ['wwstart']
handler.tags = ['game']
handler.command = /^مستذئب_ابدأ$/i
handler.owner = false
handler.mods = false
handler.premium = false

export default handler

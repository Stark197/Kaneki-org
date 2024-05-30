let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  if (typeof werewolf.status == "undefined" || werewolf.status != "playing") {
    conn.reply(m.chat, "لعبة المستذئب ليست قيد التقدم", m)
    return
  }
  if (typeof werewolf.players[m.sender] != "undefined") {
    conn.reply(m.chat, "لقد انضممت بالفعل الى اللعبة🐺", m)
    return
  }
  werewolf.players[m.sender] = "قروي👨🏻‍🌾"
  werewolf.villagers.push(m.sender)
  global.db.data.werewolf = werewolf
  conn.reply(m.sender, "لقد انضممت الى اللعبة كقروي👨🏻‍🌾", m)
}
handler.help = ['wwjoin']
handler.tags = ['العاب']
handler.command = /^مستذئب_انضم$/i
handler.owner = false
handler.mods = false
handler.premium = false

export default handler

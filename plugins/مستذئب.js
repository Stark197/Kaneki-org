let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  if (typeof werewolf.status != "undefined" && werewolf.status == "playing") {
    conn.reply(m.chat, "لعبة المستذئبين نشطة🐺", m)
    return
  }
  werewolf.status = "playing"
  werewolf.players = {}
  werewolf.villagers = []
  werewolf.wolves = []
  werewolf.votes = {}
  global.db.data.werewolf = werewolf
  conn.reply(m.chat, "لعبة المستذئبين جاهزة المرجو كتابة '.مستذئب_انضم' للإنضمام للعبة", m)
}
handler.help = ['ww']
handler.tags = ['العاب']
handler.command = /^مستذئب$/i
handler.owner = false
handler.mods = false
handler.premium = false

export default handler

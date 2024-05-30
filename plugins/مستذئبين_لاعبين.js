let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  if (typeof werewolf.players == "undefined" || Object.keys(werewolf.players).length == 0) {
    conn.reply(m.chat, "لا يوجد لاعبين في هذه اللعبة", m)
    return
  }
  let players = Object.keys(werewolf.players)
  let villagerCount = 0
  let wolfCount = 0
  let playerList = ""
  for (let i = 0; i < players.length; i++) {
    let player = players[i]
    let role = werewolf.players[player]
    if (role == "قروي") {
      villagerCount++
    } else if (role == "مستذئب") { // mengganti wolf menjadi werewolf agar dapat lebih mudah dibaca
      wolfCount++
    }
    let playerName = conn.getName(player) // mengambil nama pengguna dengan menggunakan fungsi getName
    playerList += `${i + 1}. ${playerName} (@${player.split("@")[0]})\n` // mengubah format penomoran dan mengganti tanda ` dengan $
  }
  conn.reply(m.chat, `هناك ${players.length} اللاعبين في هذه اللعبة، بما في ذلك ${villagerCount} قرويين و ${wolfCount} مستذئبين:\n\n${playerList}`, m) // mengubah format pesan agar lebih mudah dibaca
}

handler.help = ['wwplayer']
handler.tags = ['العاب']
handler.command = /^مستذئبين_لاعبين$/i
handler.owner = false
handler.mods = false
handler.premium = false

export default handler

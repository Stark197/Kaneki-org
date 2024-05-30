import { Couples } from 'dhn-api'
var handler = async (m, { conn, command }) => {

const res = await Couples() 
await conn.sendFile(m.chat, res.male, 'ppcp.jpg', '🧛ولد\nانه فخ حاول تجنبه', m) 
return conn.sendFile(m.chat, res.female, 'ppcp.jpg', '🧛‍♀️بنت', m)
}
handler.help = ['ppcouple']
handler.tags = ['ادوات']
handler.command = /^(تطقيم|ppcouple)$/i
export default handler

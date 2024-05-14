import { Couples } from 'dhn-api'
var handler = async (m, { conn, command }) => {

const res = await Couples() 
await conn.sendFile(m.chat, res.male, 'ppcp.jpg', '*للولد🧛*', m) 
return conn.sendFile(m.chat, res.female, 'ppcp.jpg', '*للبنت🧛‍♀️*', m)
}
handler.help = ['ppcouple']
handler.tags = ['الادوات']
handler.command = /^(تطقيم|طقم)$/i
export default handler

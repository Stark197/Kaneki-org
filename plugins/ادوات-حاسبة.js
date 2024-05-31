// update by xnuvers007
let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('اكتب العملية التي تريد حسابها?')
    return
  }
  let val = text
    .replace(/[^0-9\-\/+*×÷πEe()#^√]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/#/g, 'Math.sqrt')
    .replace(/√(\d+)/g, 'Math.sqrt($1)')
    .replace(/(\d+)\s*√\s*(\d+)/g, '$1*Math.sqrt($2)')
    .replace(/\^/g, '**')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
  let format = text
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/Math\.sqrt/g, '√')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')
    .replace(/\\/g, '^')
  try {
    let result = eval(val)
    if (!isNaN(result)) {
      m.reply(`*${format}* = ${result}`)
    } else {
      throw result
    }
  } catch (e) {
    if (e === undefined) throw 'Isinya?'
    throw ' 0-9 استخدم الرموز التالية -, +, *, /, ×, ÷, π, e, (, ), ^, √ yang disupport'
  }
}
handler.help = ['calc <expression>']
handler.tags = ['الادوات']
handler.command = ['حاسبة']
handler.exp = 100

export default handler

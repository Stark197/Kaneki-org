import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

/*============= WAKTU =============*/
let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
    
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
         
/*============== SOCIAL ==============*/
global.sig = 'https://instagram.com/salahsh96' //instagram
global.sgh = 'https://github.com/' //github
global.sgc = 'https://whatsapp.com/channel/0029Vag9bvrLSmbRE2I5Oj2h' //group whatsapp
global.saluran = 'https://whatsapp.com/channel/0029Vag9bvrLSmbRE2I5Oj2h' //saluran whatsapp
global.syt = 'https://youtube.com/@kaneki_md?si=qsho_ZCkSI0Ye1rU' //youtube
global.swa = 'https://wa.me/212602272422' //whatsapp
global.tele = '' //telegram
global.sdc = '' //discord
global.snh = 'https://nhentai.net/' //nhentai

/*============== PAYMENT ==============*/
global.pdana = '212602272422' //pulsa1
global.ppulsa = '212602272422' //pulsa2
global.povo = '212602272422' //ovo
global.gopay = '212602272422' //gopay
global.dana = '212602272422' //dana
global.sid = 's.id' //s.id
global.psaweria = 'https://saweria.com/ReyzXd' //saweria

/*============== NOMOR ==============*/
global.nomorwa = '212602272422' //whatsapp
global.nomorbot = '212630114032' //nomor Bot
global.nomorown = '212602272422' //nomor Owner
global.namebot = 'KANEKI V16' //nama Bot
global.nameown = '☇𝙰𝚉𝙰𝚇⥤' //nama Owner

/*============== STAFF ==============*/
global.owner = [
  ['212602272422', '☇𝙰𝚉𝙰𝚇⥤', true] //creator/owner
] //put your number here
global.mods = [] //moderator
global.prems = [] //prem bukan disini

/*============== CPANEL ==============*/
global.domain = 'https://xxxxx' //domain
global.capikey = 'pltc_xxxxx' //pltc
global.apikey = 'plta_xxxxx' //plta

/*============== APIKEY ==============*/
global.lolkey = 'GataDios'
global.xkey = 'd90a9e986e18778b'
global.xzn = 'konekocyz'
global.lann = 'p8ADYJib'
global.xyro = '3WIq7q3CWt'

/*============== API ==============*/
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  lol: 'https://api.lolhuman.xyz', 
  xzn: 'https://skizo.tech',
  lann: 'https://api.betabotz.org', 
  xyro: 'https://api.xyroinee.xyz'
}

global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.lolhuman.xyz': 'GataDios', //lolhuman
  'https://skizo.tech': 'konekocyz', //skizo
  'https://api.betabotz.org': 'p8ADYJib', //betabotz
  'https://api.xyroinee.xyz': '3WIq7q3CWt' //xyroine
}

/*============== VERSION ==============*/
global.version = '11 classic by rapikz'

/*============== WATERMARK ==============*/
global.wm = '☇𝙰𝚉𝙰𝚇丨Ҩツ' //wm1
global.wm2 = '☇𝙰𝚉𝙰𝚇⥤+212602272422' //wm2
global.wm3 = '• ☇𝙰𝚉𝙰𝚇⥤' //wm3
global.namedoc = '☇𝙰𝚉𝙰𝚇⥤' //nama document
global.botdate = `• ᴅᴀʏ's: ${week} ${date}`
global.bottime = `ᴛɪᴍᴇ: ${wktuwib}`
global.titlebot = '🎋 ┊ ☇𝙰𝚉𝙰𝚇⥤ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ'
global.author = global.wm

/*============== THUMB ==============*/
global.elaina = 'https://telegra.ph/file/abdd4cca1d539daadac82.jpg'

/*============== LOGO ==============*/
global.thumb = 'https://telegra.ph/file/abdd4cca1d539daadac82.jpg' //thumbnail
global.thumb2 = 'https://telegra.ph/file/abdd4cca1d539daadac82.jpg'
global.thumbbc = 'https://telegra.ph/file/abdd4cca1d539daadac82.jpg' //broadcast
global.giflogo = 'https://telegra.ph/file/abdd4cca1d539daadac82.jpg'
global.thumblvlup = 'https://telegra.ph/file/abdd4cca1d539daadac82.jpg'
global.hwaifu = ['https://telegra.ph/file/abdd4cca1d539daadac82.jpg',
'https://i.pinimg.com/originals/88/46/88/884688def830c43648f88154836a8b05.jpg',
'https://i.pinimg.com/originals/32/2c/a4/322ca456fa2cdec4b717895a65adfa8d.jpg',
'https://i.pinimg.com/originals/42/88/f1/4288f17ee25b909430fb7e707d961d0b.jpg',
'https://i.pinimg.com/originals/16/14/9c/16149c94a7c0f753230b1edbd03ab3e6.jpg',
'https://i.pinimg.com/originals/80/4f/1a/804f1a05f9996c96a2d492b4854b7fd5.jpg']

/*============== FlamingText ===========*/
global.flaaa = [
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=', 
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='] 

/*============== TEXT ==============*/
global.wait = '🚩 انتظر قليلا...\n*تابع قناة المطور لكي تستفيد:*\n> https://whatsapp.com/channel/0029Vag9bvrLSmbRE2I5Oj2h'
global.eror = '```هناك خطأ```'
global.dtu = 'ɪɴꜱᴛᴀɢʀᴀᴍ'
global.dtc = 'تواصل مع المطور'
global.phn = '+212602272422'

/*=========== TYPE DOCUMENT ===========*/
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'
global.djson = 'application/json'

global.thumbdoc = 'https://telegra.ph/file/abdd4cca1d539daadac82.jpg'

/*=========== FAKE SIZE ===========*/
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'

/*=========== HIASAN ===========*/
// DEFAULT MENU
global.dmenut = 'ଓ═┅═━–〈' //top
global.dmenub = '┊↬' //body
global.dmenub2 = '┊' //body for info cmd on Default menu
global.dmenuf = '┗––––––––––✦' //footer

// COMMAND MENU
global.dashmenu = '┅━━━═┅═❏ *ღ 𝘿𝘼𝙎𝙃𝘽𝙊𝘼𝙍𝘿 ღ* ❏═┅═━━━┅'
global.cmenut = '❏––––––『'                       //top
global.cmenuh = '』––––––'                        //header
global.cmenub = '┊❀'                            //body
global.cmenuf = '┗━═┅═━––––––๑\n'                //footer
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ' //after
global.pmenus = '┊'                              //pembatas menu selector

global.htki = '––––––『' // Hiasan Titile (KIRI)
global.htka = '』––––––' // Hiasan Title  (KANAN)
global.lopr = 'Ⓟ' //LOGO PREMIUM ON MENU.JS
global.lolm = 'Ⓛ' //LOGO LIMIT/FREE ON MENU.JS
global.htjava = '⫹⫺'    //hiasan
global.hsquere = ['⛶','❏','⫹⫺']

/*============== STICKER WM ==============*/
global.stickpack = 'ᴇʟᴀɪɴᴀ ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ'
global.stickauth = `☂︎\n𝗘\nl\na\ni\nn\na\n-\n𝗕\n𝗢\n𝗧\n✦\n\n⫹⫺ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ\nwa.me/${global.nomorbot}`
global.packname = 'sᴛɪᴄᴋᴇʀ'
global.packname2 = 'ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴇʟᴀɪɴᴀ ᴀɪ'

global.multiplier = 38 // The higher, The harder levelup

/*============== EMOJI ==============*/
global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            Fox: "🦊",
            agility: "🤸‍♂️",
            anggur: "🍇",
            apel: "🍎",
            aqua: "🥤",
            arc: "🏹",
            armor: "🥼",
            bank: "🏦",
            batu: "🧱",
            berlian: "💎",
            bibitanggur: "🍇",
            bibitapel: "🍎",
            bibitjeruk: "🍊",
            bibitmangga: "🥭",
            bibitpisang: "🍌",
            botol: "🍾",
            bow: "🏹",
            bull: "🐃",
            cat: "🐈",
            centaur: "🎠",
            chicken: "🐓",
            coal: "⚱️",
            common: "📦",
            cow: "🐄",
            crystal: "🔮",
            darkcrystal: "♠️",
            diamond: "💎",
            dog: "🐕",
            dragon: "🐉",
            eleksirb: "🧪",
            elephant: "🐘",
            emasbatang: "🪙",
            emasbiasa: "🥇",
            emerald: "💚",
            exp: "✉️",
            fishingrod: "🎣",
            foodpet: "🍱",
            fox: "🦊",
            gardenboc: "🗳️",
            gardenboxs: "📦",
            gems: "🍀",
            giraffe: "🦒",
            gold: "👑",
            griffin: "🦒",
            health: "❤️",
            healtmonster: "❤‍🔥",
            horse: "🐎",
            intelligence: "🧠",
            iron: "⛓️",
            jeruk: "🍊",
            kaleng: "🥫",
            kardus: "📦",
            kayu: "🪵",
            ketake: "💿",
            keygold: "🔑",
            keyiron: "🗝️",
            knife: "🔪",
            koinexpg: "👛",
            kucing: "🐈",
            kuda: "🐎",
            kyubi: "🦊",
            legendary: "🗃️",
            level: "🧬",
            limit: "🌌",
            lion: "🦁",
            magicwand: "⚕️",
            makanancentaur: "🥗",
            makanangriffin: "🥙",
            makanankyubi: "🍗",
            makanannaga: "🍖",
            makananpet: "🥩",
            makananphonix: "🧀",
            mana: "🪄",
            mangga: "🥭",
            money: "💵",
            mythic: "🗳️",
            mythic: "🪄",
            naga: "🐉",
            pancingan: "🎣",
            pet: "🎁",
            petFood: "🍖",
            phonix: "🦅",
            pickaxe: "⛏️",
            pisang: "🍌",
            pointxp: "📧",
            potion: "🥤",
            rock: "🪨",
            rubah: "🦊",
            sampah: "🗑️",
            serigala: "🐺",
            snake: "🐍",
            stamina: "⚡",
            strength: "🦹‍♀️",
            string: "🕸️",
            superior: "💼",
            sword: "⚔️",
            tiger: "🐅",
            tiketcoin: "🎟️",
            trash: "🗑",
            umpan: "🪱",
            uncommon: "🎁",
            upgrader: "🧰",
            wood: "🪵"
        }
        let results = Object.keys(emot).map(v => [v, new RegExp(v, "gi")]).filter(v => v[1].test(string))
        if (!results.length) return ""
        else return emot[results[0][0]]
    }
}


//------ JANGAN DIUBAH -----
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

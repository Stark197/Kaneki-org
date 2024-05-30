import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'

const QUESTIONS_URL = 'https://gist.githubusercontent.com/Stark197/484f060605dc7c28e0a6c69d79b3451d/raw/80ba4b6c2a212bb31b65ebce33990c4fb2649904/gistfile1.txt'
const AUDIO_FILE_PATH = path.resolve(__dirname, 'https://a.tumblr.com/tumblr_o0xhd36TFO1t0a2ydo1.mp3')

let timeout = 60000
let points = 500
let lastQuestionPoints = 1000

let questions = []
let currentQuestionIndex = 0
let userPoints = 0

const loadQuestions = async () => {
    try {
        const response = await fetch(QUESTIONS_URL)
        const data = await response.json()
        questions = data.questions
    } catch (error) {
        console.error('Error loading questions:', error)
    }
}

const playAnswerSound = (conn, m) => {
    conn.sendFile(m.chat, AUDIO_FILE_PATH, 'win.mp3', 'Here is your answer sound!', m)
}

const askNextQuestion = async (conn, m) => {
    if (currentQuestionIndex >= questions.length) {
        conn.reply(m.chat, `Congratulations! You have completed all questions. Your total points: ${userPoints}`, m)
        return
    }

    const question = questions[currentQuestionIndex]
    const clue = question.response.replace(/[A-Za-z]/g, '_')
    const caption = `
ⷮ *${question.question}*

*Time⏳↞ ${(timeout / 1000).toFixed(2)}*
*Points💰↞ ${currentQuestionIndex === questions.length - 1 ? lastQuestionPoints : points}*
*KANEKI BOT*
`.trim()

    const image = 'https://telegra.ph/file/f5c021416da60ccd37f00.jpg' // New image link
    const message = await conn.sendFile(m.chat, image, 'image.jpg', caption, m)
    playAnswerSound(conn, m)

    setTimeout(async () => {
        await conn.reply(m.chat, `*⌛ Time's up!*\n *Answer✅ ${question.response}*`, message)
        currentQuestionIndex++
        askNextQuestion(conn, m)
    }, timeout)
}

const handler = async (m, { conn }) => {
    if (questions.length === 0) await loadQuestions()

    const id = m.chat
    if (currentQuestionIndex < questions.length) {
        conn.reply(m.chat, "There's already a question ongoing, please wait for it to finish.", m)
        return
    }

    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    if (id in conn.tekateki) {
        conn.reply(m.chat, '❐┃The question has not been answered yet.┃❌ ❯', conn.tekateki[id][0])
        throw false
    }

    await askNextQuestion(conn, m)
}

handler.help = ['riddle']
handler.tags = ['game']
handler.command = ['مليون']

export default handler

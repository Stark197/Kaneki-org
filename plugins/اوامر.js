let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.relayMessage(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: '*🎗️ قـائـمـة الـاوامــر🎗️*'
            },
            body: {
              text: '🧿 افتح القائمة بواسطة الزر\n🍒 لا تلعب كثير في القائمة'
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: 'اضغط للمزيد',
                    sections: [
                      {
                        title: 'List',
                        highlight_label: 'ON',
                        rows: [
                          {
                            header: 'المـلـصــ𝑾𝑬𝑵𝑫𝑨 𝑩𝑶𝑻ـقـات',
                            title: '.ملصقات',
                            description: '',
                            id: 'te'
                          },
                          {
                            header: '👑 قـسـم الـمـطـور',
                            title: '.المطور_كود',
                            description: '',
                            id: 'te'
                          }
                        ]
                      }
                    ]
                  }),
                  messageParamsJson: ''
                }
              ]
            }
          }
        }
      }
    }, {})

}

handler.help = ['الاوامر']
handler.tags = ['اوامر']
handler.command = ['اوامر','الاوامر']

export default handler

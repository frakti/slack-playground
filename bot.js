'use strict'

const Botkit = require('botkit')
const controller = Botkit.slackbot()
const bot = controller.spawn({
  token: process.env.SLACK_BOT_TOKEN
})

bot.startRTM((err, bot, payload) => {
  if (err) {
    throw new Error('Could not connect to Slack')
  }
})

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', (bot, message) => {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err)
        }
    })

    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!')
        } else {
            bot.reply(message, 'Hello.')
        }
    })
})

controller.hears(['keyword','^pattern$'],['message_received'], (bot, message) => {
  bot.reply(message,'You used a keyword!')

})
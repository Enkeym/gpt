import { Telegraf, session } from 'telegraf'
import config from 'config'
import { message } from 'telegraf/filters'
import { ogg } from './ogg.js'
import { openAi } from './openAi.js'
import { code } from 'telegraf/format'

console.log(config.get('TEST_ENV'))

const INITIAL_SESSION = {
  message: []
}

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

bot.use(session())

bot.command('new', async (ctx) => {
  ctx.session = INITIAL_SESSION
  await ctx.reply('Жду вашего голосового и текстового сообщения')
})

bot.command('start', async (ctx) => {
  ctx.session = INITIAL_SESSION
  await ctx.reply('Жду вашего голосового и текстового сообщения')
})

//bot voice
bot.on(message('voice'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  try {
    await ctx.reply(code('Пожалуйста, подождите...'))
    const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
    const userId = String(ctx.message.from.id)
    const oggPath = await ogg.create(link.href, userId)
    const mp3Path = await ogg.toMp3(oggPath, userId)

    const text = await openAi.transcription(mp3Path)
    await ctx.reply(code(`Ваш запрос: ${text}`))

    ctx.session.message.push({ role: openAi.roles.USER, content: text })

    const response = await openAi.chat(ctx.session.message)

    ctx.session.message.push({
      role: openAi.roles.ASSISTANT,
      content: response.content
    })

    await ctx.reply(response.content)

  } catch (error) {
    console.log(`Error while voice message`, error.message)
  }
})

//bot text
bot.on(message('text'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  try {
    await ctx.reply(code('Пожалуйста, подождите...'))

    ctx.session.message.push({ role: openAi.roles.USER, content: ctx.message.text })

    const response = await openAi.chat(ctx.session.message)

    ctx.session.message.push({
      role: openAi.roles.ASSISTANT,
      content: response.content
    })

    await ctx.reply(response.content)

  } catch (error) {
    console.log(`Error while voice message`, error.message)
  }
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

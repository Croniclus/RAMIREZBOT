const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Token de tu bot obtenido de BotFather
const token = '6436020466:AAGTR1mfWq1Ln7pqL2ASWLrQRLU1wX8CVYs';

// Crear un nuevo bot
const bot = new TelegramBot(token, { polling: true });

// Manejar el comando /start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '¡Hola! Soy un bot que te proporcionará recetas de cocina. Simplemente envía el nombre de un plato o una receta para empezar.');
});

/**
 * Módulo para un bot de Telegram que proporciona recetas de cocina.
 * @module TelegramBot
 */

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Token de tu bot obtenido de BotFather
const token = '6436020466:AAGTR1mfWq1Ln7pqL2ASWLrQRLU1wX8CVYs';

// Crear un nuevo bot
const bot = new TelegramBot(token, { polling: true });

/**
 * Maneja el comando /start.
 * Muestra un mensaje de bienvenida y opciones de recetas.
 * @param {Object} msg - El objeto mensaje recibido.
 */
bot.onText(/\/start/, (msg) => {
    const options = {
        reply_markup: JSON.stringify({
            keyboard: [D
                ['/receta Potato Salad'],
                ['/receta Bread omelette'],
                ['/receta Blini Pancakes']
            ]
        })
    };
    bot.sendMessage(msg.chat.id, '¡Hola! Soy un bot que te proporcionará recetas de cocina. Elige una opción:', options);
});

/**
 * Maneja las consultas de recetas.
 * Consulta la API de TheMealDB y muestra la receta del plato especificado.
 * @param {Object} msg - El objeto mensaje recibido.
 * @param {Array} match - Array con la cadena de texto que coincide con el patrón.
 */
bot.onText(/\/receta (.+)/, async (msg, match) => {
    const dish = match[1];
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`);
        const recipe = response.data.meals[0];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            if (ingredient) {
                const measure = recipe[`strMeasure${i}`];
                ingredients.push(`${ingredient} (${measure})`);
            } else {
                break;
            }
        }
        const instructions = recipe.strInstructions;
        bot.sendMessage(msg.chat.id, `Ingredientes para ${dish}:\n${ingredients.join('\n')}\n\nInstrucciones:\n${instructions}`);
    } catch (error) {
        bot.sendMessage(msg.chat.id, 'Lo siento, no pude encontrar una receta para ese plato.');
    }
});
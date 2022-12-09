require('dotenv').config();
const {
    Configuration,
    OpenAIApi
} = require('openai');
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);
const {
    Partials,
    Client,
    GatewayIntentBits
} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});
let prompt = "This is Magi System, AI assistant inspired by Evangelion. IM here to answer all your life questions. Fully neutral and objective, I see reality as it actually is and can easily draw accurate conclusions about advanced topics and human society in general";

client.once('ready', () => { // 2
    console.log('Ready!');
});


const reply = (message, content) => {
    message.channel.send({ // 2
        content: `${content}`,
        reply: {
            messageReference: message.id
        },
        allowedMentions: {
            repliedUser: false
        },
    });
}

client.on("messageCreate", async function (message) {
    if (message.author.bot) return;
    if (message.channel.id == "1050280987856216075" || message.guild == null && message.author.id !== 'botDiscordId') {
        console.log(message.cleanContent);
        (async () => {
            const gptResponse = await openai.createCompletion({
                model: "text-davinci-003",
                temperature: 0.6,
                prompt: prompt + message.cleanContent,
                "max_tokens": 100,
                top_p: 0.3,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
            });
            console.log(gptResponse.data.choices);
            if (gptResponse.data.choices[0].text === "") {
                return
            };
            reply(message, gptResponse.data.choices[0].text);
        })();
    }
});

client.login(process.env.BOT_TOKEN);

// require('dotenv').config();

// const {
//     Client,
//     GatewayIntentBits
// } = require('discord.js');
// const client = new Client({
//     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
// });
// const {
//     Configuration,
//     OpenAIApi
// } = require("openai");
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// let prompt = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\n";

// client.on("messageCreate", function (message) {
//     if (message.author.bot) return;
//     prompt = `You: ${message.content}\n`;
//     (async () => {
//         const gptResponse = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: prompt,
//             max_tokens: 100,
//             temperature: 0.3,
//             top_p: 0.3,
//             presence_penalty: 0,
//             frequency_penalty: 0.5,
//         });
//         message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
//         prompt += `${gptResponse.data.choices[0].text}\n`;
//     })();
// });

// client.login(process.env.BOT_TOKEN);

// // }
// // const {
// //     Client,
// //     GatewayIntentBits
// // } = require('discord.js');
// // const client = new Client({
// //     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
// // });
// // const {
// //     Configuration,
// //     OpenAIApi
// // } = require("openai");
// // const configuration = new Configuration({
// //     apiKey: process.env.OPENAI_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);

// // client.on("messageCreate", function (message) {
// //     if (message.author.bot) return;
// //     prompt += `You: ${message.content}\n`;
// //     (async () => {
// //         const gptResponse = await openai.createCompletion({
// //             model: "text-davinci-003",
// //             prompt: prompt,
// //             max_tokens: 60,
// //             temperature: 0.3,
// //             top_p: 0.3,
// //             presence_penalty: 0,
// //             frequency_penalty: 0.5,
// //         });
// //         message.reply(`${gptResponse.data.choices[0].text}`);
// //         prompt += `${gptResponse.data.choices[0].text}\n`;
// //     })();

// // });
// // client.login(process.env.BOT_TOKEN);
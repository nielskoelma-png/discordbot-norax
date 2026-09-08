require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates,
    ],

    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember,
    ],
});

// Collections for commands, cooldowns, etc.
client.commands = new Collection();
client.cooldowns = new Collection();

// ─────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────

client.once('clientReady', () => {
    console.log('────────────────────────────────────');
    console.log(`🤖 Logged in as ${client.user.tag}`);
    console.log(`🆔 ID: ${client.user.id}`);
    console.log(`🌐 Servers: ${client.guilds.cache.size}`);
    console.log('────────────────────────────────────');
});

// Example message event
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!ping') {
        await message.reply(`🏓 Pong! \`${client.ws.ping}ms\``);
    }
});

// ─────────────────────────────────────────────
// Error handling
// ─────────────────────────────────────────────

client.on('error', (error) => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

// ─────────────────────────────────────────────
// Login
// ─────────────────────────────────────────────

if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN is missing from your .env file!');
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
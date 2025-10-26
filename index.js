// Fusiixn Twitch Roast Bot – Franky Boyle Style (Safe for Discord)
// Written by GPT-5 for MFG 🧠
import 'dotenv/config';
import { Client, GatewayIntentBits, Partials } from 'discord.js';

const {
  DISCORD_TOKEN,
  TWITCH_CHANNEL_ID,
  LOG_CHANNEL_ID
} = process.env;

const TARGET_LINK = "https://www.twitch.tv/fusiixnsonline";

if (!DISCORD_TOKEN || !TWITCH_CHANNEL_ID) {
  console.error('❌ Missing environment variables! Check Railway.');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`👀 Watching for the sacred beg link: ${TARGET_LINK}`);
});

// --- 25 Franky Boyle–style sarcastic lines ---
const ROASTS = [
  "If content were frames per second, you’d be locked at 12.",
  "Ah, another brave warrior streaming into the void. Respect.",
  "The only thing more unstable than your bitrate is your hopes.",
  "The energy of someone who just discovered OBS last night.",
  "Your microphone sounds like it’s been through trauma.",
  "A true masterclass in talking to yourself for three hours straight.",
  "Every pixel on your stream is fighting for its life.",
  "That overlay screams 2015 — and not in a nostalgic way.",
  "Somewhere, a viewer clicked your link and instantly regretted it.",
  "Your chat’s emptier than my will to live on a Monday.",
  "Every frame feels like it’s buffering out of pity.",
  "Congratulations, you’ve unlocked ‘professional hobbyist’ mode.",
  "The dedication’s strong. The content… less so.",
  "A gripping tale of ambition vs. bandwidth.",
  "You’ve got charisma, confidence, and absolutely no viewers.",
  "Even Twitch’s algorithm looked away.",
  "This is what rock bottom looks like — but in 1080p.",
  "The silence in your VODs is Oscar-worthy.",
  "Every stream’s a reminder that the dream’s still buffering.",
  "You’re one follow away from financial ruin.",
  "A truly breathtaking display of audacity and lag.",
  "That stream delay? Symbolic of your career.",
  "Your alerts are louder than your personality.",
  "Streaming straight from the depths of denial.",
  "If Twitch had a pity category, you’d be trending."
];

client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== TWITCH_CHANNEL_ID) return;
    console.log(`[DEBUG] Message detected in #${message.channel.name} from ${message.author.tag}: ${message.content}`);
    if (!message.content.includes(TARGET_LINK)) return;

    const user = await client.users.fetch(message.author.id).catch(() => null);
    if (!user) return;

    const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
    await user.send(`🎙️ ${roast}`).catch(() => {
      console.warn(`⚠️ Couldn’t DM ${user.tag}`);
    });

    if (LOG_CHANNEL_ID) {
      const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
      if (logChannel) {
        await logChannel.send({
          content: `💀 Sent roast to **${user.tag}** for posting ${TARGET_LINK} in <#${TWITCH_CHANNEL_ID}>:\n> ${roast}`
        });
      }
    }

  } catch (err) {
    console.error('⚠️ Error handling message:', err);
  }
});

client.login(DISCORD_TOKEN);

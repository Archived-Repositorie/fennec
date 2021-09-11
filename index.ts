import { Client, Intents } from "discord.js"
import { config } from "./config"
import { readFileSync } from "fs"

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const pfpAscii = readFileSync("./asciiIcon.ans").toString()

client.on("ready", async () => {
    const clientInfo = {
        clientName: client.user.tag,
        clientID: client.user.id,
        clientServers: client.guilds.cache.size,
        clientMembers: client.users.cache.size
    }

    console.log(pfpAscii)
    console.table(clientInfo);
})

client.login(config.token)

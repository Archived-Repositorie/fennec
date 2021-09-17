//
//import
import { Client, Intents } from "discord.js"
import { config } from "./config"
import { readFileSync, readdirSync } from "fs"

//settings
const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const pfpAscii = readFileSync("./asciiIcon.ans").toString()

//ctx
class ctx {
    constructor 
}

//event handler
const eventFiles = readdirSync('./events')
    .filter(file => file.endsWith('.js'));


for(const file of eventFiles) {
    const event = require(`./events/${file}`)

    if (!event.once) {
        client.on(event.name, async (...args) => await event.execute(...args, new ctx))
    } else {
        client.once(event.name, async (...args) =>  await event.execute(...args, new ctx))
    }

} 

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



import fetch from 'node-fetch';

let handler = async(m, { conn, usedPrefix, command, text }) => {

if (!text) return m.reply(`《★》Ingresa Un Texto Para Buscar En Youtube\n> *Ejemplo:* ${usedPrefix + command}autos edits`);

let api = await (await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`)).json();

let results = api.data[0];

let txt = `✨ *Título:* ${results.title}\n⌛ *Duración:* ${results.duration || formatDuration(results.duration)}\n📎 *Link:* ${results.url}\n📆 *Publicado:* ${results.publishedAt}`;

let img = results.image;

conn.sendMessage(m.chat, {
        image: { url: img },
        caption: txt, 
        footer: dev, 
        buttons: [
            {
                buttonId: `${usedPrefix}ytmp4doc ${results.url}`,
                buttonText: { displayText: 'Descargar Video' }
            },
            {
                buttonId: `${usedPrefix}ytmp3doc ${results.url}`,
                buttonText: { displayText: 'Descargar Audio' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.command = ['play', 'paudio'];

export default handler

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
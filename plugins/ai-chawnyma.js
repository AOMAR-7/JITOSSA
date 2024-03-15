import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("قم بكتابة السؤال للذكاء الإصطناعي \nExample:.ai3 .مرحبا عمر كيف حالك")
    await m.reply(wait);
    try {
        const result = await fetchCompletion(text);
        await m.reply(result);
    } catch (error) {
        await m.reply(error);
    }

}
handler.help = ["ai3"]
handler.tags = ["ai"];
handler.command = /^(ai3)$/i
export default handler

async function fetchCompletion(inputValue) {
    try {
        const chatApiUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
        const chatResponse = await fetch(chatApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "حدث خطأ."
                }, {
                    role: "user",
                    content: inputValue
                }]
            }),
        });
        const chatData = await chatResponse.json();
        return chatData.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}

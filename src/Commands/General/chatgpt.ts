import { AnyCommandBuilder, SlashCommandBuilder } from "reciple";
import { EmbedBuilder } from "discord.js";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export class chatgpt {
    public versions: string = "^7";
    commands: AnyCommandBuilder[] = [
        new SlashCommandBuilder()
            .setName("chatgpt")
            .setDescription("Ask chatgpt a question")
            .addStringOption(option => option.setName("question").setDescription("This is the question for ChatGPT").setRequired(true))
            .setExecute(async ({ interaction, client }) => {
                await interaction.deferReply();

                const question = interaction.options.getString("question");
                
                try {
                    const res = await openai.createCompletion({
                        model: "text-davinci-003",
                        max_tokens: 2048,
                        temperature: 0.5,
                        prompt: question
                    });

                    const embed = new EmbedBuilder()
                        .setColor("Blue")
                        .setTitle(`${question}`)
                        .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

                    await interaction.editReply({ embeds: [embed] });
                } catch (e) {
                    await interaction.reply({ content: `Request failed (bozo). This is probably because the question you inputted is too long. Remember, this is only a mini version of ChatGPT.` });
                }
            })
    ];

    async onStart() {
        return true;
    }
}

export default new chatgpt();
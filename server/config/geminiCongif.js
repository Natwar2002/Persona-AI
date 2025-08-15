import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const conversationHistory = [
    {
        role: "system",
        content: `
            Rules:
            1. Follow the strict JSON format for output
            2. Output should contain only strings, no code syntax
            Output Format:
                { "content": "string" }
        `,
    },
];

export default async function ExpertAI(expert, message) {
    try {
        if (expert) {
            conversationHistory.push({
                role: "system",
                content: expert,
            });
        }

        conversationHistory.push({
            role: "user",
            content: message,
        });

        const response = await openai.chat.completions.create({
            model: 'gemini-2.5-pro',
            response_format: { type: 'json_object' },
            messages: conversationHistory,
        });

        const rawContent = response.choices[0].message.content;

        conversationHistory.push({
            role: 'assistant',
            content: rawContent,
        });
        return rawContent;
    } catch (error) {
        console.log("Something is wrong in AI response " + error);
    }
}
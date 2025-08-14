import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export default async function ExpertAI(expert, message) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gemini-2.0-flash',
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: "system",
                    content: `
                        Rules:
                        1. Follow the strict JSON format for output
                        2. output should contain only string no codes ( syntax )
                        Output Format:
                            { "content": "string" }
                        ${expert}`,
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });
        return response.choices[0].message.content
    } catch (error) {
        console.log("Something is wrong in AI response " + error);
    }
}
import { NextResponse } from "next/server";
import { OpenAI } from "openai"
export const runtime = "edge"

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export async function POST (req: Request) {

    const json = await req.json()
    const { category_review } = json

    console.log(category_review);
    

    const prompts = category_review.map(
        ({ question, answer, review }) =>
            `Question: ${question}\nAnswer: ${answer}\nReview: ${review}`
    ).join("\n\n");

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." },
        {"role": "user", "content": `How did I perform on this category, keep in mind that for this questions I answered: ${prompts}`},],
        model: "gpt-4o",
        tools: [{
            type: "function",
            function: {
                name: "get_response",
                description: "Evaluate users performance on a category",
                parameters: {
                    type: "object",
                    properties: {
                        description: {
                            type: "string",
                            description: "description of how my performance overall was",
                        },
                        improvement: {
                            type: "string",
                            description: "area where I can improve",
                        },
                        sources: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "sources that I can use to improve",
                        },
                        score: {
                            type: "number",
                            description: "A score from 0 to 100 indicating how correct the answer is",
                        },
                    },
                    required: ["description", "improvement", "score"],
                },
            }
        }]
    });
    
    const completionData = completion.choices[0]?.message.tool_calls[0]?.function.arguments

    const evaluationResult = JSON.parse(completionData);

    return NextResponse.json(evaluationResult);
}
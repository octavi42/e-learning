import { NextResponse } from "next/server";
import { OpenAI } from "openai"
export const runtime = "edge"

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export async function POST (req: Request) {

    const ftools = [{
        "type": "function",
        "function": {
            "name": "get_response",
            "description": "Evaluate users answer",
            "parameters": {
                "type": "object",
                "properties": {
                    "correct": {
                        "type": "boolean",
                        "description": "Whether the user's answer is correct",
                    },
                    "reason": {
                        "type": "string",
                        "description": "The reason why the answer is correct or incorrect",
                    },
                    "score": {
                        "type": "number",
                        "description": "A score from 0 to 100 indicating how correct the answer is",
                    },
                },
                "required": ["correct", "reason", "score"],
            },
        }
    }]

    const json = await req.json()
    const { question, answer, expectedAnswer } = json

    console.log(question, answer, expectedAnswer);

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." },
        {"role": "user", "content": `How did the user answer this question: ${question}, keep in mind that the expected answer is ${expectedAnswer}, this is how the user answered: ${answer}`},],
        model: "gpt-4o",
        tools: [{
            type: "function",
            function: {
                name: "get_response",
                description: "Evaluate users answer",
                parameters: {
                    type: "object",
                    properties: {
                        correct: {
                            type: "boolean",
                            description: "Whether the user's answer is correct",
                        },
                        reason: {
                            type: "string",
                            description: "The reason why the answer is correct or incorrect",
                        },
                        score: {
                            type: "number",
                            description: "A score from 0 to 100 indicating how correct the answer is",
                        },
                    },
                    required: ["correct", "reason", "score"],
                },
            }
        }]
    });
    
    const completionData = completion.choices[0]?.message.tool_calls[0]?.function.arguments

    const evaluationResult = JSON.parse(completionData);

    return NextResponse.json(evaluationResult);
}
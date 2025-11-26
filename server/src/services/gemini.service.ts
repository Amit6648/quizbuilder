import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv'
import { questions, topics } from "../types/gemini.types.js";

dotenv.config();

if (!process.env.genapi) {
    throw new Error("No api key found");

}

const ai = new GoogleGenAI({ apiKey: process.env.genapi });

export const genrate = async (text: string): Promise<questions> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,

        config: {
            systemInstruction: "genrate a quiz of 10 questions based on the content provided and add a title according to the content",
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING
                    },
                    questions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: {
                                    type: Type.STRING
                                },
                                options: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.STRING
                                    }
                                },
                                answer: {
                                    type: Type.STRING
                                }
                            },
                            propertyOrdering: ["question", "options", "answer"]
                        }
                    }
                },
                propertyOrdering: ["title", "questions"]
            }
        }
    })

    const quiz = response.text || "{}";




    return JSON.parse(quiz);

}



export const orginize = async (text: string): Promise<topics> => {
    try {
        
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
        config: {
            systemInstruction: `
            1) orginize the data provided into topics
            2) source_name should be the overall of what is in the source
            3) include topic name
            4) make sure the topic_content is detailed
            `,
            responseMimeType: "application/json",
            responseSchema: {

                type: Type.OBJECT,
                properties: {
                    source_name: {
                        type: Type.STRING
                    },

                    topics: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                topic_name: {
                                    type: Type.STRING
                                },

                                topic_content: {
                                    type: Type.STRING
                                }
                            },
                            propertyOrdering: ['topic_name', 'topic_content']

                        }
                    }
                },
                propertyOrdering: ['source_name', 'topics']
            }
        }
    })

    const topics = response.text || "{}"

    return JSON.parse(topics);
}
  catch (error) 
  {
    throw error;
  }
}




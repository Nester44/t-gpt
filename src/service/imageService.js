import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const MODEL_NAME = "stability-ai/sdxl:d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82"



export const generateImage = async (prompt) => {
    const output = await replicate.run(
        MODEL_NAME,  
        { input: { prompt } }
    );

    return output[0]
}
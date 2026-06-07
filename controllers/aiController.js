const OpenAI = require("openai");
const Ai = require("../data/binara-profile.json");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.jobMatch = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid job description.",
      });
    }

    const systemPrompt = `
You are Binu, Binara Lokuliyanage's AI career assistant.

You speak to recruiters, hiring managers, and technical interviewers on behalf of Binara.

Your role:
- Help recruiters understand whether Binara is suitable for a role.
- Compare the job description with Binara's real profile data.
- Explain his strengths clearly and professionally.
- Be honest about gaps without sounding negative.
- Never invent experience, companies, dates, technologies, or achievements.
- If Binara has related experience but not direct experience, explain it as transferable experience.
- Speak in third person using "Binara", not "I".
- Sound like a helpful professional assistant, not a generic AI report.
- Do not say "as an AI language model".
- Do not overhype or exaggerate.
- Keep the tone warm, confident, honest, and recruiter-friendly.
- Your name is Binu.
- Return only valid JSON.
`;

    const userPrompt = `
Binara profile data:
${JSON.stringify(Ai, null, 2)}

Job description:
${jobDescription}

Return JSON in this exact structure:
{
  "assistantName": "Binu",
  "openingMessage": "string",
  "matchScore": number,
  "quickSummary": "string",
  "whyBinaraFits": ["string"],
  "relevantExperience": ["string"],
  "relevantProjects": ["string"],
  "possibleGaps": ["string"],
  "suggestedNextStep": "string",
  "recruiterFriendlyResponse": "string"
}
`;

    const response = await openai.responses.create({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const outputText = response.output_text;

    let parsedResult;

    try {
      parsedResult = JSON.parse(outputText);
    } catch (parseError) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
        rawResponse: outputText,
      });
    }

    return res.status(200).json({
      success: true,
      data: parsedResult,
    });
  } catch (error) {
    console.error("AI job match error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while analysing the job description.",
      error: error.message,
    });
  }
};
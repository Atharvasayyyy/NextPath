const { GoogleGenAI } =
  require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeSkill(skill) {

  const prompt = `
You are a career guidance expert.

Analyze this technical skill:

SKILL:
${skill}

Return ONLY valid JSON.

Use exactly this structure:

{
  "summary": "",
  "whyLearn": [],
  "careerUses": [],
  "prerequisites": [],
  "difficulty": "",
  "salaryIndia": {
    "entryLevel": "",
    "midLevel": "",
    "seniorLevel": ""
  },
  "jobRoles": [],
  "futureScope": ""
}

Rules:

1. Keep summary under 80 words.
2. Give 3-5 reasons to learn it.
3. Give realistic prerequisites.
4. Mention relevant software/technology careers.
5. Salary must be expressed as approximate
   Indian annual ranges and clearly marked
   as estimates.
6. Do not invent companies.
7. Do not invent URLs.
8. Do not include markdown.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

  const text =
    response.text;

  try {
    return JSON.parse(text);
  } catch (error) {

    console.error(
      "AI JSON parsing failed:",
      text
    );

    throw new Error(
      "AI returned invalid JSON"
    );
  }
}

module.exports = {
  analyzeSkill,
};
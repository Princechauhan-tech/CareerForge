import groq from "../config/groq.js";

export const chatWithAI = async(req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [{
                    role: "system",
                    content: `
You are CareerForge AI.

Your role:
- Career Coach
- Resume Reviewer
- ATS Expert
- Interview Mentor
- Job Search Assistant

Rules:
- Give professional answers.
- Give practical career advice.
- Help students get jobs.
- Help improve resumes.
- Suggest interview questions when needed.
- Keep answers clear and structured.
`,
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        res.status(200).json({
            success: true,
            reply: completion.choices[0].message.content,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
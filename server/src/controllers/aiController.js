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
export const reviewResume = async(req, res) => {
    try {
        const { resume } = req.body;

        if (!resume) {
            return res.status(400).json({
                success: false,
                message: "Resume content is required",
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [{
                    role: "system",
                    content: `
You are a Senior ATS Resume Reviewer.

Evaluate the resume on:

1. ATS Score (0-100)
2. Technical Skills Analysis
3. Project Quality Assessment
4. Resume Formatting Review
5. Missing Keywords
6. Strengths
7. Weaknesses
8. Actionable Improvements

Rules:
- Be strict and realistic.
- Evaluate like a real recruiter.
- Mention ATS-friendly improvements.
- Suggest missing technologies if needed.
- Highlight project strengths and weaknesses.
- Give clear bullet points.
- Use markdown formatting.

Response Format:

# ATS Resume Review

## ATS Score
Score: XX/100

## Technical Skills
...

## Project Quality
...

## Resume Formatting
...

## Missing Keywords
- Keyword 1
- Keyword 2

## Strengths
- Point 1
- Point 2

## Weaknesses
- Point 1
- Point 2

## Actionable Improvements
- Improvement 1
- Improvement 2
`,
                },
                {
                    role: "user",
                    content: resume,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        res.status(200).json({
            success: true,
            review: completion.choices[0].message.content,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const atsChecker = async(req, res) => {
    try {
        const { resume, jobDescription } = req.body;

        if (!resume || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Resume and Job Description are required",
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [{
                    role: "system",
                    content: `
You are an ATS Checker.

Compare the resume with the job description.

Provide:

1. ATS Match Score (0-100)
2. Matched Skills
3. Missing Skills
4. Resume Strengths
5. Resume Weaknesses
6. Improvement Suggestions

Return response in markdown format.
`,
                },
                {
                    role: "user",
                    content: `
Resume:
${resume}

Job Description:
${jobDescription}
`,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        res.status(200).json({
            success: true,
            result: completion.choices[0].message.content,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const generateCoverLetter = async(req, res) => {
    try {
        const { name, role, company, skills, experience } = req.body;

        if (!name || !role || !company) {
            return res.status(400).json({
                success: false,
                message: "Name, role and company are required",
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [{
                    role: "system",
                    content: `
You are a Senior HR Manager and ATS Cover Letter Expert.

Generate a professional cover letter.

STRICT RULES:
- Return ONLY the cover letter.
- Do NOT include Address.
- Do NOT include City.
- Do NOT include State.
- Do NOT include ZIP Code.
- Do NOT include Email.
- Do NOT include Phone Number.
- Do NOT include Date.
- Do NOT include placeholders of any kind.
- Start directly with: Dear Hiring Manager,
- End with: Sincerely, followed by candidate name.
- ATS friendly.
- Professional tone.
- Mention candidate skills naturally.
- Mention company name naturally.
If the candidate is a fresher:
- Do NOT mention extensive experience.
- Do NOT claim professional work experience.
- Focus on projects, skills, internships, training, and learning.
- Use phrases like:
  "I have built projects using..."
  "I have gained hands-on experience through projects..."
  "I have developed strong skills in..."
`,
                },
                {
                    role: "user",
                    content: `
Candidate Name: ${name}
Target Role: ${role}
Company Name: ${company}
Skills: ${skills}
Experience Level: ${experience}
`,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        res.status(200).json({
            success: true,
            coverLetter: completion.choices[0].message.content,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const generateInterviewQuestions = async(req, res) => {
    try {
        const { role, experience } = req.body;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required",
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [{
                    role: "system",
                    content: `
You are a Senior Technical Interview Coach.

Generate interview preparation content for a MERN Stack Fresher.

Return ONLY markdown.

Include these sections:

# Technical Questions (10)

For each question provide:

Question:
Answer:
Example (if applicable)

Topics should include:
- JavaScript
- React
- Node.js
- Express
- MongoDB
- REST API
- JWT
- Authentication
- Async/Await
- HTTP Methods

---

# Coding Questions (5)

For each provide:

Problem
Approach
Key Concepts

Do NOT provide full code.

---

# HR Questions (5)

For each provide:

Question
Sample Answer

---

# Interview Tips

Include:
- Common mistakes
- Preparation strategy
- Final advice

Rules:

- Target freshers with 0-1 year experience.
- Keep answers practical.
- Avoid outdated technologies.
- Prefer JWT over Passport unless specifically asked.
- Mention React Hooks instead of Class Components.
- Mention MongoDB Atlas.
- Mention Git and GitHub.
- Mention Docker only as a bonus skill.
- Keep answers concise.
`
                },
                {
                    role: "user",
                    content: `
Role: ${role}
Experience: ${experience || "Fresher"}
`
                }
            ],
            model: "llama-3.1-8b-instant"
        });

        res.status(200).json({
            success: true,
            questions: completion.choices[0].message.content
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const optimizePrompt = async(req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [{
                    role: "system",
                    content: `
You are an Expert AI Prompt Engineer.

Your task is to rewrite user prompts into clear, detailed, and highly effective prompts.

Rules:
- Preserve the user's original intent.
- Improve clarity and grammar.
- Add only relevant context.
- Do NOT invent requirements that the user did not mention.
- Do NOT assume experience level, company, industry, or output format unless specified.
- If appropriate, specify the expected response structure.
- Return ONLY the optimized prompt.
- Do NOT add introductions like:
  - "Here is the optimized prompt"
  - "Optimized version:"
  - "Sure!"
- Do NOT use Markdown.
- Do NOT answer the user's request.
`,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        res.status(200).json({
            success: true,
            optimizedPrompt: completion.choices[0].message.content,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


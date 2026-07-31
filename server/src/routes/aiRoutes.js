import express from "express";
import {
    chatWithAI,
    reviewResume,
    atsChecker,
    generateCoverLetter,
    generateInterviewQuestions,
    optimizePrompt
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chatWithAI);
router.post("/resume-review", reviewResume);
router.post("/ats-checker", atsChecker);
router.post("/cover-letter", generateCoverLetter);
router.post("/interview-questions", generateInterviewQuestions);
router.post("/optimize-prompt", optimizePrompt);
export default router;
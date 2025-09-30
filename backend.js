// backend.js
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: "AIzaSyDkEqiCuc2oah1-HAZYbuSeKxxt0U5hZsA" });


const promptText = `Vertical 1080x1920 ultra-realistic 3D render.

Character:

The main subject is an action figure of a person. The face of the action figure should preserve the user's natural and recognizable features, but stylized to have a smooth plastic texture and glossy finish, with articulated joints and lifelike but toy-like proportions. The figure is posed in tactical agent gear, inspired by 'The Family Man' series: a black combat vest, a headset, an ID badge clipped on, dark tactical gloves, and a subtle detail of casual office shoes (to hint at a double life).

Accessories:

Next to the action figure on the table, include tiny, highly detailed accessories: a walkie-talkie, a miniature laptop bag, a small coffee mug, and a red marker file folder.

Background (Living Room & Screen):

The action figure and accessories are placed on a polished wooden desk or coffee table in a modern, subtly lit living room at night. The living room features comfortable furniture (e.g., a sofa), bookshelves with books, and a warm, inviting atmosphere.

Dominating the background on the desk is a large, thin-bezeled computer monitor. The screen displays the original "The Family Man" campaign poster image: the same person (your face, transformed into the tactical agent from the first render) standing facing the camera, body transformed into tactical gear, against a cinematic, moody background of glowing maps, digital code streams, and faint red surveillance lasers. The 'The Family Man' logo and tagline 'Every Family Man is a Secret Agent' are visible at the bottom of the screen.

Lighting & Mood:

The overall lighting is a premium product shot style for the action figure and accessories, with realistic reflections on the plastic surfaces. The computer screen glows prominently, casting a subtle light on the figure and the immediate surroundings. The living room itself is softly lit, creating a serious, suspenseful, and premium OTT (Over-The-Top) aesthetic, consistent with 'The Family Man' series.

Overall Style:

Ultra-realistic 3D render with cinematic quality. Focus on intricate detail for both the action figure and the environment.`;

app.post("/generate-image", async (req, res) => {
  try {
    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: promptText,
      config: { numberOfImages: 1 },
    });
    const base64Image = response.generatedImages[0].image.imageBytes;
    res.json({ imageBase64: base64Image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// backend/routes/generate.js
const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const router = express.Router();

// Initialize the Google Gen AI Client
// Key is automatically picked up from GEMINI_API_KEY environment variable
const ai = new GoogleGenAI({});

/**
 * Helper to call the Gemini API
 * NOTE: In a real app, this logic would be in a separate service file.
 */
async function generateWorldDetails(theme) {
    const prompt = `You are a world-building expert. Based on the theme "${theme}", generate a compelling name, a 300-word description, and 5 interesting lore points for a fantasy role-playing world. Return the result in a strict JSON format with fields: name, description, and lore (an array of strings).`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    lore: { type: 'array', items: { type: 'string' } },
                },
            },
        },
    });

    return JSON.parse(response.text.trim());
}

// POST /api/generate/world-details
router.post('/world-details', async (req, res) => {
    const { theme } = req.body;
    if (!theme) {
        return res.status(400).json({ error: 'Theme is required in the request body.' });
    }

    try {
        const details = await generateWorldDetails(theme);
        res.json(details);
    } catch (error) {
        console.error('Gemini API Error for world-details:', error);
        res.status(500).json({ error: 'Failed to generate world details.' });
    }
});

// Placeholder for other generative routes (e.g., /world-image, /character-details)
// POST /api/generate/world-image
router.post('/world-image', async (req, res) => {
    // In a real implementation, you would call a function using the Imagen API
    // const imageBase64 = await generateImage(req.body.name, req.body.description);
    // res.json({ imageBase64 });
    res.status(501).json({ message: 'Image generation is not yet implemented.' });
});

module.exports = router;

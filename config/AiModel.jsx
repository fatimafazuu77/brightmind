
const apiKey = 'AIzaSyCjQzva113nz1YOb-II-vyD-1PxPwZHfWo';

const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

export const GenerateTopicAIModel = async (userPrompt) => {
  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: userPrompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    // Extract the generated text from Gemini response
    if (
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
    ) {
      return data.candidates[0].content.parts[0].text;
    }
    if (data.error) {
      return `Error: ${data.error.message}`;
    }
    return 'No content generated.';
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    return 'Failed to generate content. Please try again.';
  }
};

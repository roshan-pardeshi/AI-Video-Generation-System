const form = document.getElementById('planner-form');
const sourceInput = document.getElementById('sourceInput');
const outputSection = document.getElementById('output');
const planText = document.getElementById('planText');

form.addEventListener('submit', event => {
  event.preventDefault();
  const inputType = document.getElementById('inputType').value;
  const rawContent = sourceInput.value.trim();
  if (!rawContent) return;

  const parsed = parseInput(rawContent, inputType);
  const plan = buildVideoPlan(parsed.title, parsed.summary);
  outputSection.classList.remove('hidden');
  planText.textContent = plan;
});

function parseInput(content, inputType) {
  const cleaned = content.replace(/\s+/g, ' ').trim();
  const words = cleaned.split(' ');

  if (inputType === 'topic') {
    return {
      title: cleaned,
      summary: `A simple introduction to ${cleaned}, explained with friendly visuals and voice.`
    };
  }

  if (inputType === 'pdf') {
    const preview = words.slice(0, 40).join(' ');
    return {
      title: words.slice(0, 8).join(' '),
      summary: `This video explains the main ideas from the PDF text: ${preview}...` 
    };
  }

  const title = words.slice(0, 8).join(' ');
  const summary = words.length > 80
    ? `This video explains: ${words.slice(0, 60).join(' ')}...`
    : cleaned;
  return { title, summary };
}

function buildVideoPlan(title, summary) {
  const scenes = createScenes(title, summary);
  const voiceover = scenes.map(scene => scene.narration).join(' ');

  let plan = `TITLE: ${title}\n\n`;
  plan += `SUMMARY: ${summary}\n\n`;
  plan += 'SCENES:\n\n';

  scenes.forEach((scene, index) => {
    plan += `Scene ${index + 1}:\n`;
    plan += `Title: ${scene.title}\n`;
    plan += `Narration: ${scene.narration}\n`;
    plan += `Visual: ${scene.visual}\n`;
    plan += `Image Prompt: ${scene.prompt}\n`;
    plan += `Emotion: ${scene.emotion}\n\n`;
  });

  plan += `VOICEOVER SCRIPT: ${voiceover}\n\n`;
  plan += `AVATAR INSTRUCTION: Use a user-provided image as an avatar if available. Sync the avatar mouth with the generated voice for a talking face video.\n\n`;
  plan += 'VIDEO GENERATION STEPS:\n\n';
  plan += '1. Generate images\n';
  plan += '2. Generate voice\n';
  plan += '3. Create avatar video (if image provided)\n';
  plan += '4. Merge using video tool\n';
  plan += '5. Export final video\n';

  return plan;
}

function createScenes(title, summary) {
  const base = {
    title: title,
    summary: summary,
  };

  return [
    {
      title: 'Introduction',
      narration: `This video is about ${base.title}. It will explain the main idea in a clear and friendly way.`,
      visual: `A clean title card with the topic name and simple icons that show learning and storytelling.`,
      prompt: `A high-quality cinematic image of a clean title card with the topic name and simple icons that show learning and storytelling, ultra realistic, 4k, detailed, cinematic lighting`,
      emotion: 'Educational'
    },
    {
      title: 'Main Idea',
      narration: `We show the main idea with easy examples and clear visuals. The viewer learns what matters most quickly.`,
      visual: `A simple scene that shows the core idea with helpful symbols, charts, or real-life examples.`,
      prompt: `A high-quality cinematic image of a simple scene that shows the core idea with helpful symbols, charts, or real-life examples, ultra realistic, 4k, detailed, cinematic lighting`,
      emotion: 'Clear'
    },
    {
      title: 'Why It Matters',
      narration: `Next, we explain why this topic is important. The message is kept short and easy to remember.`,
      visual: `A visual that connects the idea to daily life, with happy people or a bright setting.`,
      prompt: `A high-quality cinematic image of a visual that connects the idea to daily life, with happy people or a bright setting, ultra realistic, 4k, detailed, cinematic lighting`,
      emotion: 'Positive'
    },
    {
      title: 'How to Use It',
      narration: `Then we show a simple step or tip for using this idea in real life. This helps viewers take action.`,
      visual: `A scene with a person taking one clear step or using the concept in a simple task.`,
      prompt: `A high-quality cinematic image of a scene with a person taking one clear step or using the concept in a simple task, ultra realistic, 4k, detailed, cinematic lighting`,
      emotion: 'Helpful'
    },
    {
      title: 'Wrap Up',
      narration: `Finally, we review the main point and invite the viewer to try it themselves. The ending is friendly and strong.`,
      visual: `A closing scene with a smiling host, a summary text, and a sense of completion.`,
      prompt: `A high-quality cinematic image of a closing scene with a smiling host, a summary text, and a sense of completion, ultra realistic, 4k, detailed, cinematic lighting`,
      emotion: 'Confident'
    }
  ];
}

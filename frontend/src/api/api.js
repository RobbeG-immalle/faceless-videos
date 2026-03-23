const API_BASE = 'http://localhost:3001/api';

export async function generateScript(topic = 'personal finance') {
  const response = await fetch(`${API_BASE}/generate-script`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate script');
  }
  return data.script;
}

export async function generateVoice(text, voiceId) {
  const response = await fetch(`${API_BASE}/generate-voice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voiceId }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to generate voice');
  }

  return response.blob();
}

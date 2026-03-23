import { useState } from 'react';
import { generateVoice } from '../api/api';

const VOICES = [
  { label: 'Rachel (Female)', id: '21m00Tcm4TlvDq8ikWAM' },
  { label: 'Antoni (Male)', id: 'ErXwobaYiN019PkySvjV' },
];

export default function VoiceGenerator({ script, onVoiceGenerated }) {
  const [voiceId, setVoiceId] = useState(VOICES[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const blob = await generateVoice(script, voiceId);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      onVoiceGenerated(blob);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Generate Voice</h2>
        <p className="text-slate-400 text-sm">
          Choose a voice and convert your script to speech.
        </p>
      </div>

      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-slate-300 text-sm font-medium">Select Voice</label>
        <select
          value={voiceId}
          onChange={(e) => setVoiceId(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        >
          {VOICES.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Generating…
          </>
        ) : (
          'Generate Voice'
        )}
      </button>

      {audioUrl && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-300 text-sm font-medium mb-3">Preview</p>
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </div>
  );
}

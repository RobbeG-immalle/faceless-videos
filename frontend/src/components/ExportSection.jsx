import { useState } from 'react';

export default function ExportSection({ script, audioBlob, onStartOver }) {
  const [copied, setCopied] = useState(false);

  const handleDownloadAudio = () => {
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voiceover.mp3';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for browsers that don't support clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = script;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadScript = () => {
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Export</h2>
        <p className="text-slate-400 text-sm">Download your audio and script.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {audioBlob && (
          <button
            onClick={handleDownloadAudio}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ⬇ Download Audio
          </button>
        )}

        <button
          onClick={handleCopyScript}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {copied ? '✓ Copied!' : '📋 Copy Script'}
        </button>

        <button
          onClick={handleDownloadScript}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          ⬇ Download Script
        </button>

        <button
          onClick={onStartOver}
          className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          ↺ Start Over
        </button>
      </div>
    </div>
  );
}

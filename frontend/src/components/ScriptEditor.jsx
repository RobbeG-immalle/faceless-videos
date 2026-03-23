export default function ScriptEditor({ script, onChange, onContinue }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Edit Your Script</h2>
        <p className="text-slate-400 text-sm">
          Review and modify the script before generating the voice.
        </p>
      </div>

      <textarea
        value={script}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm leading-relaxed resize-y focus:outline-none focus:border-indigo-500 transition-colors"
        placeholder="Your script will appear here…"
      />

      <button
        onClick={onContinue}
        disabled={!script.trim()}
        className="self-end bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        Continue to Voice →
      </button>
    </div>
  );
}

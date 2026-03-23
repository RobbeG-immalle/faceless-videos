import { useState } from 'react';
import ScriptGenerator from './components/ScriptGenerator';
import ScriptEditor from './components/ScriptEditor';
import VoiceGenerator from './components/VoiceGenerator';
import ExportSection from './components/ExportSection';

const STEPS = [
  { number: 1, label: 'Generate' },
  { number: 2, label: 'Edit' },
  { number: 3, label: 'Voice' },
  { number: 4, label: 'Export' },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [script, setScript] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);

  const handleStartOver = () => {
    setCurrentStep(1);
    setScript('');
    setAudioBlob(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">🎬 Faceless Finance Videos</h1>
          <p className="text-slate-400 text-sm">Generate AI-powered YouTube Shorts scripts and voiceovers.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    currentStep === step.number
                      ? 'bg-indigo-600 text-white'
                      : currentStep > step.number
                      ? 'bg-indigo-900 text-indigo-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span
                  className={`mt-1 text-xs font-medium ${
                    currentStep === step.number ? 'text-indigo-400' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-1 transition-colors ${
                    currentStep > step.number ? 'bg-indigo-700' : 'bg-slate-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 sm:p-8">
          {currentStep === 1 && (
            <ScriptGenerator
              onScriptGenerated={(s) => {
                setScript(s);
                setCurrentStep(2);
              }}
            />
          )}
          {currentStep === 2 && (
            <ScriptEditor
              script={script}
              onChange={setScript}
              onContinue={() => setCurrentStep(3)}
            />
          )}
          {currentStep === 3 && (
            <VoiceGenerator
              script={script}
              onVoiceGenerated={(blob) => {
                setAudioBlob(blob);
                setCurrentStep(4);
              }}
            />
          )}
          {currentStep === 4 && (
            <ExportSection
              script={script}
              audioBlob={audioBlob}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </div>
    </div>
  );
}

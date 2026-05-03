import React, { useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function GaiaTest() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('André');

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8 font-mono">
      <div className="bg-white border border-stone-300 p-8 max-w-md w-full">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} className="text-stone-700" />
          <h1 className="text-lg font-semibold text-stone-900">
            Gaia · JSX test
          </h1>
        </div>
        <p className="text-stone-600 text-sm mb-6">
          Olá, {name || 'visitor'}. Pipeline funcional.
        </p>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount(count + 1)}
              className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white text-sm transition"
            >
              Click ({count})
            </button>
            {count > 0 && (
              <button
                onClick={() => setCount(0)}
                className="p-2 text-stone-500 hover:text-stone-900 transition"
                title="Reset"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-400">
          AAE v3 · {new Date().toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );
}

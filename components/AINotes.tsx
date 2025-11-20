import React, { useState } from 'react';
import { Note } from '../types';
import { MOCK_NOTES } from '../constants';
import { summarizeNote } from '../services/geminiService';
import { Wand2, Save, Plus, Loader2, Tags } from 'lucide-react';

const AINotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(MOCK_NOTES[0].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const activeNote = notes.find(n => n.id === selectedNoteId);

  const handleSummarize = async () => {
    if (!activeNote) return;
    setIsProcessing(true);
    const summary = await summarizeNote(activeNote.body);
    
    const updatedNotes = notes.map(note => 
        note.id === activeNote.id ? { ...note, aiSummary: summary } : note
    );
    setNotes(updatedNotes);
    setIsProcessing(false);
  };

  return (
    <div className="flex h-full gap-6">
      {/* Note List */}
      <div className="w-1/3 flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Notes</h2>
            <button className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                <Plus size={20} />
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {notes.map(note => (
                <div 
                    key={note.id}
                    onClick={() => setSelectedNoteId(note.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedNoteId === note.id 
                        ? 'bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                >
                    <h3 className="font-semibold text-slate-200 mb-1">{note.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{note.body}</p>
                    <div className="flex gap-2 mt-3">
                        {note.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-slate-400 uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
        {activeNote ? (
            <>
                <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                    <div>
                        <input 
                            type="text" 
                            value={activeNote.title}
                            readOnly
                            className="bg-transparent text-2xl font-bold text-white focus:outline-none w-full"
                        />
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                            <Tags size={14} />
                            {activeNote.tags.join(', ')}
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-400 transition-colors">
                        <Save size={20} />
                    </button>
                </div>
                
                <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
                    <textarea 
                        className="w-full min-h-[200px] bg-transparent text-slate-300 text-lg leading-relaxed focus:outline-none resize-none"
                        value={activeNote.body}
                        readOnly
                    />

                    {/* AI Section */}
                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-5">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                                <Wand2 size={16} className="text-purple-500" />
                                AI Insights
                            </h4>
                            <button 
                                onClick={handleSummarize}
                                disabled={isProcessing}
                                className="text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-3 py-1.5 rounded-lg border border-purple-500/20 transition-all flex items-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" size={12} /> : "Generate Summary"}
                            </button>
                        </div>
                        
                        {activeNote.aiSummary ? (
                            <div className="text-slate-300 text-sm leading-relaxed border-l-2 border-purple-500 pl-4 py-1">
                                {activeNote.aiSummary}
                            </div>
                        ) : (
                            <p className="text-slate-600 text-sm italic">
                                Tap "Generate Summary" to let Gemini condense this note into actionable tasks for your MR view.
                            </p>
                        )}
                    </div>
                </div>
            </>
        ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
                Select a note to view details
            </div>
        )}
      </div>
    </div>
  );
};

export default AINotes;
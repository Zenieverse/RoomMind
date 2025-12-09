import React, { useState } from 'react';
import { Note } from '../types';
import { MOCK_NOTES } from '../constants';
import { summarizeNote, extractTasks } from '../services/geminiService';
import { Wand2, Save, Plus, Loader2, Tags, ListTodo, FileText } from 'lucide-react';

const AINotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(MOCK_NOTES[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);

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

  const handleExtractTasks = async () => {
      if (!activeNote) return;
      setIsProcessing(true);
      const tasks = await extractTasks(activeNote.body);
      setGeneratedTasks(tasks);
      setIsProcessing(false);
  };

  return (
    <div className="flex h-full gap-6">
      {/* Note List */}
      <div className="w-80 flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-slate-400" size={24}/>
                Notes
            </h2>
            <button className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-lg shadow-blue-600/20">
                <Plus size={20} />
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            {notes.map(note => (
                <div 
                    key={note.id}
                    onClick={() => { setSelectedNoteId(note.id); setGeneratedTasks([]); }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all group ${
                        selectedNoteId === note.id 
                        ? 'bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                >
                    <h3 className={`font-semibold mb-1 transition-colors ${selectedNoteId === note.id ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'}`}>{note.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{note.body}</p>
                    <div className="flex gap-2 mt-3">
                        {note.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {activeNote ? (
            <>
                <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900/50">
                    <div className="w-full mr-4">
                        <input 
                            type="text" 
                            value={activeNote.title}
                            readOnly
                            className="bg-transparent text-2xl font-bold text-white focus:outline-none w-full placeholder-slate-600"
                        />
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                            <Tags size={14} />
                            {activeNote.tags.join(', ')}
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-400 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                        <Save size={20} />
                    </button>
                </div>
                
                <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
                    <div className="relative">
                        <textarea 
                            className="w-full min-h-[120px] bg-transparent text-slate-300 text-lg leading-relaxed focus:outline-none resize-none placeholder-slate-600"
                            value={activeNote.body}
                            readOnly
                        />
                    </div>

                    {/* AI Tools Section */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Summarizer */}
                        <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                    <Wand2 size={16} className="text-purple-500" />
                                    Smart Summary
                                </h4>
                                <button 
                                    onClick={handleSummarize}
                                    disabled={isProcessing}
                                    className="text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-3 py-1.5 rounded-lg border border-purple-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" size={12} /> : "Summarize"}
                                </button>
                            </div>
                            
                            {activeNote.aiSummary ? (
                                <div className="text-slate-300 text-sm leading-relaxed border-l-2 border-purple-500 pl-4 py-1">
                                    {activeNote.aiSummary}
                                </div>
                            ) : (
                                <p className="text-slate-600 text-xs italic">
                                    Generate a concise version of this note for your MR HUD.
                                </p>
                            )}
                        </div>

                        {/* Task Extractor */}
                        <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                             <div className="flex justify-between items-center mb-4">
                                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                    <ListTodo size={16} className="text-teal-500" />
                                    Action Items
                                </h4>
                                <button 
                                    onClick={handleExtractTasks}
                                    disabled={isProcessing}
                                    className="text-xs bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 px-3 py-1.5 rounded-lg border border-teal-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" size={12} /> : "Extract"}
                                </button>
                            </div>
                            
                            {generatedTasks.length > 0 ? (
                                <ul className="space-y-2">
                                    {generatedTasks.map((task, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-600 text-xs italic">
                                    Extract todo list items automatically from the text.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <FileText size={48} className="mb-4 opacity-20"/>
                <p>Select a note to view details</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AINotes;

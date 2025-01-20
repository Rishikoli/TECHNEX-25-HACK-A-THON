'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, Plus } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  timestamp: number;
}

export const PracticeNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  const addNote = () => {
    if (currentNote.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        text: currentNote,
        timestamp: Date.now(),
      };
      setNotes(prev => [newNote, ...prev]);
      setCurrentNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Practice Notes</h3>
      
      <div className="mb-4">
        <div className="flex space-x-2">
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Take notes during your practice session..."
            className="flex-1 min-h-[100px] p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addNote}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </motion.button>
        </div>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-500">
                {formatTimestamp(note.timestamp)}
              </span>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                ×
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{note.text}</p>
          </motion.div>
        ))}
        
        {notes.length === 0 && (
          <div className="text-center py-8">
            <Edit2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No notes yet. Start taking notes during your practice!</p>
          </div>
        )}
      </div>
    </div>
  );
};

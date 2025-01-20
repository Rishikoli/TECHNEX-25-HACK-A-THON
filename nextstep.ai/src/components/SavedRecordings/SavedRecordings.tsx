import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, Trash2, Clock, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Recording {
  id: string;
  blob: Blob;
  timestamp: Date;
  duration: number;
  questionId: number;
  transcript: string;
}

interface SavedRecordingsProps {
  recordings: Recording[];
  onPlay: (recording: Recording) => void;
  onDelete: (id: string) => void;
  onDownload: (recording: Recording) => void;
}

export const SavedRecordings = ({
  recordings,
  onPlay,
  onDelete,
  onDownload
}: SavedRecordingsProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Video className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="font-medium text-gray-900">Saved Recordings</h3>
        </div>
        <span className="text-sm text-gray-500">
          {recordings.length} {recordings.length === 1 ? 'recording' : 'recordings'}
        </span>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {recordings.length > 0 ? (
            recordings.map((recording) => (
              <motion.div
                key={recording.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatTimestamp(recording.timestamp)}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({formatDuration(recording.duration)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPlay(recording)}
                      className="hover:text-indigo-600"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownload(recording)}
                      className="hover:text-blue-600"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(recording.id)}
                      className="hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {recording.transcript && (
                  <p className="text-sm text-gray-500 line-clamp-2 italic">
                    "{recording.transcript}"
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 italic text-center py-4">
              No recordings yet. Start recording to see them here.
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

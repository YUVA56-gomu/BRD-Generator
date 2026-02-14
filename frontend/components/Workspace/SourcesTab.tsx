'use client';

import { useState } from 'react';
import { Upload, FileText, Trash2 } from 'lucide-react';
import Button from '@/components/Common/Button';
import Card from '@/components/Common/Card';
import Alert from '@/components/Common/Alert';
import { ingestionAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

interface SourcesTabProps {
  projectId: string;
  sources: any[];
  onSourcesUpdate: () => void;
}

export default function SourcesTab({ projectId, sources, onSourcesUpdate }: SourcesTabProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [sourceType, setSourceType] = useState('email');
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    try {
      await ingestionAPI.upload(projectId, 'document', undefined, file);
      toast.success('Document uploaded successfully');
      setPastedText('');
      onSourcesUpdate();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to upload document';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasteText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await ingestionAPI.upload(projectId, sourceType, pastedText);
      toast.success('Content ingested successfully');
      setPastedText('');
      onSourcesUpdate();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to ingest content';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSource = async (sourceId: string) => {
    if (!confirm('Are you sure you want to delete this source?')) return;

    try {
      await ingestionAPI.deleteSource(sourceId);
      toast.success('Source deleted');
      onSourcesUpdate();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to delete source';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert
          type="error"
          title="Error"
          message={error}
          onClose={() => setError('')}
        />
      )}

      {/* Upload Section */}
      <Card className="p-6">
        <div className="flex gap-4 mb-6 border-b border-secondary-200">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 font-medium ${
              activeTab === 'upload'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600'
            }`}
          >
            Upload Document
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`pb-3 font-medium ${
              activeTab === 'paste'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600'
            }`}
          >
            Paste Text
          </button>
        </div>

        {activeTab === 'upload' ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
              <Upload className="mx-auto mb-3 text-secondary-400" size={32} />
              <p className="text-secondary-600 mb-2">Drag and drop your file here</p>
              <p className="text-sm text-secondary-500 mb-4">or</p>
              <label>
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  className="hidden"
                />
                <Button as="span" variant="primary" isLoading={isLoading}>
                  Choose File
                </Button>
              </label>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePasteText} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Source Type
              </label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="email">Email</option>
                <option value="slack">Slack Message</option>
                <option value="meeting_transcript">Meeting Transcript</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Content
              </label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your email, chat message, or meeting notes here..."
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={6}
              />
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Ingest Content
            </Button>
          </form>
        )}
      </Card>

      {/* Sources List */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Uploaded Sources</h3>
        {sources.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="mx-auto mb-3 text-secondary-300" size={32} />
            <p className="text-secondary-500">No sources uploaded yet</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {sources.map((source) => (
              <Card key={source.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 flex-1">
                  <FileText size={20} className="text-primary-600" />
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900">
                      {source.file_name || source.source_type}
                    </p>
                    <p className="text-sm text-secondary-500">
                      {formatDistanceToNow(new Date(source.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSource(source.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

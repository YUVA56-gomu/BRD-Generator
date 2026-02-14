'use client';

import { useState } from 'react';
import { BRDDocument } from '@/lib/store';
import Button from '@/components/Common/Button';
import Card from '@/components/Common/Card';
import Alert from '@/components/Common/Alert';
import { brdAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { RefreshCw } from 'lucide-react';

interface BRDEditorTabProps {
  projectId: string;
  brd: BRDDocument | null;
  onBRDUpdate: () => void;
}

export default function BRDEditorTab({ projectId, brd, onBRDUpdate }: BRDEditorTabProps) {
  const [editRequest, setEditRequest] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerateBRD = async () => {
    setIsGenerating(true);
    setError('');
    try {
      await brdAPI.generate(projectId);
      toast.success('BRD generated successfully');
      onBRDUpdate();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to generate BRD';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brd || !editingSection || !editRequest.trim()) {
      setError('Please select a section and enter an edit request');
      return;
    }

    setIsEditing(true);
    setError('');
    try {
      await brdAPI.editSection(brd.id, editingSection, editRequest);
      toast.success('Section updated successfully');
      setEditRequest('');
      setEditingSection(null);
      onBRDUpdate();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to update section';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsEditing(false);
    }
  };

  if (!brd) {
    return (
      <div className="space-y-6">
        {error && (
          <Alert
            type="error"
            title="Error"
            message={error}
            onClose={() => setError('')}
          />
        )}
        <Card className="p-8 text-center">
          <p className="text-secondary-600 mb-4">No BRD generated yet</p>
          <Button onClick={handleGenerateBRD} isLoading={isGenerating}>
            <RefreshCw size={18} />
            Generate BRD
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert
          type="error"
          title="Error"
          message={error}
          onClose={() => setError('')}
        />
      )}

      {/* Generate Button */}
      <div className="flex justify-end">
        <Button onClick={handleGenerateBRD} isLoading={isGenerating} variant="secondary">
          <RefreshCw size={18} />
          Regenerate BRD
        </Button>
      </div>

      {/* BRD Sections */}
      <div className="space-y-4">
        {brd.executive_summary && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-3">Executive Summary</h3>
            <p className="text-secondary-700 whitespace-pre-wrap">{brd.executive_summary}</p>
          </Card>
        )}

        {brd.business_objectives && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-3">Business Objectives</h3>
            <p className="text-secondary-700 whitespace-pre-wrap">{brd.business_objectives}</p>
          </Card>
        )}

        {brd.functional_requirements && brd.functional_requirements.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-3">Functional Requirements</h3>
            <ul className="space-y-2">
              {brd.functional_requirements.map((req, idx) => (
                <li key={idx} className="flex gap-3 text-secondary-700">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {brd.non_functional_requirements && brd.non_functional_requirements.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-3">Non-Functional Requirements</h3>
            <ul className="space-y-2">
              {brd.non_functional_requirements.map((req, idx) => (
                <li key={idx} className="flex gap-3 text-secondary-700">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {brd.risks && brd.risks.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-3">Risks</h3>
            <ul className="space-y-2">
              {brd.risks.map((risk, idx) => (
                <li key={idx} className="flex gap-3 text-secondary-700">
                  <span className="text-red-600 font-bold">⚠</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* Edit Section */}
      <Card className="p-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Edit BRD</h3>
        <form onSubmit={handleEditSection} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              Section to Edit
            </label>
            <select
              value={editingSection || ''}
              onChange={(e) => setEditingSection(e.target.value)}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a section...</option>
              <option value="executive_summary">Executive Summary</option>
              <option value="business_objectives">Business Objectives</option>
              <option value="functional_requirements">Functional Requirements</option>
              <option value="non_functional_requirements">Non-Functional Requirements</option>
              <option value="risks">Risks</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              Edit Request
            </label>
            <textarea
              value={editRequest}
              onChange={(e) => setEditRequest(e.target.value)}
              placeholder="e.g., Add payment requirement, Make it more concise..."
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            isLoading={isEditing}
            disabled={!editingSection || !editRequest.trim()}
            className="w-full"
          >
            Apply Edit
          </Button>
        </form>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Modal from '@/components/Common/Modal';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { projectAPI } from '@/lib/api';
import { useProjectStore, useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const user = useAuthStore((state) => state.user);
  const addProject = useProjectStore((state) => state.addProject);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await projectAPI.create(user.id, name, description);
      addProject(response.data);
      toast.success('Project created successfully');
      setName('');
      setDescription('');
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name"
          placeholder="e.g., Mobile App Requirements"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-secondary-900 mb-2">
            Description (Optional)
          </label>
          <textarea
            placeholder="Describe your project..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={4}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading} className="flex-1">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}

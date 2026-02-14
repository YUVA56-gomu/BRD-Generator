'use client';

import Button from '@/components/Common/Button';
import { Plus, Upload, FileText, Settings } from 'lucide-react';

interface QuickActionsProps {
  onCreateProject: () => void;
}

export default function QuickActions({ onCreateProject }: QuickActionsProps) {
  const actions = [
    {
      icon: Plus,
      label: 'New Project',
      description: 'Create a new BRD project',
      onClick: onCreateProject,
      color: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    },
    {
      icon: Upload,
      label: 'Upload Document',
      description: 'Upload a document to analyze',
      onClick: () => {},
      color: 'bg-green-100 text-green-600 hover:bg-green-200',
      disabled: true,
    },
    {
      icon: FileText,
      label: 'View Templates',
      description: 'Browse BRD templates',
      onClick: () => {},
      color: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      disabled: true,
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Manage your preferences',
      onClick: () => {},
      color: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
      disabled: true,
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`p-6 rounded-xl border border-secondary-200 text-left transition-all duration-300 ${
                action.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-lg hover:border-secondary-300'
              }`}
            >
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                <Icon size={24} />
              </div>
              <h3 className="font-semibold text-secondary-900 mb-1">{action.label}</h3>
              <p className="text-sm text-secondary-600">{action.description}</p>
              {action.disabled && (
                <p className="text-xs text-secondary-500 mt-2 italic">Coming soon</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

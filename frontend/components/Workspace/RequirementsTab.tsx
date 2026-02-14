'use client';

import { useState } from 'react';
import { Requirement } from '@/lib/store';
import Card from '@/components/Common/Card';
import { CheckCircle, AlertCircle, Users, Clock } from 'lucide-react';

interface RequirementsTabProps {
  requirements: Requirement[];
}

export default function RequirementsTab({ requirements }: RequirementsTabProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const typeIcons = {
    functional: <CheckCircle size={18} className="text-blue-600" />,
    non_functional: <AlertCircle size={18} className="text-orange-600" />,
    stakeholder: <Users size={18} className="text-purple-600" />,
    risk: <AlertCircle size={18} className="text-red-600" />,
    decision: <CheckCircle size={18} className="text-green-600" />,
    timeline: <Clock size={18} className="text-indigo-600" />,
  };

  const typeLabels = {
    functional: 'Functional',
    non_functional: 'Non-Functional',
    stakeholder: 'Stakeholder',
    risk: 'Risk',
    decision: 'Decision',
    timeline: 'Timeline',
  };

  const filteredRequirements = filter
    ? requirements.filter((r) => r.requirement_type === filter)
    : requirements;

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === null
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300'
          }`}
        >
          All ({requirements.length})
        </button>
        {Object.entries(typeLabels).map(([key, label]) => {
          const count = requirements.filter((r) => r.requirement_type === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300'
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Requirements List */}
      {filteredRequirements.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-secondary-500">No requirements found</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredRequirements.map((req) => (
            <Card key={req.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {typeIcons[req.requirement_type as keyof typeof typeIcons]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-secondary-900">{req.title}</h4>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary-100 text-secondary-700">
                      {typeLabels[req.requirement_type as keyof typeof typeLabels]}
                    </span>
                    {req.priority && (
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          req.priority === 'critical'
                            ? 'bg-red-100 text-red-700'
                            : req.priority === 'high'
                            ? 'bg-orange-100 text-orange-700'
                            : req.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {req.priority}
                      </span>
                    )}
                  </div>
                  <p className="text-secondary-600 text-sm">{req.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

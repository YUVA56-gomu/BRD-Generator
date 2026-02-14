'use client';

import { Requirement } from '@/lib/store';
import Card from '@/components/Common/Card';

interface TraceabilityTabProps {
  requirements: Requirement[];
}

export default function TraceabilityTab({ requirements }: TraceabilityTabProps) {
  const typeColors = {
    functional: 'bg-blue-100 text-blue-700',
    non_functional: 'bg-orange-100 text-orange-700',
    stakeholder: 'bg-purple-100 text-purple-700',
    risk: 'bg-red-100 text-red-700',
    decision: 'bg-green-100 text-green-700',
    timeline: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-secondary-200 bg-secondary-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">
                Requirement
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {requirements.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-secondary-500">
                  No requirements to display
                </td>
              </tr>
            ) : (
              requirements.map((req) => (
                <tr key={req.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-secondary-900">{req.title}</p>
                      <p className="text-sm text-secondary-500 mt-1">{req.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        typeColors[req.requirement_type as keyof typeof typeColors]
                      }`}
                    >
                      {req.requirement_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {req.priority ? (
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
                    ) : (
                      <span className="text-secondary-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        req.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : req.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

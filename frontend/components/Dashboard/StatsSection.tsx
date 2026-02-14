'use client';

import { Project } from '@/lib/store';
import { FileText, CheckCircle, Clock, Zap } from 'lucide-react';

interface StatsSectionProps {
  projects: Project[];
}

export default function StatsSection({ projects }: StatsSectionProps) {
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const totalProjects = projects.length;

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Projects',
      value: activeProjects,
      icon: Zap,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Completed',
      value: completedProjects,
      icon: CheckCircle,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'In Progress',
      value: activeProjects,
      icon: Clock,
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl p-6 border border-secondary-200 hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-secondary-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

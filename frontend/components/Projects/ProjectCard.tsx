'use client';

import Card from '@/components/Common/Card';
import { Project } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  requirementCount?: number;
}

export default function ProjectCard({ project, requirementCount = 0 }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group relative h-full">
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        <Card hover className="p-6 h-full flex flex-col relative z-10">
          <div className="space-y-4 flex-1">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-secondary-900 truncate flex-1 group-hover:text-primary-600 transition-colors">
                  {project.name}
                </h3>
                <ArrowRight
                  size={18}
                  className="text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2"
                />
              </div>
              <p className="text-sm text-secondary-500 line-clamp-2">
                {project.description || 'No description'}
              </p>
            </div>

            {/* Status badge */}
            <div className="flex gap-2 flex-wrap">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                  project.status === 'active'
                    ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                    : project.status === 'completed'
                    ? 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                }`}
              >
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-secondary-100 mt-4">
            <div className="flex items-center gap-2 text-secondary-600 group-hover:text-primary-600 transition-colors">
              <FileText size={16} />
              <span className="text-sm font-medium">{requirementCount} reqs</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-500 text-xs group-hover:text-secondary-600 transition-colors">
              <Clock size={14} />
              <span>{formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}</span>
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
}

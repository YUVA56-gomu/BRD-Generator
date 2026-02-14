'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/store';
import { ChevronLeft, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface FeaturedSliderProps {
  projects: Project[];
}

export default function FeaturedSlider({ projects }: FeaturedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || projects.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, projects.length]);

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];
  const nextIndex = (currentIndex + 1) % projects.length;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

  const handlePrev = () => {
    setCurrentIndex(prevIndex);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex(nextIndex);
    setAutoPlay(false);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Featured Project</h2>
          <p className="text-secondary-600 mt-1">Your latest and greatest work</p>
        </div>
        {projects.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} className="text-secondary-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              aria-label="Next project"
            >
              <ChevronRight size={20} className="text-secondary-600" />
            </button>
          </div>
        )}
      </div>

      <Link href={`/projects/${currentProject.id}`}>
        <div className="relative group cursor-pointer">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

          {/* Card */}
          <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-200 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100 rounded-full -mr-20 -mt-20 opacity-50" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-100 rounded-full -ml-16 -mb-16 opacity-50" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-primary-600 rounded-lg">
                      <Zap size={20} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-4xl font-bold text-secondary-900 mb-2">
                    {currentProject.name}
                  </h3>
                  <p className="text-lg text-secondary-600 max-w-2xl">
                    {currentProject.description || 'No description provided'}
                  </p>
                </div>

                {/* Status badge */}
                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`text-sm font-semibold px-4 py-2 rounded-full ${
                      currentProject.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : currentProject.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {currentProject.status.charAt(0).toUpperCase() + currentProject.status.slice(1)}
                  </span>
                  <div className="flex items-center gap-1 text-primary-600 font-semibold">
                    <TrendingUp size={16} />
                    <span>View Project</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-primary-200">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Status</p>
                  <p className="text-lg font-semibold text-secondary-900 capitalize">
                    {currentProject.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Created</p>
                  <p className="text-lg font-semibold text-secondary-900">
                    {new Date(currentProject.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Updated</p>
                  <p className="text-lg font-semibold text-secondary-900">
                    {new Date(currentProject.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Slider indicators */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoPlay(false);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-600 w-8'
                  : 'bg-secondary-300 w-2 hover:bg-secondary-400'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

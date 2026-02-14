'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/Layout/MainLayout';
import ProtectedRoute from '@/components/Layout/ProtectedRoute';
import ProjectCard from '@/components/Projects/ProjectCard';
import CreateProjectModal from '@/components/Projects/CreateProjectModal';
import FeaturedSlider from '@/components/Dashboard/FeaturedSlider';
import StatsSection from '@/components/Dashboard/StatsSection';
import QuickActions from '@/components/Dashboard/QuickActions';
import Button from '@/components/Common/Button';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Alert from '@/components/Common/Alert';
import { useAuthStore, useProjectStore, Project } from '@/lib/store';
import { projectAPI, initializeAPI } from '@/lib/api';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function DashboardContent() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    initializeAPI();
    loadProjects();
  }, []);

  const loadProjects = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError('');
      const response = await projectAPI.list(user.id);
      setProjects(response.data);
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to load projects';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-secondary-900">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-secondary-600 mt-2">
              {projects.length === 0
                ? 'Create your first project to get started'
                : `You have ${projects.length} project${projects.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            type="error"
            title="Error"
            message={error}
            onClose={() => setError('')}
          />
        )}

        {/* Featured Slider */}
        {projects.length > 0 && (
          <>
            <FeaturedSlider projects={projects} />
            <StatsSection projects={projects} />
          </>
        )}

        {/* Quick Actions */}
        <QuickActions onCreateProject={() => setIsModalOpen(true)} />

        {/* All Projects Section */}
        {projects.length === 0 ? (
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={32} className="text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">No projects yet</h2>
              <p className="text-secondary-600 mb-6">
                Create your first BRD project to start generating requirements documents
              </p>
              <Button onClick={() => setIsModalOpen(true)} className="mx-auto">
                <Plus size={20} />
                Create Your First Project
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900">All Projects</h2>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus size={20} />
                New Project
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  requirementCount={0}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          loadProjects();
        }}
      />
    </MainLayout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

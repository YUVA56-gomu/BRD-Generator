'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/Layout/MainLayout';
import ProtectedRoute from '@/components/Layout/ProtectedRoute';
import Tabs from '@/components/Common/Tabs';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Alert from '@/components/Common/Alert';
import SourcesTab from '@/components/Workspace/SourcesTab';
import RequirementsTab from '@/components/Workspace/RequirementsTab';
import BRDEditorTab from '@/components/Workspace/BRDEditorTab';
import TraceabilityTab from '@/components/Workspace/TraceabilityTab';
import { useProjectStore, useRequirementStore, useSourceStore, useBRDStore } from '@/lib/store';
import { projectAPI, requirementAPI, ingestionAPI, brdAPI } from '@/lib/api';
import { FileText, List, Edit, Grid } from 'lucide-react';
import toast from 'react-hot-toast';

function ProjectContent() {
  const params = useParams();
  const projectId = params.id as string;
  const router = useRouter();

  const currentProject = useProjectStore((state) => state.currentProject);
  const setCurrentProject = useProjectStore((state) => state.setCurrentProject);
  const requirements = useRequirementStore((state) => state.requirements);
  const setRequirements = useRequirementStore((state) => state.setRequirements);
  const sources = useSourceStore((state) => state.sources);
  const setSources = useSourceStore((state) => state.setSources);
  const brd = useBRDStore((state) => state.brd);
  const setBRD = useBRDStore((state) => state.setBRD);

  const [activeTab, setActiveTab] = useState('sources');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProjectData();
  }, [projectId]);

  const loadProjectData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Load project
      const projectRes = await projectAPI.get(projectId);
      setCurrentProject(projectRes.data);

      // Load sources
      const sourcesRes = await ingestionAPI.getSources(projectId);
      setSources(sourcesRes.data);

      // Load requirements
      const reqRes = await requirementAPI.list(projectId);
      setRequirements(reqRes.data);

      // Load BRD
      try {
        const brdRes = await brdAPI.listByProject(projectId);
        if (brdRes.data.length > 0) {
          setBRD(brdRes.data[0]);
        }
      } catch (error) {
        // BRD might not exist yet
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to load project data';
      setError(errorMsg);
      toast.error(errorMsg);
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'sources', label: 'Sources', icon: <FileText size={18} /> },
    { id: 'requirements', label: 'Requirements', icon: <List size={18} /> },
    { id: 'brd', label: 'BRD Editor', icon: <Edit size={18} /> },
    { id: 'traceability', label: 'Traceability', icon: <Grid size={18} /> },
  ];

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
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

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">{currentProject?.name}</h1>
          <p className="text-secondary-600 mt-1">{currentProject?.description}</p>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === 'sources' && (
            <SourcesTab
              projectId={projectId}
              sources={sources}
              onSourcesUpdate={loadProjectData}
            />
          )}

          {activeTab === 'requirements' && <RequirementsTab requirements={requirements} />}

          {activeTab === 'brd' && (
            <BRDEditorTab
              projectId={projectId}
              brd={brd}
              onBRDUpdate={loadProjectData}
            />
          )}

          {activeTab === 'traceability' && <TraceabilityTab requirements={requirements} />}
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default function ProjectPage() {
  return (
    <ProtectedRoute>
      <ProjectContent />
    </ProtectedRoute>
  );
}

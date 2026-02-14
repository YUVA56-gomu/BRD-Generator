import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Requirement {
  id: string;
  project_id: string;
  requirement_type: 'functional' | 'non_functional' | 'stakeholder' | 'decision' | 'risk' | 'timeline';
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  status: 'draft' | 'approved' | 'rejected';
  created_at: string;
}

export interface Source {
  id: string;
  project_id: string;
  source_type: 'email' | 'slack' | 'meeting_transcript' | 'document' | 'other';
  source_text: string;
  file_name?: string;
  created_at: string;
}

export interface BRDDocument {
  id: string;
  project_id: string;
  title: string;
  executive_summary?: string;
  business_objectives?: string;
  stakeholders?: string[];
  functional_requirements?: string[];
  non_functional_requirements?: string[];
  assumptions?: string[];
  risks?: string[];
  timeline?: string[];
  success_metrics?: string[];
  version: number;
  status: 'draft' | 'approved' | 'published';
  created_at: string;
  updated_at: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

interface ProjectStore {
  projects: Project[];
  currentProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
}

interface RequirementStore {
  requirements: Requirement[];
  setRequirements: (requirements: Requirement[]) => void;
  addRequirement: (requirement: Requirement) => void;
}

interface SourceStore {
  sources: Source[];
  setSources: (sources: Source[]) => void;
  addSource: (source: Source) => void;
}

interface BRDStore {
  brd: BRDDocument | null;
  setBRD: (brd: BRDDocument | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  // Load from localStorage on initialization
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('auth_user');
    const savedToken = localStorage.getItem('auth_token');
    
    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser);
        set({ user, token: savedToken, isAuthenticated: true });
      } catch (e) {
        // Invalid stored data, clear it
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    }
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: (user) => {
      if (typeof window !== 'undefined') {
        if (user) {
          localStorage.setItem('auth_user', JSON.stringify(user));
        } else {
          localStorage.removeItem('auth_user');
        }
      }
      set({ user, isAuthenticated: !!user });
    },
    setToken: (token) => {
      if (typeof window !== 'undefined') {
        if (token) {
          localStorage.setItem('auth_token', token);
        } else {
          localStorage.removeItem('auth_token');
        }
      }
      set({ token });
    },
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
      set({ user: null, token: null, isAuthenticated: false });
    },
  };
});

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  currentProject: null,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (currentProject) => set({ currentProject }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
}));

export const useRequirementStore = create<RequirementStore>((set) => ({
  requirements: [],
  setRequirements: (requirements) => set({ requirements }),
  addRequirement: (requirement) => set((state) => ({ requirements: [requirement, ...state.requirements] })),
}));

export const useSourceStore = create<SourceStore>((set) => ({
  sources: [],
  setSources: (sources) => set({ sources }),
  addSource: (source) => set((state) => ({ sources: [source, ...state.sources] })),
}));

export const useBRDStore = create<BRDStore>((set) => ({
  brd: null,
  setBRD: (brd) => set({ brd }),
}));

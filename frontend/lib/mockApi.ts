// Mock API for local development without backend
import { User, Project, Requirement, Source, BRDDocument } from './store';

// Mock data
const mockUsers: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    email: 'demo@example.com',
    name: 'Demo User',
  },
};

const mockProjects: Record<string, Project> = {
  'proj-1': {
    id: 'proj-1',
    name: 'Mobile App Project',
    description: 'Building a new mobile banking application',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

const mockRequirements: Requirement[] = [
  {
    id: 'req-1',
    project_id: 'proj-1',
    requirement_type: 'functional',
    title: 'User Authentication',
    description: 'System must support OAuth 2.0 and email/password login',
    priority: 'high',
    status: 'approved',
    created_at: new Date().toISOString(),
  },
  {
    id: 'req-2',
    project_id: 'proj-1',
    requirement_type: 'non_functional',
    title: 'Performance',
    description: 'Response time must be under 200ms',
    priority: 'high',
    status: 'approved',
    created_at: new Date().toISOString(),
  },
  {
    id: 'req-3',
    project_id: 'proj-1',
    requirement_type: 'stakeholder',
    title: 'Product Manager',
    description: 'John Smith - Product Manager',
    priority: 'medium',
    status: 'draft',
    created_at: new Date().toISOString(),
  },
];

const mockSources: Source[] = [
  {
    id: 'src-1',
    project_id: 'proj-1',
    source_type: 'email',
    source_text: 'We need a mobile app with user authentication and payment processing',
    file_name: 'requirements-email.txt',
    created_at: new Date().toISOString(),
  },
];

const mockBRD: BRDDocument = {
  id: 'brd-1',
  project_id: 'proj-1',
  title: 'BRD - Mobile App Project',
  executive_summary: 'This document outlines the requirements for a new mobile banking application designed to provide users with secure access to their accounts and financial services.',
  business_objectives: '1. Enable online banking\n2. Improve customer experience\n3. Reduce operational costs\n4. Increase market share',
  stakeholders: ['Product Manager', 'Engineering Lead', 'Business Analyst', 'Finance Team'],
  functional_requirements: [
    'User authentication with OAuth 2.0',
    'Payment processing with multiple methods',
    'Real-time account balance',
    'Transaction history',
    'Fund transfers',
  ],
  non_functional_requirements: [
    'Response time < 200ms',
    '99.9% uptime',
    'Support 100,000 concurrent users',
    'PCI DSS compliance',
  ],
  assumptions: ['Budget approved', 'Team available', 'Third-party APIs reliable'],
  risks: ['Third-party API dependency', 'Security vulnerabilities', 'Market competition'],
  timeline: ['Phase 1 (4 weeks): Core functionality', 'Phase 2 (6 weeks): Advanced features'],
  success_metrics: ['99.9% uptime', '< 100ms response time', '50,000 active users'],
  version: 1,
  status: 'draft',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Mock API functions
export const mockAuthAPI = {
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: {
        user: mockUsers['user-1'],
        token: 'mock-token-' + Date.now(),
      },
    };
  },
  signup: async (email: string, name: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
    };
    return {
      data: {
        user: newUser,
        token: 'mock-token-' + Date.now(),
      },
    };
  },
};

export const mockProjectAPI = {
  list: async (userId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      data: Object.values(mockProjects),
    };
  },
  create: async (userId: string, name: string, description?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newProject: Project = {
      id: 'proj-' + Date.now(),
      name,
      description,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockProjects[newProject.id] = newProject;
    return { data: newProject };
  },
  get: async (projectId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: mockProjects[projectId] || mockProjects['proj-1'] };
  },
  update: async (projectId: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const project = mockProjects[projectId] || mockProjects['proj-1'];
    return { data: { ...project, ...data } };
  },
  delete: async (projectId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    delete mockProjects[projectId];
    return { data: { success: true } };
  },
};

export const mockIngestionAPI = {
  upload: async (projectId: string, sourceType: string, text?: string, file?: File) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newSource: Source = {
      id: 'src-' + Date.now(),
      project_id: projectId,
      source_type: sourceType as any,
      source_text: text || 'File content',
      file_name: file?.name,
      created_at: new Date().toISOString(),
    };
    mockSources.push(newSource);
    return { data: { source: newSource, requirements: mockRequirements } };
  },
  getSources: async (projectId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: mockSources.filter((s) => s.project_id === projectId) };
  },
  getSource: async (sourceId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: mockSources.find((s) => s.id === sourceId) };
  },
  deleteSource: async (sourceId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockSources.findIndex((s) => s.id === sourceId);
    if (index > -1) mockSources.splice(index, 1);
    return { data: { success: true } };
  },
};

export const mockRequirementAPI = {
  list: async (projectId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: mockRequirements.filter((r) => r.project_id === projectId) };
  },
  listByType: async (projectId: string, type: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      data: mockRequirements.filter((r) => r.project_id === projectId && r.requirement_type === type),
    };
  },
  update: async (requirementId: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const req = mockRequirements.find((r) => r.id === requirementId);
    if (req) Object.assign(req, data);
    return { data: req };
  },
  delete: async (requirementId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockRequirements.findIndex((r) => r.id === requirementId);
    if (index > -1) mockRequirements.splice(index, 1);
    return { data: { success: true } };
  },
};

export const mockBRDAPI = {
  generate: async (projectId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { data: mockBRD };
  },
  get: async (brdId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: mockBRD };
  },
  listByProject: async (projectId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: [mockBRD] };
  },
  editSection: async (brdId: string, sectionName: string, editRequest: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      data: {
        ...mockBRD,
        [sectionName]: `Updated ${sectionName} based on: ${editRequest}`,
      },
    };
  },
  delete: async (brdId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: { success: true } };
  },
};

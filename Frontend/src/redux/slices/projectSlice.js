// src/redux/slices/projectSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  projects: [
    {
      id: nanoid(),
      projectId: `PROJ-${nanoid(8).toUpperCase()}`,
      dateTime: new Date().toLocaleString(),
      clientId: 'CL-001',
      clientName: 'TCS',
      phone: '9876543210',
      email: 'tcs@example.com',
      companyName: 'Tata Consultancy Services',
      projectName: 'HR Management App',
      quotationId: 'QT-TCS-01',
      projectType: 'HR Software',
      projectDocumentation: null,
      server: 'YES',
      serverType: 'Cloud',
      developmentCost: 50000,
      serverCost: 10000,
      otherAccessories: true,
      otherAccessoriesCost: 5000,
      total: 65000,
      status: 'Complete',
    },
    {
      id: nanoid(),
      projectId: `PROJ-${nanoid(8).toUpperCase()}`,
      dateTime: new Date().toLocaleString(),
      clientId: 'CL-002',
      clientName: 'Amazon',
      phone: '9123456780',
      email: 'amazon@example.com',
      companyName: 'Amazon India',
      projectName: 'E-Commerce Website',
      quotationId: 'QT-AMZ-01',
      projectType: 'E-Commerce',
      projectDocumentation: null,
      server: 'YES',
      serverType: 'AWS',
      developmentCost: 70000,
      serverCost: 15000,
      otherAccessories: false,
      otherAccessoriesCost: 0,
      total: 85000,
      status: 'Pending',
    },
    {
      id: nanoid(),
      projectId: `PROJ-${nanoid(8).toUpperCase()}`,
      dateTime: new Date().toLocaleString(),
      clientId: 'CL-003',
      clientName: 'Reliance',
      phone: '9832109876',
      email: 'reliance@example.com',
      companyName: 'Reliance Industries',
      projectName: 'Inventory System',
      quotationId: 'QT-REL-01',
      projectType: 'ERP',
      projectDocumentation: null,
      server: 'NO',
      serverType: null,
      developmentCost: 40000,
      serverCost: 0,
      otherAccessories: false,
      otherAccessoriesCost: 0,
      total: 40000,
      status: 'Complete',
    },
    {
      id: nanoid(),
      projectId: `PROJ-${nanoid(8).toUpperCase()}`,
      dateTime: new Date().toLocaleString(),
      clientId: 'CL-004',
      clientName: 'HDFC Bank',
      phone: '9887654321',
      email: 'hdfc@example.com',
      companyName: 'HDFC Ltd.',
      projectName: 'Banking Portal',
      quotationId: 'QT-HDFC-01',
      projectType: 'Banking App',
      projectDocumentation: null,
      server: 'YES',
      serverType: 'Dedicated',
      developmentCost: 60000,
      serverCost: 20000,
      otherAccessories: true,
      otherAccessoriesCost: 5000,
      total: 85000,
      status: 'Pending',
    },
    {
      id: nanoid(),
      projectId: `PROJ-${nanoid(8).toUpperCase()}`,
      dateTime: new Date().toLocaleString(),
      clientId: 'CL-005',
      clientName: 'Infosys',
      phone: '9123087645',
      email: 'infosys@example.com',
      companyName: 'Infosys Ltd.',
      projectName: 'CRM System',
      quotationId: 'QT-INFY-01',
      projectType: 'CRM',
      projectDocumentation: null,
      server: 'NO',
      serverType: null,
      developmentCost: 55000,
      serverCost: 0,
      otherAccessories: false,
      otherAccessoriesCost: 0,
      total: 55000,
      status: 'Complete',
    },
    {
      id: nanoid(),
      projectId: `PROJ-${nanoid(8).toUpperCase()}`,
      dateTime: new Date().toLocaleString(),
      clientId: 'CL-006',
      clientName: 'ICICI Bank',
      phone: '9823456780',
      email: 'icici@example.com',
      companyName: 'ICICI Group',
      projectName: 'Mobile Banking App',
      quotationId: 'QT-ICICI-01',
      projectType: 'Mobile App',
      projectDocumentation: null,
      server: 'YES',
      serverType: 'Hybrid',
      developmentCost: 80000,
      serverCost: 25000,
      otherAccessories: true,
      otherAccessoriesCost: 3000,
      total: 108000,
      status: 'Pending',
    },
    {
      id: nanoid(),
      projectId: `PROJ-${nanoid(8).toUpperCase()}`,
      dateTime: new Date().toLocaleString(),
      clientId: 'CL-007',
      clientName: 'Flipkart',
      phone: '9789012345',
      email: 'flipkart@example.com',
      companyName: 'Flipkart Pvt Ltd',
      projectName: 'Vendor Management System',
      quotationId: 'QT-FLP-01',
      projectType: 'B2B System',
      projectDocumentation: null,
      server: 'YES',
      serverType: 'Virtual Private Server',
      developmentCost: 62000,
      serverCost: 18000,
      otherAccessories: false,
      otherAccessoriesCost: 0,
      total: 80000,
      status: 'Complete',
    },
  ],
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: {
      reducer(state, action) {
        state.projects.push(action.payload);
      },
      prepare(projectData) {
        const projectId = `PROJ-${nanoid(8).toUpperCase()}`;
        const dateTime = new Date().toLocaleString();
        const projectType =
          projectData.projectType === 'OTHER' && projectData.otherProjectType
            ? projectData.otherProjectType.trim()
            : projectData.projectType;

        const developmentCost = parseFloat(projectData.developmentCost || 0);
        const serverCost = parseFloat(projectData.serverCost || 0);
        const otherAccessoriesCost = parseFloat(projectData.otherAccessoriesCost || 0);
        const total = developmentCost + serverCost + otherAccessoriesCost;

        return {
          payload: {
            id: nanoid(),
            projectId,
            dateTime,
            clientId: projectData.clientId,
            clientName: projectData.clientName,
            phone: projectData.phone,
            email: projectData.email,
            companyName: projectData.companyName,
            projectName: projectData.projectName.trim(),
            quotationId: projectData.quotationId.trim(),
            projectType,
            projectDocumentation: projectData.projectDocumentation
              ? {
                  name: projectData.projectDocumentation.name,
                  size: projectData.projectDocumentation.size,
                  type: projectData.projectDocumentation.type,
                }
              : null,
            server: projectData.server,
            serverType: projectData.server === 'YES' ? projectData.serverType.trim() : null,
            developmentCost,
            serverCost,
            otherAccessories: projectData.otherAccessories,
            otherAccessoriesCost,
            total,
            status: 'Pending',
          },
        };
      },
    },

    updateProject: (state, action) => {
      const { id, updates } = action.payload;
      const existingProject = state.projects.find((project) => project.id === id);
      if (existingProject) {
        Object.assign(existingProject, updates);
        const devCost = parseFloat(
          updates.developmentCost !== undefined
            ? updates.developmentCost
            : existingProject.developmentCost || 0
        );
        const srvCost = parseFloat(
          updates.serverCost !== undefined
            ? updates.serverCost
            : existingProject.serverCost || 0
        );
        const otherAccCost = parseFloat(
          updates.otherAccessoriesCost !== undefined
            ? updates.otherAccessoriesCost
            : existingProject.otherAccessoriesCost || 0
        );
        existingProject.total = devCost + srvCost + otherAccCost;
      }
    },

    deleteProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },
  },
});

export const { addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
export const selectAllProjects = (state) => state.projects.projects;
export const selectProjectById = (state, id) =>
  state.projects.projects.find((project) => project.id === id);

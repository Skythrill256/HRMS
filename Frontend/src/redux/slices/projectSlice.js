import { createSlice, nanoid } from '@reduxjs/toolkit';



const projects = [
  {
    id: nanoid(),
    orderId: 'ORD001',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL001',
    clientName: 'Alice Smith',
    phone: '9876543210',
    email: 'contact@acmecorp.com',
    companyName: 'Acme Corp',
    projectName: 'Website Redesign',
    quotationId: 'QT-ACME-01',
    projectType: 'UI/UX + Web',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Shared Hosting',
    developmentCost: 30000,
    serverCost: 5000,
    otherAccessories: true,
    otherAccessoriesCost: 3000,
    total: 38000,
    status: 'Complete',
    generateWorkOrder: true
  },
  {
    id: nanoid(),
    orderId: 'ORD002',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL002',
    clientName: 'Amazon',
    phone: '9123456780',
    email: 'amazon@example.com',
    companyName: 'Amazon India',
    projectName: 'E-Commerce Platform',
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
    status: 'Production',
    generateWorkOrder: true
  },
  {
    id: nanoid(),
    orderId: 'ORD003',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL003',
    clientName: 'Reliance',
    phone: '9832109876',
    email: 'reliance@example.com',
    companyName: 'Reliance Industries',
    projectName: 'Inventory Tracker',
    quotationId: 'QT-REL-01',
    projectType: 'ERP System',
    projectDocumentation: null,
    server: 'NO',
    serverType: null,
    developmentCost: 40000,
    serverCost: 0,
    otherAccessories: false,
    otherAccessoriesCost: 0,
    total: 40000,
    status: 'pending',
    generateWorkOrder: true
  },
  {
    id: nanoid(),
    orderId: 'ORD004',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL004',
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
    generateWorkOrder: false
  },
  {
    id: nanoid(),
    orderId: 'ORD005',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL005',
    clientName: 'Infosys',
    phone: '9123087645',
    email: 'infosys@example.com',
    companyName: 'Infosys Ltd.',
    projectName: 'CRM Platform',
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
    generateWorkOrder: true
  },
  {
    id: nanoid(),
    orderId: 'ORD006',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL006',
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
    generateWorkOrder: true
  },
  {
    id: nanoid(),
    orderId: 'ORD007',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL007',
    clientName: 'Flipkart',
    phone: '9789012345',
    email: 'flipkart@example.com',
    companyName: 'Flipkart Pvt Ltd',
    projectName: 'Vendor Management System',
    quotationId: 'QT-FLP-01',
    projectType: 'B2B System',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'VPS',
    developmentCost: 62000,
    serverCost: 18000,
    otherAccessories: false,
    otherAccessoriesCost: 0,
    total: 80000,
    status: 'Complete',
    generateWorkOrder: true
  },

  {
    id: nanoid(),
    orderId: 'ORD008',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL008',
    clientName: 'Capgemini',
    phone: '9876512345',
    email: 'contact@capgemini.com',
    companyName: 'Capgemini India',
    projectName: 'ERP Integration',
    quotationId: 'QT-CAP-01',
    projectType: 'Integration',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Cloud',
    developmentCost: 90000,
    serverCost: 20000,
    otherAccessories: true,
    otherAccessoriesCost: 7000,
    total: 117000,
    status: 'Production',
    generateWorkOrder: true
  },
  {
    id: nanoid(),
    orderId: 'ORD009',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL009',
    clientName: 'Wipro',
    phone: '9123498765',
    email: 'info@wipro.com',
    companyName: 'Wipro Limited',
    projectName: 'Data Analytics Dashboard',
    quotationId: 'QT-WIP-01',
    projectType: 'Business Intelligence',
    projectDocumentation: null,
    server: 'NO',
    serverType: null,
    developmentCost: 65000,
    serverCost: 0,
    otherAccessories: false,
    otherAccessoriesCost: 0,
    total: 65000,
    status: 'On Hold',
    generateWorkOrder: false
  },
  {
    id: nanoid(),
    orderId: 'ORD010',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL010',
    clientName: 'Tech Mahindra',
    phone: '9876554321',
    email: 'sales@techm.com',
    companyName: 'Tech Mahindra Ltd.',
    projectName: 'AI Chatbot Development',
    quotationId: 'QT-TM-01',
    projectType: 'AI/ML',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Serverless',
    developmentCost: 110000,
    serverCost: 10000,
    otherAccessories: true,
    otherAccessoriesCost: 4000,
    total: 124000,
    status: 'Pending',
    generateWorkOrder: false
  },
  {
    id: nanoid(),
    orderId: 'ORD011',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL011',
    clientName: 'Cognizant',
    phone: '9123411223',
    email: 'marketing@cognizant.com',
    companyName: 'Cognizant Technology Solutions',
    projectName: 'Digital Transformation Strategy',
    quotationId: 'QT-COG-01',
    projectType: 'Consulting',
    projectDocumentation: null,
    server: 'NO',
    serverType: null,
    developmentCost: 75000,
    serverCost: 0,
    otherAccessories: false,
    otherAccessoriesCost: 0,
    total: 75000,
    status: 'Cancelled',
    generateWorkOrder: false
  },
  {
    id: nanoid(),
    orderId: 'ORD012',
    projectId: `PROJ-${nanoid(8).toUpperCase()}`,
    dateTime: new Date().toLocaleString(),
    clientId: 'CL012',
    clientName: 'HCLTech',
    phone: '9809876543',
    email: 'contact@hcltech.com',
    companyName: 'HCLTech Limited',
    projectName: 'Cloud Migration',
    quotationId: 'QT-HCL-01',
    projectType: 'Cloud Services',
    projectDocumentation: null,
    server: 'YES',
    serverType: 'Hybrid Cloud',
    developmentCost: 130000,
    serverCost: 30000,
    otherAccessories: true,
    otherAccessoriesCost: 8000,
    total: 168000,
    status: 'Complete',
    generateWorkOrder: true
  },

]
const initialState = {
  projects,
}

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

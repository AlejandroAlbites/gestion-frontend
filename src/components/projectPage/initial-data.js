const initialData = {
  technicals: {
    "tech-1": { id: "tech-1", name: "tecnico 1" },
    "tech-2": { id: "tech-2", name: "tecnico 2" },
    "tech-3": { id: "tech-3", name: "tecnico 3" },
    "tech-4": { id: "tech-4", name: "tecnico 4" },
    "tech-5": { id: "tech-5", name: "tecnico 5" },
    "tech-6": { id: "tech-6", name: "tecnico 6" },
  },
  groups: {
    "group-1": {
      id: "group-1",
      title: "Lista de personal",
      score: [],
      works: [],
      techIds: ["tech-1", "tech-2", "tech-3", "tech-4", "tech-5", "tech-6"],
    },
    "group-2": {
      id: "group-2",
      title: "Grupo 1",
      score: [],
      works: [],
      techIds: [],
    },
    "group-3": {
      id: "group-3",
      title: "Grupo 2",
      score: [],
      works: [],
      techIds: [],
    },
  },
  // Facilitate reordering of the columns
  status: {
    "status-1": {
      id: "status-1",
      title: "En espera",
      groupsIds: ["group-1", "group-2", "group-3"],
    },
    "status-2": {
      id: "status-2",
      title: "En ejecución",
      groupsIds: [],
    },
  },
  // Facilitate reordering of the status
  statusOrder: ["status-1", "status-2"],
};

export default initialData;

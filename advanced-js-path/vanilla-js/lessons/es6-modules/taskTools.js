// ////////////////////////////////////////////////////////////////////////////

// example 6: aliases
const createTaskItem = (desc) => ({ id: Date.now(), desc });

export { createTaskItem as makeTask };

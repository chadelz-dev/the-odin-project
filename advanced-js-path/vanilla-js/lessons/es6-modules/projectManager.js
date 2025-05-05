// ////////////////////////////////////////////////////////////////////////////

// example 8: entry point and dependency graph
import { createProject } from './projectUtils.js';

export const projectList = [];
export const addProject = (name) => projectList.push(createProject(name));

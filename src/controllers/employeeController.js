import * as employeeApi from "../models/api/employeeApi";
import Employee from "../models/entities/Employee";

export async function getAllEmployees() {
  const docs = await employeeApi.getAllEmployees();
  return docs.map((d) => new Employee(d));
}

export async function getEmployeeById(id) {
  const data = await employeeApi.getEmployeeById(id);
  return data ? new Employee(data) : null;
}

export async function addEmployee(employeeData) {
  const employee = new Employee(employeeData);
  return await employeeApi.createEmployee(employee);
}

export async function updateEmployee(id, updates) {
  return await employeeApi.updateEmployee(id, updates);
}

export async function deleteEmployee(id) {
  return await employeeApi.deleteEmployee(id);
}

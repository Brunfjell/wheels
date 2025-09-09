import * as vehicleApi from "../models/api/vehicleApi";
import Vehicle from "../models/entities/Vehicle";

export async function getAllVehicles() {
  const docs = await vehicleApi.getAllVehicles();
  return docs.map((d) => new Vehicle(d));
}

export async function getVehicleById(id) {
  const data = await vehicleApi.getVehicleById(id);
  return data ? new Vehicle(data) : null;
}

export async function addVehicle(vehicleData) {
  const vehicle = new Vehicle(vehicleData);
  return await vehicleApi.createVehicle(vehicle);
}

export async function updateVehicle(id, updates) {
  return await vehicleApi.updateVehicle(id, updates);
}

export async function deleteVehicle(id) {
  return await vehicleApi.deleteVehicle(id);
}

import * as driverApi from "../models/api/driverApi";
import Driver from "../models/entities/Driver";

export async function getAllDrivers() {
  const docs = await driverApi.getAllDrivers();
  return docs.map((d) => new Driver(d));
}

export async function getDriverById(id) {
  const data = await driverApi.getDriverById(id);
  return data ? new Driver(data) : null;
}

export async function addDriver(driverData) {
  const driver = new Driver(driverData);
  return await driverApi.createDriver(driver);
}

export async function updateDriver(id, updates) {
  return await driverApi.updateDriver(id, updates);
}

export async function deleteDriver(id) {
  return await driverApi.deleteDriver(id);
}

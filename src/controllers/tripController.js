import * as tripApi from "../models/api/tripApi";
import Trip from "../models/entities/Trip";

export async function getAllTrips() {
  const docs = await tripApi.getAllTrips();
  return docs.map((d) => new Trip(d));
}

export async function getTripById(id) {
  const data = await tripApi.getTripById(id);
  return data ? new Trip(data) : null;
}

export async function addTrip(tripData) {
  const trip = new Trip(tripData);
  return await tripApi.createTrip(trip);
}

export async function updateTrip(id, updates) {
  return await tripApi.updateTrip(id, updates);
}

export async function deleteTrip(id) {
  return await tripApi.deleteTrip(id);
}

export async function addStop(tripId, stop) {
  return await tripApi.addStop(tripId, stop);
}

export async function addTripExpense(tripId, expense) {
  return await tripApi.addTripExpense(tripId, expense);
}

export async function endTrip(tripId, report) {
  return await tripApi.endTrip(tripId, report);
}

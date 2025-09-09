import * as scheduleApi from "../models/api/scheduleApi";
import Schedule from "../models/entities/Schedule";

export async function getAllSchedules() {
  const docs = await scheduleApi.getAllSchedules();
  return docs.map((d) => new Schedule(d));
}

export async function getScheduleById(id) {
  const data = await scheduleApi.getScheduleById(id);
  return data ? new Schedule(data) : null;
}

export async function addSchedule(scheduleData) {
  const schedule = new Schedule(scheduleData);
  return await scheduleApi.createSchedule(schedule);
}

export async function updateSchedule(id, updates) {
  return await scheduleApi.updateSchedule(id, updates);
}

export async function deleteSchedule(id) {
  return await scheduleApi.deleteSchedule(id);
}

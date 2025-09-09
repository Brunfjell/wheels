export default class Schedule {
  constructor({
    id = null,
    date = new Date(),
    time = "",
    vehicleId = "",
    driverId = "",
    employeeId = "",
    destination = "",
    status = "pending", // "pending" | "approved" | "completed"
    createdAt = new Date(),
  }) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.vehicleId = vehicleId;
    this.driverId = driverId;
    this.employeeId = employeeId;
    this.destination = destination;
    this.status = status;
    this.createdAt = createdAt;
  }
}

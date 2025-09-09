export default class Trip {
  constructor({
    id = null,
    employeeId = "",
    driverId = "",
    vehicleId = "",
    startTime = new Date(),
    endTime = null,
    status = "pending", // choose between "pending" | "active" | "completed"
    destination = "",
    stops = [], // needs reason and time 
    expenses = [], // needs type, amount, and time 
    report = "",
    createdAt = new Date(),
  }) {
    this.id = id;
    this.employeeId = employeeId;
    this.driverId = driverId;
    this.vehicleId = vehicleId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.destination = destination;
    this.stops = stops;
    this.expenses = expenses;
    this.report = report;
    this.createdAt = createdAt;
  }
}

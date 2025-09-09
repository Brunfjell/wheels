export default class Vehicle {
  constructor({
    id = null,
    plate = "",
    type = "",
    status = "active", // always choose between "active" | "in_repair" | "retired" walang parang toggle sa firestore
    assignedDriver = null,
    createdAt = new Date(),
  }) {
    this.id = id;
    this.plate = plate;
    this.type = type;
    this.status = status;
    this.assignedDriver = assignedDriver;
    this.createdAt = createdAt;
  }
}

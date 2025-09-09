export default class Driver {
  constructor({
    id = null,
    userId = "",
    name = "",
    licenseNo = "",
    assignedVehicle = null,
    active = true,
    createdAt = new Date(),
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.licenseNo = licenseNo;
    this.assignedVehicle = assignedVehicle;
    this.active = active;
    this.createdAt = createdAt;
  }
}

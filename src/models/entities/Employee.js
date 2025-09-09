export default class Employee {
  constructor({
    id = null,
    userId = "",
    name = "",
    department = "",
    active = true,
    createdAt = new Date(),
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.department = department;
    this.active = active;
    this.createdAt = createdAt;
  }
}

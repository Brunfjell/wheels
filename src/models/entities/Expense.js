export default class Expense {
  constructor({
    id = null,
    tripId = "",
    userId = "",
    type = "", // "fuel" | "maintenance" | "other"
    amount = 0,
    description = "",
    createdAt = new Date(),
  }) {
    this.id = id;
    this.tripId = tripId;
    this.userId = userId;
    this.type = type;
    this.amount = amount;
    this.description = description;
    this.createdAt = createdAt;
  }
}

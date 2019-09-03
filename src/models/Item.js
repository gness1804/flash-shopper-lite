class Item {
  constructor(opts) {
    this.name = opts.name;
    this.aisle = opts.aisle;
    this.quantity = opts.quantity;
    this.note = opts.note;
    this.id = Date.now();
  }
}

export default Item;

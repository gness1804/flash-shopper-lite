class Item {
  constructor(opts) {
    this.name = opts.name;
    this.aisle = opts.aisle;
    this.quantity = opts.quantity;
    this.note = opts.note;
    this.inCart = opts.inCart || false;
    this.id = Date.now();
  }
}

export default Item;

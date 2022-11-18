const LinkList = require("./index");

const data = [
  {
    id: 1,
    name: "item 1",
    parent_id: 5,
  },
  {
    id: 4,
    name: "item 4",
    parent_id: 2,
  },
  {
    id: 5,
    name: "item 5",
    parent_id: null,
  },
  {
    id: 2,
    name: "item 2",
    parent_id: 1,
  },
];

const list = new LinkList(data);

console.log("get full array", list.toArray());
console.log("get array from item[id] = 2 to end", list.toArray(2));
console.log("get array from head to item[id] = 2", list.toArray(0, 2));
console.log("get array with deep = 2", list.toArray(null, null, 2));

list.add({ id: 6, name: "item 6", parent_id: 4 });
console.log("add item to after item[id] = 4", list.toArray());

list.delete(6);
console.log("delete item item[id] = 6", list.toArray());

list.update({ id: 4, name: "item 4", parent_id: 1 });
console.log("update item item[id] = 4", list.toArray());

list.append({ id: 10, name: "item 10" });
console.log("append item", list.toArray());

list.prepend({ id: 11, name: "item 11" });
console.log("prepend item", list.toArray());

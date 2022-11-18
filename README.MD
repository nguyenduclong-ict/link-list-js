# Simple Link List

Javascript Implementation of Singly Linked List

### Installation

```Installation
npm install link-list-js
```

### Example

```javascript
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
```

### Get full Array

```javascript
list.toArray();
// output
result = [
  { id: 5, name: "item 5", parent_id: null },
  { id: 1, name: "item 1", parent_id: 5 },
  { id: 2, name: "item 2", parent_id: 1 },
  { id: 4, name: "item 4", parent_id: 2 },
];
```

### Get array from item[id] = 2 to end

```javascript
list.toArray(2);
// output
result = [
  { id: 2, name: "item 2", parent_id: 1 },
  { id: 4, name: "item 4", parent_id: 2 },
];
```

### Get array from head to item[id] = 2

```javascript
list.toArray(0, 2);
// output
result = [
  { id: 5, name: "item 5", parent_id: null },
  { id: 1, name: "item 1", parent_id: 5 },
  { id: 2, name: "item 2", parent_id: 1 },
];
```

### Get array with deep = 2

```javascript
list.toArray(null, null, 2);
// output
result = [
  { id: 5, name: "item 5", parent_id: null },
  { id: 1, name: "item 1", parent_id: 5 },
];
```

### Add item to after item[id] = 4

```javascript
list.add({ id: 6, name: "item 6", parent_id: 4 });
// output
result = [
  { id: 5, name: "item 5", parent_id: null },
  { id: 1, name: "item 1", parent_id: 5 },
  { id: 2, name: "item 2", parent_id: 1 },
  { id: 4, name: "item 4", parent_id: 2 },
  { id: 6, name: "item 6", parent_id: 4 },
];
```

### Delete item item[id] = 6

```javascript
list.delete(6);
// output
result = [
  { id: 5, name: "item 5", parent_id: null },
  { id: 1, name: "item 1", parent_id: 5 },
  { id: 2, name: "item 2", parent_id: 1 },
  { id: 4, name: "item 4", parent_id: 2 },
];
```

### Update item item[id] = 4

```javascript
list.update({ id: 4, name: "item 4", parent_id: 1 });
// output
result = [
  { id: 5, name: "item 5", parent_id: null },
  { id: 1, name: "item 1", parent_id: 5 },
  { id: 4, name: "item 4", parent_id: 1 },
];
```

### Append item

```javascript
list.append({ id: 10, name: "item 10" });
// output
result = [
  { id: 5, name: "item 5", parent_id: null },
  { id: 1, name: "item 1", parent_id: 5 },
  { id: 4, name: "item 4", parent_id: 1 },
  { id: 10, name: "item 10", parent_id: 4 }, // item appeded
];
```

### Prepend item

```javascript
list.prepend({ id: 11, name: "item 11" });
// output
result = [
  { id: 11, name: "item 11", parent_id: null }, // item added
  { id: 5, name: "item 5", parent_id: 11 },
  { id: 1, name: "item 1", parent_id: 5 },
  { id: 4, name: "item 4", parent_id: 1 },
  { id: 10, name: "item 10", parent_id: 4 },
];
```

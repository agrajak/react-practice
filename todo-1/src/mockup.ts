const now = +new Date();
export const mockupData = [
  {
    id: 1,
    content: "my first todo",
    addedAt: new Date(now - 20000),
  },
  {
    id: 2,
    content: "my second todo",
    addedAt: new Date(now - 10000),
  },
  {
    id: 3,
    content: "my third todo",
    addedAt: new Date(now - 5000),
  },
];

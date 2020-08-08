const now = +new Date();
export const mockupData = [
  {
    id: 1,
    contents: "my first todo",
    addedAt: new Date(now - 20000),
  },
  {
    id: 2,
    contents: "my second todo",
    addedAt: new Date(now - 10000),
  },
];

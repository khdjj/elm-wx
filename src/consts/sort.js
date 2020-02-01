const sortTypes = [
  "综合排序",
  "好评优先",
  "销量最高",
  "起送价最低",
  "配送最快",
  "配送费最低",
  "人均从低到高",
  "从远的从高到低",
  "通用排序"
];

const sortItems = [
  {
    key: "综合排序",
    index: 1,
    order: 0
  },
  {
    key: "好评优先",
    index: 2,
    order: 7
  },
  {
    key: "销量最高",
    index: 3,
    order: 6
  },
  {
    key: "起送价最低",
    index: 4,
    order: 1
  },
  {
    key: "配送最快",
    index: 5,
    order: 2
  },
  {
    key: "配送费最低",
    index: 6,
    order: 9
  },
  {
    key: "人均从低到高",
    index: 7,
    order: 10
  },
  {
    key: "从远的从高到低",
    index: 8,
    order: 11
  },
  {
    key: "通用排序",
    index: 9,
    order: 12
  }
];
const sortMap = {};

sortItems.forEach((item, index) => {
  sortMap[item.index] = item;
});

export { sortTypes, sortItems };

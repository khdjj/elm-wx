import { observable } from "mobx";
import { floatAdd, floatSub } from "@/service/utils";

const store = observable({
  foodItem: [],
  price: 0,
  isAllowDelivery: false,
  difference: 0, //差额

  async saveShopingCart(data) {
    const { food, minimunAmount = 0 } = data;
    const nFoodItem = [...this.foodItem];
    let nPrice = 0;
    const index = nFoodItem.findIndex(f => f.item_id === food.item_id);
    if (index === -1) {
      nFoodItem.push({ ...food, num: 1, fprice: food.lowest_price });
    } else {
      nFoodItem[index].num += 1;
      nFoodItem[index].fprice = floatAdd(
        nFoodItem[index].fprice,
        food.lowest_price
      );
      nPrice = floatAdd(this.price,food.lowest_price);
    }
    nFoodItem.forEach(food => {
      nPrice = floatAdd(nPrice, food.lowest_price);
    });

    this.price = nPrice;
    this.foodItem = nFoodItem;
    this.isAllowDelivery = nPrice > minimunAmount;
    this.difference = floatSub(nPrice, minimunAmount);
    console.error(
      this.price,
      this.foodItem,
      this.isAllowDelivery,
      minimunAmount
    );
  },
  async addOrDeleteFoodItem(data) {
    const { type, food } = data;
    let nPrice = this.price;
    if (type === "add") {
      this.foodItem.forEach(f => {
        if (f.item_id === food.item_id) {
          f.num += 1;
          nPrice = floatAdd(nPrice, f.lowest_price);
          f.fprice = floatAdd(f.fprice, f.lowest_price);
        }
      });
    } else if (type === "delete") {
      this.foodItem.forEach((f, index) => {
        if (f.item_id === food.item_id) {
          if (f.num === 1) {
            this.foodItem.splice(index, 1);
          } else {
            f.num -= 1;
            f.fprice = floatSub(f.fprice, f.lowest_price);
          }
          nPrice = floatSub(nPrice, f.lowest_price);
        }
      });
    }
    if (this.price < 0) {
      this.price = 0;
    } else {
      this.price = nPrice;
    }
    console.error(this.foodItem);
  }
});

export default store;

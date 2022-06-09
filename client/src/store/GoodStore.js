import { makeAutoObservable } from "mobx";
export default class GoodStore {
  constructor() {
    this._types = [
      { id: 1, name: "Морозиво" },
      { id: 2, name: "Кола" },
    ];
    this._brands = [
      { id: 1, name: "Ласунка" },
      { id: 2, name: "ПепсіКо" },
    ];
    this._goods = [
      { id: 1, name: "Морозиво", price: 100, type: 1, brand: 1, rating: 5 },
      { id: 2, name: "Кола", price: 200, type: 2, brand: 2, rating: 4 },
    ];
    makeAutoObservable(this);
  }

  get types() {
    return this._types;
  }
  setTypes(value) {
    this._types = value;
  }

  get brands() {
    return this._brands;
  }
  setBrands(value) {
    this._brands = value;
  }

  get goods() {
    return this._goods;
  }
  setGoods(value) {
    this._goods = value;
  }
}

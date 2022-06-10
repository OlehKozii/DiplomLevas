import { makeAutoObservable } from "mobx";
export default class GoodStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._goods = [];
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

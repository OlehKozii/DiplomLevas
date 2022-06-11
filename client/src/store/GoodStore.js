import { makeAutoObservable } from "mobx";
import { makePersistable, getPersistedStore } from "mobx-persist-store";

export default class GoodStore {
  constructor() {
    this._id = '';
    this._types = [];
    this._brands = [];
    this._goods = [];
    makeAutoObservable(this);
    makePersistable(this, {
      name: "GoodStore",
      properties: ['_id'],
      storage: window.localStorage
    });
  }

  get id() {
    return this._id;
  }
  setId(value) {
    this._id = value;
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

  async getStoredData() {
    return getPersistedStore(this);
  }
}

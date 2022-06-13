import { makeAutoObservable } from "mobx";
import { makePersistable, getPersistedStore } from "mobx-persist-store";

export default class GoodStore {
  constructor() {
    this._id = '';
    this._name = '';
    this._image = '';
    this._typeID = '';
    this._price = null;
    this._state = '';
    this._types = [];
    this._brands = [];
    this._goods = [];
    makeAutoObservable(this);
    makePersistable(this, {
      name: "GoodStore",
      properties: ['_id', '_image', '_name', '_typeID', '_price', '_state'],
      storage: window.localStorage
    });
  }

  get id() {
    return this._id;
  }
  setId(value) {
    this._id = value;
  }

  get image() {
    return this._image
  }
  setImage(value) {
    this._image = value;
  }

  get name() {
    return this._name
  }
  setName(value) {
    this._name = value;
  }

  get typeID() {
    return this._typeID
  }
  setTypeID(value) {
    this._typeID = value;
  }

  get price() {
    return this._price
  }
  setPrice(value) {
    this._price = value;
  }

  get state() {
    return this._state
  }
  setState(value) {
    this._state = value;
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

import { makeAutoObservable } from "mobx";
import { makePersistable, getPersistedStore } from "mobx-persist-store";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UserStore",
      properties: ['_user'],
      storage: window.localStorage
    });
  }

  get isAuth() {
    return this._isAuth;
  }
  setIsAuth(value) {
    this._isAuth = value;
  }

  get user() {
    return this._user;
  }
  setUser(value) {
    this._user = value;
  }

  async getStoredData() {
    return getPersistedStore(this);
  }
}

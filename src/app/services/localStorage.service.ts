import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  setKey(keyName: string, token: string) {
    localStorage.setItem(keyName, token);
  }

  getKeyData(keyName: string) {
    return localStorage.getItem(keyName);
  }

  removeKeyData(keyName: string) {
    localStorage.removeItem(keyName);
  }

  removeAllKeysData() {
    localStorage.clear();
  }
}
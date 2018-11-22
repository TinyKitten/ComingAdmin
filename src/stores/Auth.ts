import {
  action,
  observable,
} from 'mobx';
import IAuthSuccess from '../models/AuthSuccess';

const API_URL = 'https://cs.tinykitten.me/v1';

export enum AuthError {
  ERR_INTERNAL_SERVER_ERROR = 1,
  ERR_UNAUTHORIZED,
}

export interface IAuthStore {
  token: string;
  error: Error | null;
  getToken(screenName: string, password: string): Promise<AuthError | void>;
}

export default class AuthStore {
  @observable public token: string = '';
  @observable public error: Error | null = null;

  @action.bound
    public async getToken(screenName: string, password: string): Promise<AuthError | void> {
      const url = `${API_URL}/auth`;
      const method = 'POST';
      const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
      const body = JSON.stringify({ password, screen_name: screenName });
      const res = await fetch(url, { method, headers, body })
      .catch((err) => {
        this.error = err;
      });
      if (res) {
      if (res.status === 401 || res.status === 400) {
        return Promise.reject(AuthError.ERR_UNAUTHORIZED);
      }
      if (res.status !== 200) {
        return Promise.reject(AuthError.ERR_INTERNAL_SERVER_ERROR);
      }
      const json = await res.json() as IAuthSuccess;
      const token = json.token;
      this.token = token;
    }
      return Promise.resolve();
  }
}

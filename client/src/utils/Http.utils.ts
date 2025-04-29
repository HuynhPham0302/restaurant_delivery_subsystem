/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';

export type TResponse<T> = {
  status: string;
  status_code: number;
  message: string;
  metadata: T;
  total: number;
};

class HTTP {
  private baseURL: string = import.meta.env.VITE_BACKEND_URL + '/v1/api';
  private token: string | null = Cookies.get('token') || null;

  async GET<T>(url: string) {
    return await fetch(this.baseURL + url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json() as Promise<T>);
  }

  async POST<T>(url: string, data: any) {
    return await fetch(this.baseURL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json() as Promise<T>);
  }

  async PUT<T>(url: string, data: any) {
    return await fetch(this.baseURL + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json() as Promise<T>);
  }

  async PATCH<T>(url: string, data: any) {
    return await fetch(this.baseURL + url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json() as Promise<T>);
  }

  async DELETE<T>(url: string) {
    return await fetch(this.baseURL + url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json() as Promise<T>);
  }
}

export default new HTTP();

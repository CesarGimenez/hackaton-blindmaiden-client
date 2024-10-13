export interface User {
    id: number;
    name: string;
    email: string;
    type: string;
    active: boolean;
}

export interface UserEdit {
    id: number;
    name: string;
    email: string;
    type: string;
    active: boolean;
    username: string;
    password: string;
  }
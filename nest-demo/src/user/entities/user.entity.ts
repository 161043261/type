import { IMenuItem } from "src/types";

export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public avatar: string, // base64
    public auths: string,
    public nickname: string,
    public menuList: IMenuItem[]
  ) {}
}

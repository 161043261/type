export class Robot {
  id: number;
  name: string;
  address: string;
  state:
    | 1 // 闲置
    | 2 // 使用
    | 3 // 故障
    | 4 // 维修
    | 5; // 报废
  failureNum: number;
  admin: string;
  email: string;
}

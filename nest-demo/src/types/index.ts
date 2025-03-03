export interface IMenuItem {
  name: string;
  url: string;
  icon: string;
  children?: IMenuItem[];
}

export interface IResData {
  code: number;
  message: string;
}

export interface ILoginResData {
  data?: {
    token: string;
    user: {
      nickname: string;
      auths: string[];
    };
    menuList: IMenuItem;
  };
}

export interface IChartData {
  data: {
    value: number;
    name: string;
  }[];
}

export interface IChartData2 {
  data: {
    name: string;
    dataArr: number[];
  }[];
}

export interface IChartData3 {
  data: [number, number, number, number, number];
}

export interface ICountryList {
  data: {
    id: number;
    address: string;
    revenue?: number;
  }[];
}

export type IRobotList = {
  data: {
    id: number;
    address: string;
    name: string;
    state: /* 1 | 2 | 3 | 4 | 5 */ number;
    failureNum: number;
    admin: string;
    email: string;
  }[];
};

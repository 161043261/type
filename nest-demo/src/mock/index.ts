import mockjs from 'mockjs';
import type { ICountryList, IRobotList } from '../types';
import { randNum } from '../utils';
type ICountryListData = ICountryList['data'];

const mockCountryList = (
  amount: number,
): {
  countryList: ICountryListData;
} => {
  return {
    countryList: Array.from({ length: amount })
      .fill({})
      .map((item, idx) => ({
        id: idx + 1,
        address: mockjs.Random.county(),
      })),
  };
};

const mockRobotList = (amount: number): IRobotList['data'] => {
  return Array.from({ length: amount })
    .fill({
      // id: 0,
      // address: '',
      // name: '',
      // state: 1,
      // failureNum: 0,
      // admin: '',
      // email: '',
    })
    .map((item, idx) => ({
      id: idx + 1,
      name: mockjs.Random.word(),
      address: mockjs.Random.county(),
      state: randNum(0, 5) + 1,
      failureNum: randNum(0, 20),
      admin: mockjs.Random.cname(),
      email: mockjs.Random.email(),
    }));
};

export { mockCountryList, mockRobotList };

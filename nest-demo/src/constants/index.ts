// import adminMenu from '../assets/admin_menu.json'
// import userMenu from '../assets/user_menu.json'
import path from 'node:path';
import fs from 'node:fs';
import { IMenuItem } from 'src/types';

const adminMenuFilepath = path.resolve(__dirname, '../assets/admin_menu.json');
const userMenuFilepath = path.resolve(__dirname, '../assets/user_menu.json');
const adminMenuJsonStr = fs.readFileSync(adminMenuFilepath, 'utf8');
const userMenuJsonStr = fs.readFileSync(userMenuFilepath, 'utf8');
const adminMenu = JSON.parse(adminMenuJsonStr) as IMenuItem;
const userMenu = JSON.parse(userMenuJsonStr) as IMenuItem;

export const enum Api {
  Login = '/login',
  ChartData = '/chartData',
  ChartData2 = '/chartData2',
  ChartData3 = '/chartData3',
  CountryList = '/countryList',
  RobotQuery = '/robotQuery',
  RobotAdd = '/robotAdd',
  RobotDelete = '/robotDelete',
  RobotUpdate = '/robotUpdate',
}

export { adminMenu, userMenu };

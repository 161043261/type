import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  langs: string[] = [];
  dateStr: string = '';
  setLangs(langs: string[]) {
    this.langs = langs;
  }
  getLangs(): string[] {
    return this.langs;
  }
}

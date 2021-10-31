import { Injectable } from '@angular/core';
import * as rtlDetect from 'rtl-detect';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language: string = 'en';
  rtl: string = '';
  is_rtl: boolean = false;
  constructor() {
    this.language = window.document.getElementsByTagName('html')[0].lang;
    this.rtl = rtlDetect.getLangDir(this.language);
    this.is_rtl = this.rtl === 'rtl' ? true : false;
    window.document.dir = this.rtl;
  }
}

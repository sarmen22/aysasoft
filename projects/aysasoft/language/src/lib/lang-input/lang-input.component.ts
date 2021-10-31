import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LanguageService } from '../language.service';
import * as _ from 'lodash';

@Component({
  selector: 'lang-input',
  templateUrl: './lang-input.component.html',
  styleUrls: ['./lang-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LangInputComponent,
    },
  ],
})
export class LangInputComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('ULList') ULList!: ElementRef<HTMLUListElement>;
  @ViewChild('LangInput') LangInput!: ElementRef<HTMLInputElement>;

  @Input() Caption: string = '';
  @Input() Name: string = '';
  @Input() Langs?: { caption: string; value: string; selected?: boolean }[] = [
    { caption: 'AM', value: 'am' },
    { caption: 'EN', value: 'en', selected: true },
    { caption: 'FA', value: 'fa' },
    { caption: 'RU', value: 'ru' },
  ];

  onTouched: Function = () => {};
  onChange = (result: any) => {};

  selectedlang:
    | { caption: string; value: string; selected?: boolean }
    | undefined;
  valueLang: any;

  constructor() {
    this.Langs?.forEach((lang) => {
      if (lang.selected) {
        this.selectedlang = { ...lang };
      }
    });
  }

  onChangeLang(lang: string) {
    this.selectedlang = this.Langs?.filter((x) => x.caption === lang)[0];
    const LangList = this.ULList.nativeElement.children;
    for (let i = 0; i < LangList.length; i++) {
      const langli = LangList.item(i);
      const langlink = langli?.firstChild as HTMLLinkElement;
      langlink.classList.remove('active');
      if (langlink.innerText == lang) {
        langlink.classList.add('active');
      }
    }

    if (this.valueLang && this.selectedlang) {
      const sl = this.selectedlang.value;
      const vl = this.valueLang[sl];
      if (vl) {
        this.LangInput.nativeElement.value = vl;
      } else {
        this.LangInput.nativeElement.value = '';
      }
    }
  }

  onSaveClick() {
    const lo = this.selectedlang?.value as string;
    const val = this.LangInput.nativeElement.value;
    if (_.has(this.valueLang, lo)) {
      this.valueLang[lo] = val;
    } else {
      this.valueLang = { ...this.valueLang, [lo]: val };
    }
    this.onChange(this.valueLang);
  }

  ngAfterViewInit(): void {
    if (this.valueLang && this.selectedlang) {
      const sl = this.selectedlang.value;
      const vl = this.valueLang[sl];
      if (vl) {
        this.LangInput.nativeElement.value = vl;
      } else {
        this.LangInput.nativeElement.value = '';
      }
    }
  }

  writeValue(value: any) {
    if (value) {
      this.valueLang = { ...value };
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}

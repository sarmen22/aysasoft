import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import * as _ from 'lodash';
import { of, Subscription } from 'rxjs';

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
export class LangInputComponent implements ControlValueAccessor {
  @ViewChild('ULList') ULList!: ElementRef<HTMLUListElement>;

  @Input() Caption: string = '';
  @Input() Name: string = '';
  @Input() Langs?: { caption: string; value: string; selected?: boolean }[] = [
    { caption: 'AM', value: 'am' },
    { caption: 'EN', value: 'en', selected: true },
    { caption: 'FA', value: 'fa' },
  ];

  inputA: FormGroup = this.fb.group({
    name: [],
  });

  onTouched: Function = () => {};
  onChange = (result: any) => {};

  selectedlang:
    | { caption: string; value: string; selected?: boolean }
    | undefined;
  valueLang: any;

  constructor(private readonly fb: FormBuilder) {
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
        this.inputA.setValue({ name: vl }, { emitEvent: false });
      } else {
        this.inputA.setValue({ name: '' }, { emitEvent: false });
      }
    }
  }

  onSaveClick() {
    const lo = this.selectedlang?.value as string;
    const value = this.inputA.get('name')?.value;
    if (_.has(this.valueLang, lo)) {
      this.valueLang[lo] = value;
    } else {
      this.valueLang = { ...this.valueLang, [lo]: value };
    }
    this.onChange(this.valueLang);
  }

  writeValue(value: any) {
    if (value) {
      this.valueLang = { ...value };
      if (this.valueLang) {
        const sl = _.keys(this.valueLang)[0];
        const vl = this.valueLang[sl];
        this.selectedlang = this.Langs?.filter((x) => x.value == sl)[0];
        if (vl) {
          this.inputA.setValue({ name: vl }, { emitEvent: false });
        } else {
          this.inputA.setValue({ name: '' }, { emitEvent: false });
        }
      }
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}

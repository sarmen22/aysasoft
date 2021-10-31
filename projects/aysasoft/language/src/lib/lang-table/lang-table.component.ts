import { Component, Input, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { LanguageService } from '../language.service';

@Component({
  selector: 'lib-lang-table',
  templateUrl: './lang-table.component.html',
  styleUrls: ['./lang-table.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LangTableComponent,
    },
  ],
})
export class LangTableComponent implements ControlValueAccessor, OnDestroy {
  @Input() Caption: string = '';
  langInputForm: FormGroup;
  onTouched: Function = () => {};
  onChangeSubs: Subscription[] = [];
  constructor(
    public readonly LangService: LanguageService,
    private readonly fb: FormBuilder
  ) {
    this.langInputForm = fb.group({
      am: [],
      en: [],
      fa: [],
    });
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.langInputForm.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(onChange: any) {
    const sub = this.langInputForm.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}

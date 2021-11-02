import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  Businessform: FormGroup = this.fb.group({
    firstname: [],
    lastname: [],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.Businessform.patchValue({
      firstname: { am: 'Սարմէն', fa: 'سارمن', en: 'Sarmen' },
      lastname: { am: 'Սարմէն1', fa: 'سارمن1', en: 'Sarmen1' },
    });
  }

  onSendClick() {
    console.log(this.Businessform.value);
  }
}

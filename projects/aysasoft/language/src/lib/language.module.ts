import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LangInputComponent } from './lang-input/lang-input.component';
import { LangTextareaComponent } from './lang-textarea/lang-textarea.component';
import { LangTableComponent } from './lang-table/lang-table.component';

@NgModule({
  declarations: [LangInputComponent, LangTextareaComponent, LangTableComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LangInputComponent, LangTextareaComponent, LangTableComponent],
})
export class LanguageModule {}

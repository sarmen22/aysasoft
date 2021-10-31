import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AysasoftComponent } from './aysasoft.component';

describe('AysasoftComponent', () => {
  let component: AysasoftComponent;
  let fixture: ComponentFixture<AysasoftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AysasoftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AysasoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

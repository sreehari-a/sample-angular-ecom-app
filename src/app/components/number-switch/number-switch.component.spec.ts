import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSwitchComponent } from './number-switch.component';

describe('NumberSwitchComponent', () => {
  let component: NumberSwitchComponent;
  let fixture: ComponentFixture<NumberSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

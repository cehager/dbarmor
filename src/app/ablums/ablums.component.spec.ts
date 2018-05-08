import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AblumsComponent } from './ablums.component';

describe('AblumsComponent', () => {
  let component: AblumsComponent;
  let fixture: ComponentFixture<AblumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AblumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AblumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

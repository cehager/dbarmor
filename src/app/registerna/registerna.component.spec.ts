import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisternaComponent } from './registerna.component';

describe('RegisternaComponent', () => {
  let component: RegisternaComponent;
  let fixture: ComponentFixture<RegisternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

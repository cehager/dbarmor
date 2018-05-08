import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FafronComponent } from './fafron.component';

describe('FafronComponent', () => {
  let component: FafronComponent;
  let fixture: ComponentFixture<FafronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FafronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FafronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFroalaComponent } from './editor-froala.component';

describe('EditorFroalaComponent', () => {
  let component: EditorFroalaComponent;
  let fixture: ComponentFixture<EditorFroalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorFroalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFroalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

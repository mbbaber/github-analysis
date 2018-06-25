import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighpieComponent } from './highpie.component';

describe('HighpieComponent', () => {
  let component: HighpieComponent;
  let fixture: ComponentFixture<HighpieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighpieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighpieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

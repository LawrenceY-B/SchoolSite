import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicComponent } from './academic.component';

describe('AcademicComponent', () => {
  let component: AcademicComponent;
  let fixture: ComponentFixture<AcademicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicCreationComponent } from './clinic.creation.component';

describe('ClinicCreationComponent', () => {
  let component: ClinicCreationComponent;
  let fixture: ComponentFixture<ClinicCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

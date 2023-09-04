import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsignatureComponent } from './patientsignature.component';

describe('PatientsignatureComponent', () => {
  let component: PatientsignatureComponent;
  let fixture: ComponentFixture<PatientsignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryInformationComponent } from './medical-history-information.component';

describe('MedicalHistoryInformationComponent', () => {
  let component: MedicalHistoryInformationComponent;
  let fixture: ComponentFixture<MedicalHistoryInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

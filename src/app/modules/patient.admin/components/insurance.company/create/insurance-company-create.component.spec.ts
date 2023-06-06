import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCompanyCreateComponent } from './insurance-company-create.component';

describe('InsuranceCompanyCreateComponent', () => {
  let component: InsuranceCompanyCreateComponent;
  let fixture: ComponentFixture<InsuranceCompanyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCompanyCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceCompanyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

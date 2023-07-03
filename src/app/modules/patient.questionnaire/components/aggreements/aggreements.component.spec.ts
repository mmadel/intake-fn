import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggreementsComponent } from './aggreements.component';

describe('AggreementsComponent', () => {
  let component: AggreementsComponent;
  let fixture: ComponentFixture<AggreementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggreementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

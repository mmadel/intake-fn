import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationReportComponent } from './recommendation.report.component';

describe('RecommendationReportComponent', () => {
  let component: RecommendationReportComponent;
  let fixture: ComponentFixture<RecommendationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

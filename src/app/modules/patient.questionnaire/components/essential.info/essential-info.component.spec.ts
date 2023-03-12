import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialInfoComponent } from './essential-info.component';

describe('EssentialInfoComponent', () => {
  let component: EssentialInfoComponent;
  let fixture: ComponentFixture<EssentialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssentialInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssentialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

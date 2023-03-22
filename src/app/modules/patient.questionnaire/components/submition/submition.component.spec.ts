import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitionComponent } from './submition.component';

describe('SubmitionComponent', () => {
  let component: SubmitionComponent;
  let fixture: ComponentFixture<SubmitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

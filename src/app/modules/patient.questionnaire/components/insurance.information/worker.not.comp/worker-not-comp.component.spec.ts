import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerNotCompComponent } from './worker-not-comp.component';

describe('WorkerNotCompComponent', () => {
  let component: WorkerNotCompComponent;
  let fixture: ComponentFixture<WorkerNotCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerNotCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerNotCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

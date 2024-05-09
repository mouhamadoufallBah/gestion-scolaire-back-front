import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewStudentComponent } from './overview-student.component';

describe('OverviewStudentComponent', () => {
  let component: OverviewStudentComponent;
  let fixture: ComponentFixture<OverviewStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

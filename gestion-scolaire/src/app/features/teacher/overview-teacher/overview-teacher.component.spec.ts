import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTeacherComponent } from './overview-teacher.component';

describe('OverviewTeacherComponent', () => {
  let component: OverviewTeacherComponent;
  let fixture: ComponentFixture<OverviewTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

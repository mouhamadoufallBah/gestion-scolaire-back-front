import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudJantComponent } from './crud-jant.component';

describe('CrudJantComponent', () => {
  let component: CrudJantComponent;
  let fixture: ComponentFixture<CrudJantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudJantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudJantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

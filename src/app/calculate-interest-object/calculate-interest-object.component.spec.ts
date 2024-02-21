import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateInterestObjectComponent } from './calculate-interest-object.component';

describe('CalculateInterestObjectComponent', () => {
  let component: CalculateInterestObjectComponent;
  let fixture: ComponentFixture<CalculateInterestObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculateInterestObjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculateInterestObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

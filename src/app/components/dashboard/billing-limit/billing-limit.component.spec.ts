import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingLimitComponent } from './billing-limit.component';

describe('BillingLimitComponent', () => {
  let component: BillingLimitComponent;
  let fixture: ComponentFixture<BillingLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingLimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

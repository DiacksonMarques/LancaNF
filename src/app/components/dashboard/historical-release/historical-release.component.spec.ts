import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalReleaseComponent } from './historical-release.component';

describe('HistoricalReleaseComponent', () => {
  let component: HistoricalReleaseComponent;
  let fixture: ComponentFixture<HistoricalReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalReleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

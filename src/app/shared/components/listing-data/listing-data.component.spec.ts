import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDataComponent } from './listing-data.component';

xdescribe('ListingDataComponent', () => {
  let component: ListingDataComponent;
  let fixture: ComponentFixture<ListingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

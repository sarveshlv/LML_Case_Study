import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvendordetailsComponent } from './viewvendordetails.component';

describe('ViewvendordetailsComponent', () => {
  let component: ViewvendordetailsComponent;
  let fixture: ComponentFixture<ViewvendordetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewvendordetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewvendordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

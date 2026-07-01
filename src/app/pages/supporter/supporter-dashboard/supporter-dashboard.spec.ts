import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterDashboard } from './supporter-dashboard';

describe('SupporterDashboard', () => {
  let component: SupporterDashboard;
  let fixture: ComponentFixture<SupporterDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupporterDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(SupporterDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

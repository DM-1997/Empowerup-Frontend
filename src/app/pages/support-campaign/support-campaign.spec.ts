import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCampaign } from './support-campaign';

describe('SupportCampaign', () => {
  let component: SupportCampaign;
  let fixture: ComponentFixture<SupportCampaign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportCampaign],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportCampaign);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

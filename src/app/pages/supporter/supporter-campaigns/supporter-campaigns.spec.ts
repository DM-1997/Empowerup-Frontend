import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterCampaigns } from './supporter-campaigns';

describe('SupporterCampaigns', () => {
  let component: SupporterCampaigns;
  let fixture: ComponentFixture<SupporterCampaigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupporterCampaigns],
    }).compileComponents();

    fixture = TestBed.createComponent(SupporterCampaigns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

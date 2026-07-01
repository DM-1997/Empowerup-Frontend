import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterProfile } from './supporter-profile';

describe('SupporterProfile', () => {
  let component: SupporterProfile;
  let fixture: ComponentFixture<SupporterProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupporterProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(SupporterProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

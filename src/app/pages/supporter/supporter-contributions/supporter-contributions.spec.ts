import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterContributions } from './supporter-contributions';

describe('SupporterContributions', () => {
  let component: SupporterContributions;
  let fixture: ComponentFixture<SupporterContributions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupporterContributions],
    }).compileComponents();

    fixture = TestBed.createComponent(SupporterContributions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

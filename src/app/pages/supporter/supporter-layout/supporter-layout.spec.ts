import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterLayout } from './supporter-layout';

describe('SupporterLayout', () => {
  let component: SupporterLayout;
  let fixture: ComponentFixture<SupporterLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupporterLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(SupporterLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

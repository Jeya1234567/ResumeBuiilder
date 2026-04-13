import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderOverlay } from './loader-overlay';

describe('LoaderOverlay', () => {
  let component: LoaderOverlay;
  let fixture: ComponentFixture<LoaderOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderOverlay],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusInline } from './status-inline';

describe('StatusInline', () => {
  let component: StatusInline;
  let fixture: ComponentFixture<StatusInline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusInline],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusInline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

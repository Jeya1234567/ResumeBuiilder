import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInline } from './info-inline';

describe('InfoInline', () => {
  let component: InfoInline;
  let fixture: ComponentFixture<InfoInline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoInline],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoInline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

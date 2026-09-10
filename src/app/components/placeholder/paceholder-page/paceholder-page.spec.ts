import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaceholderPage } from './paceholder-page';

describe('PaceholderPage', () => {
  let component: PaceholderPage;
  let fixture: ComponentFixture<PaceholderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaceholderPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaceholderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

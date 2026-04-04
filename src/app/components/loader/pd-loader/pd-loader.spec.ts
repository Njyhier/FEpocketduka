import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdLoader } from './pd-loader';

describe('PdLoader', () => {
  let component: PdLoader;
  let fixture: ComponentFixture<PdLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeMajComponent } from './demande-maj.component';

describe('DemandeMajComponent', () => {
  let component: DemandeMajComponent;
  let fixture: ComponentFixture<DemandeMajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeMajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeMajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

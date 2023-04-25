import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDiplomeeComponent } from './info-diplomee.component';

describe('InfoDiplomeeComponent', () => {
  let component: InfoDiplomeeComponent;
  let fixture: ComponentFixture<InfoDiplomeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDiplomeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDiplomeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

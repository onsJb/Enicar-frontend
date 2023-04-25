import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiplomeeComponent } from './add-diplomee.component';

describe('AddDiplomeeComponent', () => {
  let component: AddDiplomeeComponent;
  let fixture: ComponentFixture<AddDiplomeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiplomeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDiplomeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

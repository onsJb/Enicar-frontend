import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiplomeeComponent } from './edit-diplomee.component';

describe('EditDiplomeeComponent', () => {
  let component: EditDiplomeeComponent;
  let fixture: ComponentFixture<EditDiplomeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDiplomeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDiplomeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

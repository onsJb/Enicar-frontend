import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAjoutComponent } from './demandeAjout.component';

describe('DemandeAjoutComponent', () => {
  let component: DemandeAjoutComponent;
  let fixture: ComponentFixture<DemandeAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAjoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DoctorCitasService } from './doctor-citas.service';

describe('DoctorCitasService', () => {
  let service: DoctorCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

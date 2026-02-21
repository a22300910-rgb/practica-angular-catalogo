import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductoService,
        provideHttpClient()
      ]
    });

    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

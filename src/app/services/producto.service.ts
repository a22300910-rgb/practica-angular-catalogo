import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get('assets/productos.xml', { responseType: 'text' })
      .pipe(
        map(xmlText => this.parseXml(xmlText))
      );
  }

  private parseXml(xmlText: string): Product[] {

  console.log('XML RECIBIDO ↓↓↓');
  console.log(xmlText);



  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');

 
  if (doc.querySelector('parsererror')) {
    console.error('XML inválido');
    return [];
  }


  const products = Array.from(doc.querySelectorAll('product'));

  console.log('Productos encontrados:', products.length);

  return products.map(p => ({
    id: Number(p.querySelector('id')?.textContent ?? 0),
    name: p.querySelector('name')?.textContent ?? '',
    price: Number(p.querySelector('price')?.textContent ?? 0),
    imageUrl: p.querySelector('imageUrl')?.textContent ?? '',
    category: p.querySelector('category')?.textContent ?? '',
    description: p.querySelector('description')?.textContent ?? '',
    inStock: (p.querySelector('inStock')?.textContent ?? '') === 'true'
  }));
}
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get('/assets/productos.xml', { responseType: 'text' })
      .pipe(
        map(xmlText => this.parseXml(xmlText))
      );
  }

  private parseXml(xmlText: string): Product[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');

    const nodes = Array.from(doc.getElementsByTagName('product'));

    return nodes.map(node => ({
      id: Number(node.getElementsByTagName('id')[0]?.textContent ?? 0),
      name: node.getElementsByTagName('name')[0]?.textContent ?? '',
      price: Number(node.getElementsByTagName('price')[0]?.textContent ?? 0),
      imageUrl: node.getElementsByTagName('imageUrl')[0]?.textContent ?? '',
      category: node.getElementsByTagName('category')[0]?.textContent ?? '',
      description: node.getElementsByTagName('description')[0]?.textContent ?? '',
      inStock: (node.getElementsByTagName('inStock')[0]?.textContent ?? '') === 'true'
    }));
  }
}

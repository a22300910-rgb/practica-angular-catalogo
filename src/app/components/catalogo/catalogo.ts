import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../models/producto.model';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class Catalogo implements OnInit {

  productos: Product[] = [];

  private platformId = inject(PLATFORM_ID);

 constructor(
  private productoService: ProductoService,
  private cdr: ChangeDetectorRef
) {
  console.log('CATALOGO INSTANCE 👉', Math.random());
}
  ngOnInit(): void {

  this.productoService.getAll().subscribe({
    next: (data) => {
  console.log('Productos cargados:', data);
  this.productos = data ?? [];

  this.cdr.detectChanges(); 
},
    error: (err) => {
      console.error('Error cargando XML:', err);
      this.productos = [];
    }
  });

}
}
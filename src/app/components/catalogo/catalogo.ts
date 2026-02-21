import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../models/producto.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class Catalogo implements OnInit {

  productos: Product[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
  this.productoService.getAll().subscribe({
    next: (data) => {
      this.productos = data;
    },
    error: (err) => {
      console.error('Error cargando XML:', err);
    }
  });
}
}


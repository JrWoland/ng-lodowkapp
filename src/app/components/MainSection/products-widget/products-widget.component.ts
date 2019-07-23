import {Component, OnInit} from '@angular/core';
import {Product} from '../../../interfaces/Models/product';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-products-widget',
  templateUrl: './products-widget.component.html',
  styleUrls: ['./products-widget.component.scss']
})
export class ProductsWidgetComponent implements OnInit {

  products: Product[];

  constructor(private prService: ProductService) {
    prService.getItems().subscribe(products => this.products = products);
  }

  ngOnInit() {

  }


}
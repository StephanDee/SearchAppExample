import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Product {
  previewimage: string;
  name: string;
  diameter: string;
  length: string;
  insideBucket: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  productCtrl = new FormControl();
  filteredProducts: Observable<Product[]>;
  myProducts: Product[] = [];

  products: Product[] = [
    {
      name: 'C80U', // Unlegierte Stähle
      diameter: '0.40m Ø',
      length: '15m',
      insideBucket: false,
      previewimage: '/assets/1.jpg'
    },
    {
      name: '32CrMoV5-3', // Niedriglegierte Stähle
      diameter: '0.70m Ø',
      length: '23m',
      insideBucket: false,
      previewimage: '/assets/2.png'
    },
    {
      name: 'X38CrMoV5-3', // Hochlegierte Stähle
      diameter: '0.30m Ø',
      length: '14m',
      insideBucket: false,
      previewimage: '/assets/3.jpg'
    },
    {
      name: 'EN-GJS-350-22', // Schnellarbeitsstähle
      diameter: '0.50m Ø',
      length: '13m',
      insideBucket: false,
      previewimage: '/assets/4.jpg'
    }
  ];

  constructor() {
    this.filteredProducts = this.productCtrl.valueChanges
      .pipe(
        startWith(''),
        map(product => product ? this._filterProducts(product) : this.products.slice())
      );
  }

  public onSelectionChanged(event) {
    const index = this.products.findIndex(product => product.name === event.option.value);
    if (index > -1) {
      this.products[index].insideBucket = true;
      this.myProducts.push(this.products[index]);
      this.productCtrl.setValue('');
      document.getElementById('searchInput').blur();
    }
  }

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
}

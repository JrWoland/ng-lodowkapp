import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../interfaces/Models/product';
import {NameDate} from '../../../interfaces/name-date';
import {ProductService} from '../../../services/product.service';

enum Edit {
  YES = 1,
  NOT = 2,
}

@Component({
  selector: 'app-product-cloud',
  templateUrl: './product-cloud.component.html',
  styleUrls: ['./product-cloud.component.scss']
})
export class ProductCloudComponent implements OnInit {

  editable: Edit;
  @Input() product: Product;
  @Output() removeSignal: EventEmitter<void> = new EventEmitter<void>();
  @Output() needToBuyStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  public editButtonChildren = 'Edit';
  public buyButtonChildren: string;
  public editDisable = false;

  constructor(private prService: ProductService) {
  }

  ngOnInit() {
    if (this.product.name === undefined && this.product.expiryDate === undefined) {
      this.editDisable = true;
      this.editable = Edit.YES;
    } else {
      this.editable = Edit.NOT;
    }
    if (this.product.needToBuy === true) {
      this.buyButtonChildren = 'Don\'t buy';
    } else {
      this.buyButtonChildren = 'To Buy';
    }

  }

  // TODO: uncomment

  changeNameAndDate(value: NameDate) {
    this.product.name = value.name;
    this.product.expiryDate = new Date(value.expiry);
    this.prService.updateItem(this.product);
    this.editable = Edit.NOT;
    this.editDisable = false;
    this.editButtonChildren = 'Edit';
  }

  edit() {
    if (this.editable === Edit.NOT) {
      this.editable = Edit.YES;
      this.editButtonChildren = 'Cancel';
    } else {
      this.editable = Edit.NOT;
      this.editButtonChildren = 'Edit';
    }
  }

  remove() {
    this.removeSignal.emit();
  }

  updateDotColor(color) {
    this.product.dotColor = color;
    this.prService.updateItem(this.product);
  }

  emitInfoAboutChangingNeedToBuyStatus() {
    if (this.product.needToBuy === false) {
      this.needToBuyStatus.emit(true);
      this.buyButtonChildren = 'Don\'t buy';
    } else {
      this.needToBuyStatus.emit(false);
      this.buyButtonChildren = 'To Buy';
    }
  }

}
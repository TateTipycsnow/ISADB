import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { Producto } from '../modelos/producto';
import { ComprasService } from '../servicios/compras.service';
import { CartviewPage } from '../cartview/cartview.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  cart = [];
  cartItemCount: BehaviorSubject<number>;

  public ListaProductos: Observable<Producto[]>

  constructor(
    private servicio: ComprasService, 
    private modalCtrl: ModalController
    ) {}

  ngOnInit(): void {
    this.ListaProductos = this.servicio.obtenerProductos();
    this.cart = this.servicio.getCart();
    this.cartItemCount = this.servicio.getCartItemCount();
  }

  addToCart(product) {
    this.servicio.addProduct(product);
  }
 
  async openCart() {
   
    let modal = await this.modalCtrl.create({
      component: CartviewPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      
    });
    modal.present();
  }

}

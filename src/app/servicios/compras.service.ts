import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Producto, Product } from '../modelos/producto';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private cart = []
  private cartItemCount = new BehaviorSubject(0);

  constructor( public firestore: AngularFirestore, public http: HttpClient ) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.firestore.collection<Producto>(`ListaProductos`).valueChanges();
  }

  crearProducto(
    titulo: string,
    descripcion: string,
    precio: number,
    cantidad: number,
    descuento: number,
    imagenes: string[]
    ):Promise<void>{
    const id = this.firestore.createId();

    return this.firestore.doc(`ListaProductos/${id}`).set({
      id,
      titulo,
      descripcion,
      precio,
      cantidad,
      descuento,
      imagenes
    });
  }

  getCart(){
    return this.cart;
  }

  getCartItemCount(): BehaviorSubject<number> {
		return this.cartItemCount;
	}

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.qty += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.qty = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (const [index, item] of this.cart.entries()) {
			if (item.id === product.id) {
				item.qty -= 1;
				if (item.qty === 0) {
					this.cart.splice(index, 1);
				}
			}
		}
		this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (const [index, item] of this.cart.entries()) {
			if (item.id === product.id) {
				this.cartItemCount.next(this.cartItemCount.value - item.qty);
				this.cart.splice(index, 1);
			}
		}
  }

  completarPago(coste: number, moneda: string, descripcion: string, tokenID: string){
    this.http.post(environment.stripeApiUrl,{
      "amount": coste,
      "currency": moneda,
      "descripcion": descripcion,
      "token": tokenID
    })
    .subscribe(
      (data) => {
      console.log('************** API RESPONSE **************');
      console.log(JSON.stringify(data));
    },
    (error) => {
      console.log('************** API RESPONSE ERROR **************');
      console.log(JSON.stringify(error));
    })
  }

}

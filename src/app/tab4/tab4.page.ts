import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ComprasService } from '../servicios/compras.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public numero: string = '';
  public mes: string = '';
  public anio: string = '';
  public nombreC: string = '';
  public cvv: string = '';

  tarjetaDC: any = {};

  deshabilitarBton: boolean = false;

  public loading;

  constructor(
    public alertController: AlertController, 
    private stripe: Stripe,
    public loadingController: LoadingController,
    private servicioPago: ComprasService,
    private router: Router
     ) {}

  ngOnInit() {
    this.loading = this.loadingController.create({
      message: "Espere por favor..."
    });
  }

  separarNumero(){
    let nuevoNumero = this.numero.toString().replace(/\d{4}(?=.)/g,'$& ');
    return nuevoNumero;
  }

  async presentLoading(){
    this.loading = await this.loadingController.create({
      message: "Espere por favor..."
    });

    await this.loading.present();
  }

  async dismissLoading(){
    await this.loading.dismiss();
  }

  async pagarConStripe(){

    await this.presentLoading();
    this.deshabilitarBton = true;

    this.stripe.setPublishableKey(environment.stripeKey);
    
    this.tarjetaDC = {
      number: this.numero,
      expMonth: this.mes,
      expYear: this.anio,
      cvc: this.cvv
    }
    this.stripe.createCardToken(this.tarjetaDC)
    .then(token=>{

      let coste = 100 * 100;

      console.log(JSON.stringify(token));
      this.presentarAlert("Completado",`Token: ${token.id}`);
      
      this.servicioPago.completarPago(coste, "MXN", "Pagado", token.id);
    })

    .catch(error =>{
      console.log(JSON.stringify(error));
      this.presentarAlert("Error",error);
    })

    .finally(()=>{
      this.dismissLoading();
      this.deshabilitarBton = false;
    })
  }

  async presentarAlert(encabezado: string, mensaje: string){
    const alert = await this.alertController.create({
      header: encabezado,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onClick(){
    alert("Presionaste el boton")
  }

  regresarCarrito() {
    this.router.navigateByUrl('');
  }

}

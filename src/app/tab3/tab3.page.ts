import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ComprasService } from '../servicios/compras.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public crearProductoForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private servicio: ComprasService,
    formBuilder: FormBuilder,
    private router: Router
  ) 
  {
    this.crearProductoForm = formBuilder.group({
      titulo: ['',Validators.required],
      descripcion: ['',Validators.required],
      precio: ['',Validators.required],
      cantidad: ['',Validators.required],
      descuento: ['',Validators.required],
      imagenes: ['',Validators.required]
    });
  }

  async crearProducto(){
    const loading = await this.loadingCtrl.create();

    const titulo = this.crearProductoForm.value.titulo;
    const descripcion = this.crearProductoForm.value.descripcion;
    const precio = this.crearProductoForm.value.precio;
    const cantidad = this.crearProductoForm.value.cantidad;
    const descuento = this.crearProductoForm.value.descuento;
    const imagenes = [this.crearProductoForm.value.imagenes];

    this.servicio.crearProducto(titulo, descripcion, precio, cantidad, descuento, imagenes)
    .then(
      ()=>{
        loading.dismiss().then(()=>{
          this.router.navigateByUrl('');
        });
      },
      error =>{
        loading.dismiss().then(() => {
          console.log(error);
        })
      }
    )

      return await loading.present();

  }

}

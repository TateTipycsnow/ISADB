import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tab4Pipe } from './tab4.pipe';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, Tab4Pipe],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: 
  [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Stripe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CepProvider } from '../providers/cep/cep';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDN_iE3i9gKM4bnjsb2l4JWVKBsf071Vl8",
  authDomain: "escolaapp-65b44.firebaseapp.com",
  projectId: "escolaapp-65b44",
  storageBucket: "escolaapp-65b44.appspot.com",
  messagingSenderId: "493637607395",
  appId: "1:493637607395:web:9e36c125cea23bef8fcad6",
  measurementId: "G-BDTQBTRJEG",
  databaseURL: "https://escolaapp-65b44-default-rtdb.firebaseio.com/"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CepProvider,
    UserProvider
  ]
})
export class AppModule {}

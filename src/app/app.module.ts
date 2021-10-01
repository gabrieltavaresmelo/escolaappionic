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
import { AngularFireStorageModule } from "angularfire2/storage";

import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';
import { env } from '../env/env';
import { AlunoProvider } from '../providers/aluno/aluno';
import { ProfessorProvider } from '../providers/professor/professor';
import { CursoProvider } from '../providers/curso/curso';
import { FirebaseStorageProvider } from '../providers/firebase-storage/firebase-storage';
import { ExportProvider } from '../providers/export/export';

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

    AngularFireModule.initializeApp(env.prodution ? env.prod : env.dev),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
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
    UserProvider,
    AlunoProvider,
    ProfessorProvider,
    CursoProvider,
    FirebaseStorageProvider,
    ExportProvider
  ]
})
export class AppModule {}

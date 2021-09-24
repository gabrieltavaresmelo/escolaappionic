import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import {Storage} from "@ionic/storage";
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage : any = 'LoginPage';
  pages : any[] = [];

  constructor(public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public storage: Storage,
      public userProvider: UserProvider,
      ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Configurações', component: 'ConfiguracoesPage' },
      { title: 'Usuários', component: ListPage },
      { title: 'Endereços', component: 'ListEnderecoPage' },
      { title: 'Alunos', component: 'AlunoListPage' },
      { title: 'Cursos', component: 'CursoListPage' },
      { title: 'Professores', component: 'ProfessorListPage' },
      { title: 'Sobre', component: 'SobrePage' },
      { title: 'Sobre', component: 'SobrePage' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.userProvider.lerLocal().then(_usuario => {
        console.log('AP COMPONENT', _usuario);

        if(_usuario && _usuario.length > 0) {
        // if(_usuario && _usuario.email > 0) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = 'LoginPage';
        }

      })
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.userProvider.removeLocal().then(_data => {
      this.nav.setRoot('LoginPage');
    });
  }
}

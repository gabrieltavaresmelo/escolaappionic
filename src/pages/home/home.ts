import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CepProvider } from '../../providers/cep/cep';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cep = '';

  constructor(
      public navCtrl: NavController,
      public cepProvider: CepProvider,
      public userProvider: UserProvider
    ) {

  }

  buscarCEP() {
    console.log(this.cep);

    this.cepProvider.obterEnderecoPeloCep(this.cep).subscribe(_endereco => {
      console.log(_endereco);

      this.userProvider.salvarCep(_endereco);
    });
  }

}

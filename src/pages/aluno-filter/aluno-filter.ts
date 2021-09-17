import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-aluno-filter',
  templateUrl: 'aluno-filter.html',
})
export class AlunoFilterPage {

  cidade = '';

  cidadeArr = [
    'Fortaleza',
    'Boa Viagem',
    'Aquiraz',
    'Eusébio',
    'Canindé',
    'Cascavel',
  ];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlunoFilterPage');
  }

  filtrar() {
    const params = { 
      cidade: this.cidade,
      isLimpar: false
    };
    this.viewCtrl.dismiss(params);
  }

  limpar() {
    const params = { 
      cidade: this.cidade,
      isLimpar: true
    };
    this.viewCtrl.dismiss(params);
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

}

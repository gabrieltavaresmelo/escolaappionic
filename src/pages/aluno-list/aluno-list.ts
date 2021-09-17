import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AlunoProvider } from '../../providers/aluno/aluno';

@IonicPage()
@Component({
  selector: 'page-aluno-list',
  templateUrl: 'aluno-list.html',
})
export class AlunoListPage {

  alunos = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alunoProvider: AlunoProvider,
    public modalCtrl: ModalController
    ) {

      this.carregaLista();
  }

  addItem() {
    this.navCtrl.push('AlunoFormPage');
  }

  editItem(item) {
    const alunoID = item.key;
    const aluno = item.value;

    this.navCtrl.push('AlunoFormPage', { itemID: alunoID, item: aluno } );
  }

  openFilter() {
    const modal = this.modalCtrl.create('AlunoFilterPage');

    modal.onDidDismiss(_params => {
      // console.log('chegou params', _params);

      if(_params !== undefined) {

        if(_params.isLimpar) {
          console.log('islimpar');
          this.carregaLista();

        } else {
          
          let cidade = _params.cidade;
          console.log('cidade', cidade);
          
          this.alunoProvider.buscar(cidade).subscribe(_data => {
            console.log('buscar', _data);
            this.alunos = _data;
          });
        }

      }
    });

    modal.present();
  }

  carregaLista() {
    this.alunoProvider.listar().subscribe(_data => {
      console.log(_data);
      this.alunos = _data;
    })
  }

}

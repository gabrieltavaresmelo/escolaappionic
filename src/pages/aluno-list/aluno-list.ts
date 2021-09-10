import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public alunoProvider: AlunoProvider
    ) {

      this.alunoProvider.listar().subscribe(_data => {
        console.log(_data);
        this.alunos = _data;
      })
  }

  addItem() {
    this.navCtrl.push('AlunoFormPage');
  }

  editItem(item) {
    const alunoID = item.key;
    const aluno = item.value;

    this.navCtrl.push('AlunoFormPage', { itemID: alunoID, item: aluno } );
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfessorProvider } from '../../providers/professor/professor';

@IonicPage()
@Component({
  selector: 'page-professor-list',
  templateUrl: 'professor-list.html',
})
export class ProfessorListPage {

  itemArr = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public professorProvider: ProfessorProvider
    ) {

      this.professorProvider.listarFS().subscribe(_data => {
        console.log(_data);
        this.itemArr = _data;
      })
  }

  addItem() {
    this.navCtrl.push('ProfessorFormPage');
  }

  editItem(_item) {
    const itemID = _item.key;
    const item = _item.value;

    this.navCtrl.push('ProfessorFormPage', { itemID: itemID, item: item } );
  }

}

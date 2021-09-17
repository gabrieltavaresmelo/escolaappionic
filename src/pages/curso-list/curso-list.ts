import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CursoProvider } from '../../providers/curso/curso';

@IonicPage()
@Component({
  selector: 'page-curso-list',
  templateUrl: 'curso-list.html',
})
export class CursoListPage {

  itemArr = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cursoProvider: CursoProvider
    ) {

      this.cursoProvider.listarFS().subscribe(_data => {
        console.log(_data);
        this.itemArr = _data;
      })
  }

  addItem() {
    this.navCtrl.push('CursoFormPage');
  }

  editItem(_item) {
    const itemID = _item.key;
    const item = _item.value;

    this.navCtrl.push('CursoFormPage', { itemID: itemID, item: item } );
  }

}

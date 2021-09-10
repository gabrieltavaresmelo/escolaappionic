import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Professor } from '../../models/professor';
import { ProfessorProvider } from '../../providers/professor/professor';

@IonicPage()
@Component({
  selector: 'page-professor-form',
  templateUrl: 'professor-form.html',
})
export class ProfessorFormPage {

  titulo = '';

  itemID = undefined;
  item = new Professor();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public professorProvider: ProfessorProvider
    ) {

      const itemID = this.navParams.get('itemID');
      const item = this.navParams.get('item');

      console.log(itemID)
      console.log(item)

      if(itemID) { // tem itemID?
        this.itemID = itemID;
        this.item = item;

        this.titulo = 'Atualizar';

      } else {
        this.itemID = undefined;
        this.item = new Professor();

        this.titulo = 'Inserir';
      }
  }

  ionViewDidLoad() {
    
  }

  salvar() {
    console.log(this.item);

    if(this.itemID) { // atualizar

      this.professorProvider.atualizar(this.itemID, this.item).then(_ => {
        this.presentToast('Professor atualizado com sucesso!');
      })

    } else { // inserir

      this.professorProvider.inserir(this.item).then(_ => {
        this.presentToast('Professor inserido com sucesso!');
        this.navCtrl.pop();
      });
    }
  }

  excluir() {

    const confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: 'Tem certeza que deseja excluir este item?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            
            this.professorProvider.remover(this.itemID)
              .then(_ => {
                console.log('ok')
              })
              .catch(error => {
                console.log('error', error);
              })

          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'position',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}

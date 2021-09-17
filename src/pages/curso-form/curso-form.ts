import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Curso } from '../../models/curso';
import { AlunoProvider } from '../../providers/aluno/aluno';
import { CursoProvider } from '../../providers/curso/curso';

@IonicPage()
@Component({
  selector: 'page-curso-form',
  templateUrl: 'curso-form.html',
})
export class CursoFormPage {

  titulo = '';

  itemID = undefined;
  item = new Curso();

  alunos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public cursoProvider: CursoProvider,
    public alunoProvider: AlunoProvider,
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
        this.item = new Curso();

        this.titulo = 'Inserir';
      }


      this.alunoProvider.listarFS().subscribe(_data => {
        console.log(_data);
        this.alunos = _data;
      })
  }

  ionViewDidLoad() {
    
  }

  salvar() {
    console.log(this.item);

    if(this.itemID) { // atualizar

      this.cursoProvider.atualizarFS(this.itemID, this.item).then(_ => {
        this.presentToast('Curso atualizado com sucesso!');
      })

    } else { // inserir

      this.cursoProvider.inserirFS(this.item).then(_ => {
        this.presentToast('Curso inserido com sucesso!');
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
            
            this.cursoProvider.removerFS(this.itemID)
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

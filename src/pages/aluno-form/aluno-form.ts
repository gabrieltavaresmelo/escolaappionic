import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Aluno } from '../../models/aluno';
import { AlunoProvider } from '../../providers/aluno/aluno';

@IonicPage()
@Component({
  selector: 'page-aluno-form',
  templateUrl: 'aluno-form.html',
})
export class AlunoFormPage {

  titulo = '';

  alunoID = undefined;
  aluno = new Aluno();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public alunoProvider: AlunoProvider
    ) {

      const alunoID = this.navParams.get('itemID');
      const aluno = this.navParams.get('item');

      console.log(alunoID)
      console.log(aluno)

      if(alunoID) { // tem alunoID?
        this.alunoID = alunoID;
        this.aluno = aluno;

        this.titulo = 'Atualizar';

      } else {
        this.alunoID = undefined;
        this.aluno = new Aluno();

        this.titulo = 'Inserir';
      }
  }

  ionViewDidLoad() {
    
  }

  salvar() {
    console.log(this.aluno);

    if(this.alunoID) { // atualizar

      // this.alunoProvider.atualizar(this.alunoID, this.aluno).then(_ => {
      //   this.presentToast('Aluno atualizado com sucesso!');
      // });

      this.alunoProvider.atualizarFS(this.alunoID, this.aluno).then(_ => {
        this.presentToast('Aluno atualizado com sucesso!');
      })

    } else { // inserir

      // this.alunoProvider.inserir(this.aluno).then(_ => {
      //   this.presentToast('Aluno inserido com sucesso!');
      //   this.navCtrl.pop();
      // });

      this.alunoProvider.inserirFS(this.aluno).then(_ => {
        this.presentToast('Aluno inserido com sucesso!');
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
            
            // this.alunoProvider.remover(this.alunoID)
            //   .then(_ => {
            //     console.log('ok')
            //   })
            //   .catch(error => {
            //     console.log('error', error);
            //   });

            this.alunoProvider.removerFS(this.alunoID)
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

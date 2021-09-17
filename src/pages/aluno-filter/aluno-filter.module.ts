import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlunoFilterPage } from './aluno-filter';

@NgModule({
  declarations: [
    AlunoFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(AlunoFilterPage),
  ],
})
export class AlunoFilterPageModule {}

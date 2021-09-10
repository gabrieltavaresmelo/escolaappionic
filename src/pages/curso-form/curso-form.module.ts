import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CursoFormPage } from './curso-form';

@NgModule({
  declarations: [
    CursoFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CursoFormPage),
  ],
})
export class CursoFormPageModule {}

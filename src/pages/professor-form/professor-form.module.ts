import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorFormPage } from './professor-form';

@NgModule({
  declarations: [
    ProfessorFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorFormPage),
  ],
})
export class ProfessorFormPageModule {}

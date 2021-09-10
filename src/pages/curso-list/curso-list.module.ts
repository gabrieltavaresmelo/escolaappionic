import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CursoListPage } from './curso-list';

@NgModule({
  declarations: [
    CursoListPage,
  ],
  imports: [
    IonicPageModule.forChild(CursoListPage),
  ],
})
export class CursoListPageModule {}

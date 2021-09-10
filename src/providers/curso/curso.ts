import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CursoProvider {

  ENTIDADE = '/cursos';

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
  }

  listar() {
    // return this.afd.list('/alunos').valueChanges();
    return this.afd.list(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  inserir(aluno) {
    return this.afd.list(this.ENTIDADE).push(aluno);
  }

  atualizar(id, aluno) {
    return this.afd.object(this.ENTIDADE + '/' + id).update(aluno);
  }

  remover(id) {
    return this.afd.object(this.ENTIDADE + '/' + id).remove();
  }

}

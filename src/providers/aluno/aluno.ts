import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActionSheet } from 'ionic-angular';
import { Aluno } from '../../models/aluno';

@Injectable()
export class AlunoProvider {

  ENTIDADE = '/alunos';

  constructor(public http: HttpClient, 
    public afd: AngularFireDatabase,
    public afs: AngularFirestore
    ) {
  }

  listar() { // realtime_db
    // return this.afd.list('/alunos').valueChanges();
    return this.afd.list(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  listarFS() { // firestore_db
    // return this.afs.collection(this.ENTIDADE).valueChanges();
    return this.afs.collection(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.doc.id, value: changes.payload.doc.data() })))
  }

  buscar(cidade: string) { // realtime_db
    return this.afd.list(this.ENTIDADE, ref => ref.orderByChild('cidade').equalTo(cidade))
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  buscarFS(uf: string, cidade: string) { // firestore_db
    console.log(uf);
    console.log(cidade);

    return this.afs.collection(this.ENTIDADE,
        ref => ref
          .where('uf', '==', uf)
          .where('cidade', '==', cidade)
          .orderBy('nome')
      )
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.doc.id, value: changes.payload.doc.data() })))
  }

  inserir(aluno) { // realtime_db
    return this.afd.list(this.ENTIDADE).push(aluno);
  }

  inserirFS(aluno: Aluno) { // firestore_db
    // const obj = {
    //   nome: aluno.nome,
    //   telefone: aluno.telefone,
    //   matricula: aluno.matricula,
    //   cidade: aluno.cidade,
    //   uf: aluno.uf,
    // }

    // Converte a entidade Aluno para um objeto json generico
    const obj = JSON.parse(JSON.stringify(aluno));
    
    const id = this.afs.createId();
    return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
  }

  atualizar(id, aluno) { // realtime_db
    return this.afd.object(this.ENTIDADE + '/' + id).update(aluno);
  }

  atualizarFS(id, aluno) { // firestore_db
    return this.afs.doc(this.ENTIDADE + '/' + id).update(aluno);
  }

  remover(id) { // realtime_db
    return this.afd.object(this.ENTIDADE + '/' + id).remove();
  }

  removerFS(id) { // firestore_db
    return this.afs.doc(this.ENTIDADE + '/' + id).delete();
  }

}

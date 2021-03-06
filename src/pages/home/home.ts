import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController } from 'ionic-angular';
import { CepProvider } from '../../providers/cep/cep';
import { CursoProvider } from '../../providers/curso/curso';
import { ExportProvider } from '../../providers/export/export';
import { UserProvider } from '../../providers/user/user';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef; // endereco da minha div no html
  map; // objeto mapa do google

  cursosArr = [];
  makerMe: any;

  constructor(
      public navCtrl: NavController,
      public userProvider: UserProvider,
      public cursoProvider: CursoProvider,
      public exportProvider: ExportProvider,
      private geolocation: Geolocation
    ) {

  }

  ionViewDidLoad() {
    this.map = this.createMap(this.mapElement);

    // let arrMarkers = [
    //   {lat: -5.081357184675141, lng: -39.70482921223503, nome: 'Boa Viagem', abrev: 'B'},
    //   {lat: -3.744164084515351, lng: -38.53606323155223, nome: 'Fortaleza', abrev: 'F'},
    // ];
    // this.carregaDadosMapa(arrMarkers);

    this.cursoProvider.listarFS().subscribe(_data => {
      console.log('cursos', _data);
      this.cursosArr = _data;

      for (let i = 0; i < _data.length; i++) {
        const element = _data[i];

        let _lat = element.value.lat;
        let _lng = element.value.lng;
        let _local = element.value.local;

        let itemMarker = {
          lat: _lat,
          lng: _lng,
          nome: _local,
          abrev: _local[0]
        }
        
        this.carregaDadosMapa(itemMarker);
      }
    });

    this.atualizarLocalizacao();
  }

  atualizarLocalizacao() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      console.log('GPS**');
      console.log('lat: ', resp.coords.latitude);
      console.log('lng: ', resp.coords.longitude);

      if(this.makerMe) {
        this.makerMe.setMap(null); // remove o marcador do mapa
        this.makerMe = undefined;
      }

      this.makerMe = this.addMarkerMe(resp.coords.latitude, resp.coords.longitude, 'me');
      this.makerMe.setMap(this.map); // adiciona o marcador no mapa

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  carregaDadosMapa(itemMarker) {

    // cria o marcador (pino)
    const marker = this.addMarker(itemMarker.lat, itemMarker.lng, itemMarker.nome, itemMarker.abrev);
    
    // cria o infowindow
    const infowindow = this.addInfoWindow(itemMarker.nome);

    marker.addListener("click", () => { // evento de clique no marcador
      
      // abre o infowindow e associa ao marcador
      infowindow.open({
        anchor: marker,
        map: this.map,
      });
    });

    marker.setMap(this.map); // adiciona o marcador no mapa

    // let markerIfceBvg = this.addMarker(-5.081357184675141, -39.70482921223503);
    // markerIfceBvg.setMap(this.map);

    // let markerIfceFortaleza = this.addMarker(-3.744164084515351, -38.53606323155223);
    // markerIfceFortaleza.setMap(this.map);
  }

  createMap(mapElement) {
    if(mapElement !== null && mapElement.nativeElement !== null && google) {
      let options = {
        zoom: 7,
        center: {lat: -5.081357184675141, lng: -39.70482921223503}
      };

      return new google.maps.Map(mapElement.nativeElement, options);
    }

    return undefined;
  }

  addMarker(_lat, _lng, nome, abrev) {
    return new google.maps.Marker({
      position: {lat: _lat, lng: _lng},
      title: nome,
      icon: new google.maps.MarkerImage(
        'https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=' + abrev
      )
    })
  }

  addMarkerMe(_lat, _lng, nome) {
    return new google.maps.Marker({
      position: {lat: _lat, lng: _lng},
      title: nome,
      icon: new google.maps.MarkerImage(
        'assets/icon/location_icon.png'
      )
    })
  }

  addInfoWindow(texto: string) {
    let contentHtml = `
      Local: ${texto}
    `;

    return new google.maps.InfoWindow({
      content: contentHtml
    })
  }

  gerarCSV() {
    this.exportProvider.gerarCSV(this.exportarDados(), 'cursos');
  }

  gerarExcel() {
    // console.log('jsonArr', jsonArr);
    this.exportProvider.gerarExcel(this.exportarDados(), 'cursos');
  }

  gerarPDF() {
    this.exportProvider.gerarPDF(this.exportarDados(), 'cursos');
  }

  private exportarDados() {
    let jsonArr = [];

    for (let i = 0; i < this.cursosArr.length; i++) {
      const element = this.cursosArr[i];
      
      const key = element.key;
      const value = element.value;

      let _item = {
        'carga horaria': value.ch,
        'latitude': value.lat,
        'longitude': value.lng,
        'local': value.local,
        'curso': value.nome,
        'professor': value.professor,
        'qtd alunos': value.alunosArr ? value.alunosArr.length : 0,
        'link': 'https://www.google.com/maps/?q=' + value.lat + ',' + value.lng,
      };

      jsonArr.push(_item);
    }

    return jsonArr;
  }

}

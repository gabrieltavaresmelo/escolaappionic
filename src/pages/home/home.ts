import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CepProvider } from '../../providers/cep/cep';
import { CursoProvider } from '../../providers/curso/curso';
import { UserProvider } from '../../providers/user/user';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef; // endereco da minha div no html
  map; // objeto mapa do google

  constructor(
      public navCtrl: NavController,
      public userProvider: UserProvider,
      public cursoProvider: CursoProvider
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
    })
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

  addInfoWindow(texto: string) {
    let contentHtml = `
      Local: ${texto}
    `;

    return new google.maps.InfoWindow({
      content: contentHtml
    })
  }

}

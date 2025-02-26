import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  areaBuscarPokemon: string = '';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  }

  pokemon: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: '',
    weight: ''
  }

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService ) {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro     = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf         = '-' + JSON.parse(JSON.stringify(value))['uf'];
      });
    this.pokeAPIService.getPokeAPIService ()
      .subscribe((value) => {
        this.pokemon.name          = JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
        this.pokemon.abilities     = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.height        = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.weight        = JSON.parse(JSON.stringify(value))['weight'];
      });
  }

}

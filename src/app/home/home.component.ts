import { OfertaModel } from './../shared/oferta.model';
import { OfertasService } from './../ofertas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {
  public ofertas: OfertaModel[];
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertas()
      .subscribe((ofertas: OfertaModel[]) => {
        this.ofertas = ofertas;
      },
      ((erro) => {
        console.log(erro);
      }));
  }
}

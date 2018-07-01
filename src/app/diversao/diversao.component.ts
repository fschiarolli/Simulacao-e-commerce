import { OfertasService } from './../ofertas.service';
import { OfertaModel } from './../shared/oferta.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [ OfertasService ]
})
export class DiversaoComponent implements OnInit {
  public ofertas: OfertaModel[] = [];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
      this.ofertasService.getOfertasPorCategoria('diversao')
        .subscribe((resposta: OfertaModel[]) => {
            this.ofertas = resposta;
            console.log(this.ofertas);
        });
  }
}

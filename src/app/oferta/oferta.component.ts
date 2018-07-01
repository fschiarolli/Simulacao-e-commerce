import { OfertaModel } from './../shared/oferta.model';
import { OfertasService } from './../ofertas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: OfertaModel;

  constructor(private route: ActivatedRoute,
              private ofertaService: OfertasService,
              private carrinhoService: CarrinhoService) {}

  ngOnInit() {
      this.carrinhoService.exibirItens();

      this.route.params.subscribe((params) => {
          this.ofertaService.getOfertasPorId(params.id)
        .subscribe((oferta: OfertaModel) => {
            this.oferta = oferta;
        });
      });
    }

    public adicionarItemCarrinho() {
        this.carrinhoService.incluirItem(this.oferta);
        this.carrinhoService.exibirItens();
    }
}

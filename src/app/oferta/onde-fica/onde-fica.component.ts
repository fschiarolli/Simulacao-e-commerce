import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {
  public ondeFica = '';
  constructor(private route: ActivatedRoute,
              private ofertasService: OfertasService) { }

  ngOnInit() {

    this.route.parent.params.subscribe((params) => {
      this.ofertasService.getOndeFicaOfertaPorId(params.id)
      .subscribe((resposta: string) => {
         this.ondeFica = resposta;
      });
    });
  }
}

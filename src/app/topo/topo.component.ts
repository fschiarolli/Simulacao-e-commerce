import { OfertaModel } from './../shared/oferta.model';
import { OfertasService } from './../ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<OfertaModel[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000) // executa a acao do switch map apos 1 segundo
      .distinctUntilChanged() // Nao permite que uma mesma busca seja realizada varias vezes de forma sequencial
      .switchMap((termo: string) => {

        if (termo.trim() === '') {
          // retorna um observable de array de ofertas vazio
            return Observable.of<OfertaModel[]>([]);
        }

          return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch((error) => {
          return Observable.of<OfertaModel[]>([]);
      });
  }

  public pesquisa(termoDaBusca: string): void {
     this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}

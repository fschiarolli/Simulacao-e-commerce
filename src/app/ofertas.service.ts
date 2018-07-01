import { OfertaModel } from './shared/oferta.model';
import { Http, Response } from '@angular/http';
import { Promise } from 'q';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';


import { URL_API } from './app.api';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OfertasService {
    constructor(private http: Http) {}

    // Metodo para efetuar uma requisição HTTP e retornar um Array de Ofertas
    public getOfertas(): Observable<OfertaModel[]> {
        return this.http.get(`${URL_API}ofertas?destaque=true`)
                .map((resposta: Response) => resposta.json());
    }

    // Metodo para efetuar uma requisição HTTP e retornar um Array de Ofertas
    // com base no parametro categoria.
    public getOfertasPorCategoria(categoria: string): Observable<OfertaModel[]> {
        return this.http.get(`${URL_API}ofertas?categoria=${categoria}`)
            .map((resposta: Response) => resposta.json());
    }

    // Metodo para efetuar uma requisição HTTP e retornar um Array de Ofertas
    // com base no parametro ID.
    public getOfertasPorId(id: any): Observable<OfertaModel> {
        return this.http.get(`${URL_API}ofertas?id=${id}`)
            .map((resposta: Response) => {
                    return resposta.json()[0];
                });
    }

    // Busca informacoes de como usar uma oferta em especifico
    public getComoUsarOfertaPorId(id: number): Observable<string> {
        return this.http.get(`${URL_API}como-usar?id=${id}`)
            .map((resposta: Response) => {
                    return resposta.json()[0].descricao;
                });
    }

    // Busca informacoes de onde fica
    public getOndeFicaOfertaPorId(id: number): Observable<string> {
        return this.http.get(`${URL_API}onde-fica?id=${id}`)
            .map((resposta: Response) => {
                    return resposta.json()[0].descricao;
                });
    }

    // Metodo de busca de ofertas
    public pesquisaOfertas(termo: string): Observable<OfertaModel[]> {
        return this.http.get(`${URL_API}ofertas?descricao_oferta_like=${termo}`)
            .retry(10)
            .map((resposta) =>  resposta.json());
    }
}

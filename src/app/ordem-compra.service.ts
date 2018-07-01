import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PedidoModel } from './shared/pedido.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { URL_API } from './app.api';

@Injectable()
export class OrdemCompraService {

    constructor(private http: Http) {}

    public efetivarCompra(pedido: PedidoModel): Observable<number> {
        let headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http.post(`${URL_API}pedidos`,
                              JSON.stringify(pedido),
                              new RequestOptions({ headers: headers })
                            ).map((response) => response.json().id);
    }
}

import { OfertaModel } from './shared/oferta.model';
import { Injectable } from '@angular/core';
import { ItemCarrinhoModel } from './shared/item-carrinho.model';
import { isNullOrUndefined } from 'util';


@Injectable()
class CarrinhoService {
    public itens: ItemCarrinhoModel[] = [];

    constructor() {}

    public exibirItens(): ItemCarrinhoModel[] {
        return this.itens;
    }

    public incluirItem(oferta: OfertaModel): void {
        let itemCarrinho: ItemCarrinhoModel = new ItemCarrinhoModel(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1);

            let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinhoModel) =>
                                          item.id === itemCarrinho.id);

            if (isNullOrUndefined(itemCarrinhoEncontrado)) {
                this.itens.push(itemCarrinho);
            }else {
                itemCarrinhoEncontrado.quantidade += 1;
            }
    }

    public totalCarrinhoCompras(): number {
        let total = 0;

        this.itens.map((item: ItemCarrinhoModel) => {
            total = total + (item.valor * item.quantidade);
        });

        return total;
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinhoModel): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinhoModel) =>
        item.id === itemCarrinho.id);

        if (!isNullOrUndefined(itemCarrinhoEncontrado)) {
            itemCarrinhoEncontrado.quantidade += 1;
        }
    }

    public removerQuantidade(itemCarrinho: ItemCarrinhoModel): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinhoModel) =>
        item.id === itemCarrinho.id);

        if (!isNullOrUndefined(itemCarrinhoEncontrado)) {
            itemCarrinhoEncontrado.quantidade -= 1;

            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
            }
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}

export { CarrinhoService };

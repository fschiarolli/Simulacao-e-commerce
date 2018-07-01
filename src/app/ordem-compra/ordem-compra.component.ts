import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { PedidoModel } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinhoModel } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl('', [Validators.required])
  });

  public idPedidoCompra: number;
  public itensCarrinho: ItemCarrinhoModel[] = [];

  constructor(private ordemCompraService: OrdemCompraService,
              private carrinhoService: CarrinhoService) { }

  ngOnInit() {
      this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    }else {
      if (this.carrinhoService.exibirItens().length === 0) {
          alert('Você não selecionou nenhum item');
      } else {
      let pedido: PedidoModel = new PedidoModel(this.formulario.value.endereco,
                                                this.formulario.value.numero,
                                                this.formulario.value.complemento,
                                                this.formulario.value.formaPagamento,
                                                this.carrinhoService.exibirItens());

      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido) => {
          this.idPedidoCompra = idPedido;
          this.carrinhoService.limparCarrinho();
        });
      }
    }
  }

  public adicionar(item: ItemCarrinhoModel): void {
    this.carrinhoService.adicionarQuantidade(item);
  }

  public remover(item: ItemCarrinhoModel): void {
    this.carrinhoService.removerQuantidade(item);
  }
}

class CaixaDaLanchonete {
    

    mensagemCarrinhoVazio = 'Não há itens no carrinho de compra!';
    mensagemItemInvalido = 'Item inválido!';
    mensagemErroAoComprarSemOPrincipal = 'Item extra não pode ser pedido sem o principal';
    mensagemFormaDePagamentoInvalida = 'Forma de pagamento inválida!';
    mensagemQuantidadeInvalida = 'Quantidade inválida!';
    modificadoresDePagamento = {
        dinheiro: -5,
        debito: 0,
        credito: 3,
    };
    dependenciasDeRefeicao = {
        chantily: 'cafe',
        queijo: 'sanduiche'
    };

    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };

        this.formasDePagamentoPermitidas = ['dinheiro', 'debito', 'credito'];
    }

    verificarFormatoQuantidadeInvalido(quantidade) {
        const regex = /^[0-9]+$/;
        const eValido = regex.test(quantidade);
        return !eValido;
    }

    verificarSeHaDependenciasDeRefeicaoEValidar(nomeItem, itens) {
        const dependencia = this.dependenciasDeRefeicao[nomeItem];

        if (!dependencia) return true;

        for (const item of itens) {

            if (item.includes(dependencia)) return true;
        }

        return false;
    }

    calcularValorDoItem(nomeItem, quantidadeItem) {
        const precoItem = this.cardapio[nomeItem].valor;
        const precoTotal = precoItem * quantidadeItem;
        return precoTotal;
    }

    adicionarImpostos(formaDePagamento, preco) {
        const comImpostos = parseFloat(preco * (this.modificadoresDePagamento[formaDePagamento] + 100) / 100).toFixed(2);
        const resultadoComVirgula = comImpostos.replace('.', ',');
        return resultadoComVirgula;
    }

    calcularValorDaCompra(formaDePagamento, itens) {

        if (!itens.length) return this.mensagemCarrinhoVazio;

        if (!this.formasDePagamentoPermitidas.includes(formaDePagamento)) return this.mensagemFormaDePagamentoInvalida;

        let precoTotal = 0;

        for (const item of itens) {

            const [nomeItem, quantidadeItem] = item.split(',');

            if (!nomeItem || !quantidadeItem) return this.mensagemItemInvalido;

            if (this.verificarFormatoQuantidadeInvalido(quantidadeItem)) return this.mensagemItemInvalido;

            if (!this.cardapio[nomeItem]) return this.mensagemErroAoComprarSemOPrincipal;

            if (!this.verificarSeHaDependenciasDeRefeicaoEValidar(nomeItem, itens)) return this.mensagemErroAoComprarSemOPrincipal;

            const quantidadeItemComoNumero = parseInt(quantidadeItem);

            if (quantidadeItemComoNumero === 0) return this.mensagemQuantidadeInvalida

            const precoTotalItem = this.calcularValorDoItem(nomeItem, quantidadeItemComoNumero);
           
            precoTotal += precoTotalItem;
        }
        const precoTotalComImpostos = this.adicionarImpostos(formaDePagamento, precoTotal);
        return `R$ ${precoTotalComImpostos}`;
    }
}

export { CaixaDaLanchonete };

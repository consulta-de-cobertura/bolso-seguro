let itens = [];
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function adicionarItem() {
    const nome = document.getElementById("nomeItem").value;
    const valorBruto = document.getElementById("valorItem").value.replace(",", ".");
    const valor = parseFloat(valorBruto);
    const qtd = parseInt(document.getElementById("qtdItem").value);
    const data = document.getElementById("dataPagamento").value;
    if (!nome || isNaN(valor) || isNaN(qtd) || !data) return;
    const total = valor * qtd;
    itens.push({ nome, valor, qtd, data, total });
    atualizarTabela();
    limparCampos();
}
function atualizarTabela() {
    const tbody = document.querySelector("#tabelaItens tbody");
    const totalGeralEl = document.getElementById("totalGeral");
    tbody.innerHTML = "";
    let totalGeral = 0;
    itens.forEach((item, index) => {
        totalGeral += item.total;
        tbody.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${formatarMoeda(item.valor)}</td>
                <td>${item.qtd}</td>
                <td>${item.data}</td>
                <td>${formatarMoeda(item.total)}</td>
                <td>
                    <button onclick="editarItem(${index})">Editar</button>
                    <button onclick="removerItem(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
    totalGeralEl.textContent = formatarMoeda(totalGeral);
}
function limparCampos() {
    document.getElementById("nomeItem").value = "";
    document.getElementById("valorItem").value = "";
    document.getElementById("qtdItem").value = 1;
    document.getElementById("dataPagamento").value = "";
}
function removerItem(index) {
    itens.splice(index, 1);
    atualizarTabela();
}
function editarItem(index) {
    const item = itens[index];
    document.getElementById("nomeItem").value = item.nome;
    document.getElementById("valorItem").value = item.valor;
    document.getElementById("qtdItem").value = item.qtd;
    document.getElementById("dataPagamento").value = item.data;
    itens.splice(index, 1);
    atualizarTabela();
}

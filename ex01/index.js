// Exercício 01: ArrayUtils com JavaScript

/**
 * unique: Remove itens duplicados de um array.
 * Usa 'new Set()' que armazena apenas valores únicos. 
 */
const unique = arr => [...new Set(arr)];

/**
 * groupBy: Agrupa objetos de um array baseando-se em uma chave (propriedade).
 * Retorna um objeto onde as chaves são os grupos.
 */
const groupBy = (arr, key) =>
  arr.reduce((acc, obj) => {
    // Se o grupo ainda não existe, cria um array vazio. Depois, adiciona o objeto.
    (acc[obj[key]] = acc[obj[key]] || []).push(obj);
    return acc;
  }, {});

/**
 * sumBy: Soma os valores numéricos de uma propriedade específica.
 * O operador '?? 0' garante que valores nulos/indefinidos sejam tratados como zero.
 */
const sumBy = (arr, key) =>
  arr.reduce((total, obj) => total + (obj[key] ?? 0), 0);


// Unique: Remover duplicatas de um array
console.log('\n--- 1. UNIQUE (REMOVER DUPLICATAS) ---');

// 1. Limpando uma lista de IDs numéricos repetidos
const idsBrutos = [101, 102, 101, 103, 102, 104];
const idsUnicos = unique(idsBrutos);

console.log('1. Números');
console.log('Entrada:', idsBrutos);
console.log('Saída:  ', idsUnicos); 

// 2. Limpando uma lista de e-mails (Strings)
const emails = ['ana@teste.com', 'bob@teste.com', 'ana@teste.com'];
const emailsUnicos = unique(emails);

console.log('\n2. Strings');
console.log('Entrada:', emails);
console.log('Saída:  ', emailsUnicos);

// GroupBy: Agrupar objetos por uma chave específica
console.log('\n\n--- 2. GROUPBY (AGRUPAMENTO) ---');

// 1. Agrupar alimentos pelo "tipo"
const alimentos = [
  { nome: 'Alface', tipo: 'Verdura' },
  { nome: 'Maçã',   tipo: 'Fruta' },
  { nome: 'Couve',  tipo: 'Verdura' },
  { nome: 'Banana', tipo: 'Fruta' }
];
const alimentosAgrupados = groupBy(alimentos, 'tipo');

console.log('1. Por Categoria');
console.log(alimentosAgrupados);

// 2. Agrupar alunos por "nota" (apenas para mostrar agrupamento por número)
const alunos = [
  { nome: 'João', nota: 10 },
  { nome: 'Maria', nota: 8 },
  { nome: 'Pedro', nota: 10 }
];
const alunosPorNota = groupBy(alunos, 'nota');

console.log('\n2. Por Valor Numérico');
console.log(alunosPorNota);

// SumBy: Somar valores de uma propriedade específica em um array de objetos
console.log('\n\n--- 3. SUMBY (SOMATÓRIA) ---');

// 1. Calcular o total de um carrinho de compras
const carrinho = [
  { produto: 'Teclado', preco: 150 },
  { produto: 'Mouse',   preco: 50 },
  { produto: 'Cabo',    preco: 20 }
];
const totalCarrinho = sumBy(carrinho, 'preco');

console.log('1. Soma Simples');
console.log(`Itens: ${JSON.stringify(carrinho)}`);
console.log(`Total: R$ ${totalCarrinho}`);

// 2. Somar pontos de um jogo (com dados faltando)
// O terceiro jogador NÃO tem a propriedade 'pontos'. O operador '?? 0' na função sumBy garante que isso não quebre a soma, tratando como zero.
const jogadores = [
  { nome: 'Player1', pontos: 10 },
  { nome: 'Player2', pontos: 20 },
  { nome: 'Player3' } // situação comum: dado faltando
];
const totalPontos = sumBy(jogadores, 'pontos');

console.log('\n2. Tratamento de dados faltando');
console.log(`Jogadores: ${JSON.stringify(jogadores)}`);
console.log(`Total Pontos: ${totalPontos}`);
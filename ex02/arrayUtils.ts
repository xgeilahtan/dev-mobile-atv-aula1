// ==========================================
// 1. FUNÇÕES UTILITÁRIAS
// ==========================================

export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

export const groupBy = <T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> => {
  return arr.reduce((acc, obj) => {
    const groupKey = String(obj[key]);

    // TRUQUE DE SEGURANÇA PARA 'noUncheckedIndexedAccess':
    // O TS acha que acc[groupKey] pode ser undefined.
    // Então, pegamos o valor OU criamos um array vazio novo.
    const group = acc[groupKey] ?? [];
    
    group.push(obj);
    
    // Devolvemos o array atualizado para o objeto
    acc[groupKey] = group;

    return acc;
  }, {} as Record<string, T[]>);
};

export const sumBy = <T, K extends keyof T>(arr: T[], key: K): number => {
  return arr.reduce((total, obj) => {
    const value = obj[key];
    // Garante que é número. Se for NaN ou undefined, usa 0.
    const numberValue = Number(value) || 0;
    return total + numberValue;
  }, 0);
};

// ==========================================
// 2. INTERFACES
// ==========================================

interface Venda {
  id: number;
  vendedor: string;
  valor: number;
  categoria: string;
}

interface Tarefa {
  id: number;
  dev: string;
  projeto: string;
  horas: number;
  status: 'Pendente' | 'Concluído' | 'Em Progresso';
}

// ==========================================
// 3. EXECUÇÃO
// ==========================================

console.log('--- 🛡️ RODANDO EM MODO ESTRITO (NODENEXT) ---\n');

// --- UNIQUE ---
const ids = [1, 2, 2, 3, 3, 4];
const idsUnicos = unique(ids); 
console.log(`Unique: ${idsUnicos.join(', ')}`);


// --- GROUPBY + SUMBY ---
const vendas: Venda[] = [
  { id: 1, vendedor: 'Ana',    valor: 150, categoria: 'Eletrônicos' },
  { id: 2, vendedor: 'Carlos', valor: 50,  categoria: 'Livros' },
  { id: 3, vendedor: 'Ana',    valor: 300, categoria: 'Eletrônicos' },
];

const vendasPorVendedor = groupBy(vendas, 'vendedor'); 

console.log('\n--- Vendas por Vendedor ---');

// Object.entries é vital aqui para evitar erros de índice
Object.entries(vendasPorVendedor).forEach(([vendedor, itens]) => {
  const total = sumBy(itens, 'valor');
  console.log(`${vendedor}: R$ ${total} (${itens.length} vendas)`);
});

// --- TAREFAS ---
const tarefas: Tarefa[] = [
  { id: 1, dev: 'Alice', projeto: 'App', status: 'Concluído', horas: 5 },
  { id: 2, dev: 'Bob',   projeto: 'Web', status: 'Pendente',  horas: 3 },
];

console.log('\n--- Projetos ---');
const porProjeto = groupBy(tarefas, 'projeto');

Object.entries(porProjeto).forEach(([proj, tasks]) => {
    // Graças ao Object.entries, o TS sabe que 'tasks' existe
    const totalHoras = sumBy(tasks, 'horas');
    console.log(`${proj}: ${totalHoras}h`);
});
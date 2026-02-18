// Dat tipo para a resposta da API
interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonData {
  name: string;
  height: number; // A API retorna em decímetros
  weight: number; // A API retorna em hectogramas
  types: PokemonType[];
}

// Função para capitalizar texto (ex: "pikachu" -> "Pikachu")
const capitalize = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

// Função para buscar e exibir os dados do Pokémon
async function buscarPokemon() {
  // Pega o argumento da linha de comando (ex: "pikachu" ou "25")
  const input = process.argv[2];

  // Se não digitou nada:
  if (!input) {
    console.log("Por favor, informe o nome ou ID do Pokémon.");
    console.log("Exemplo: npx ts-node pokedex.ts bulbasaur");
    return;
  }

  // Arruma o nome/id para a URL
  const query = input.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

  try {
    // Faz a requisição
    const response = await fetch(url);

    // Trata erro 404 (Não encontrado)
    if (!response.ok) {
      if (response.status === 404) {
        console.error("❌ Pokémon não encontrado!");
        return;
      }
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    // Converte a resposta para JSON e força a tipagem
    const data = (await response.json()) as PokemonData;

    // Altura: decímetros -> metros
    const heightInMeters = data.height / 10;
    
    // Peso: hectogramas -> kg
    const weightInKg = data.weight / 10;
    
    // Mapeia o array para pegar apenas os nomes e junta com vírgula
    const typesFormatted = data.types
      .map((t) => capitalize(t.type.name))
      .join(', ');

    const nameFormatted = capitalize(data.name);

    // --- Exibição ---
    console.log(
      `${nameFormatted} – ${heightInMeters} m – ${weightInKg} kg – ${typesFormatted}`
    );

  } catch (error) {
    // Trata erros de rede ou outros problemas
    console.error("⚠️ Erro de rede. Tente novamente.");
  }
}

// Executa a função
buscarPokemon();
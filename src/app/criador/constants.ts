
export const MOCK_CITIES = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
  "Curitiba, PR", "Florianópolis, SC", "Salvador, BA", 
  "Fortaleza, CE", "Brasília, DF", "Porto Alegre, RS", 
  "Recife, PE", "Manaus, AM", "Goiânia, GO"
];

export const FONT_OPTIONS = [
  { id: 'dancing-script', name: 'Dancing Script', class: 'font-["Dancing_Script"]' },
  { id: 'pacifico', name: 'Pacifico', class: 'font-["Pacifico"]' },
  { id: 'playfair', name: 'Playfair Display', class: 'font-["Playfair_Display"]' },
  { id: 'inter', name: 'Inter Sans', class: 'font-["Inter"]' },
];

export type Step = 'theme-selection' | 'gift-type' | 'customize-background' | 'photos' | 'page-title' | 'message' | 'music' | 'data-location';

import { Surah, SurahCategory } from '../types';
import rawSurahs from './surahsData.json';

export const ALL_SURAHS: Surah[] = rawSurahs as unknown as Surah[];

export interface CategoryInfo {
  id: SurahCategory;
  title: string;
  badge: string;
  range: string;
  countText: string;
  description: string;
  colorClass: string;
}

export const CATEGORIES_INFO: CategoryInfo[] = [
  {
    id: 'indispensables',
    title: 'Les Indispensables',
    badge: '12 sourates (103→114)',
    range: '103 à 114',
    countText: '12 sourates',
    description: 'Les sourates courtes indispensables du quotidien, récitées dans les prières obligatoires.',
    colorClass: 'from-amber-600/15 to-emerald-600/10 border-amber-500/30'
  },
  {
    id: 'coeur',
    title: 'Le Cœur du Juz',
    badge: '10 sourates (93→102)',
    range: '93 à 102',
    countText: '10 sourates',
    description: 'Le cœur spirituel et consolateur du Juz, d’Ad-Duha jusqu’à At-Takathur.',
    colorClass: 'from-emerald-600/15 to-teal-600/10 border-emerald-500/30'
  },
  {
    id: 'recits',
    title: 'Récits & Enseignements',
    badge: '8 sourates (85→92)',
    range: '85 à 92',
    countText: '8 sourates',
    description: 'Récits des peuples passés, serments célestes et élévation de l’âme.',
    colorClass: 'from-blue-600/15 to-indigo-600/10 border-blue-500/30'
  },
  {
    id: 'grandes',
    title: 'Les Grandes Sourates',
    badge: '7 sourates (78→84)',
    range: '78 à 84',
    countText: '7 sourates',
    description: 'Les sourates majestueuses de l’ouverture du Juz, décrivant la Création et le Jour Dernier.',
    colorClass: 'from-purple-600/15 to-emerald-700/15 border-purple-500/30'
  }
];

export function getSurahById(id: number): Surah | undefined {
  return ALL_SURAHS.find(s => s.id === id);
}

export function getSurahsByCategory(cat: SurahCategory): Surah[] {
  return ALL_SURAHS.filter(s => s.category === cat);
}

export function searchSurahs(query: string): Surah[] {
  if (!query.trim()) return ALL_SURAHS;
  const q = query.toLowerCase().trim();
  return ALL_SURAHS.filter(
    s =>
      s.nameTranslit.toLowerCase().includes(q) ||
      s.nameFrench.toLowerCase().includes(q) ||
      s.nameArabic.includes(q) ||
      s.id.toString() === q
  );
}

/**
 * @fileOverview Utilitários para o módulo de Curiosidades.
 * Calcula fase da lua, estação do ano e estatísticas de datas.
 */

// Moon phase calculation
export function getMoonPhase(date: Date): {
  phase: string;
  illumination: number;
  emoji: string;
} {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Calculate Julian date
  let jd = 367 * year - Math.floor((7 * (year + Math.floor((month + 9) / 12))) / 4) +
    Math.floor((275 * month) / 9) + day + 1721013.5;

  // Calculate moon age in days (synodic month = 29.53 days)
  const synodicMonth = 29.53058867;
  const knownNewMoon = 2451550.1; // Known new moon: January 6, 2000
  const moonAge = ((jd - knownNewMoon) % synodicMonth + synodicMonth) % synodicMonth;

  // Determine phase based on moon age
  const phaseIndex = Math.floor((moonAge / synodicMonth) * 8) % 8;
  
  const phases = [
    { phase: "Lua Nova", illumination: 0, emoji: "🌑" },
    { phase: "Lua Crescente", illumination: 25, emoji: "🌒" },
    { phase: "Quarto Crescente", illumination: 50, emoji: "🌓" },
    { phase: "Gibosa Crescente", illumination: 75, emoji: "🌔" },
    { phase: "Lua Cheia", illumination: 100, emoji: "🌕" },
    { phase: "Gibosa Minguante", illumination: 75, emoji: "🌖" },
    { phase: "Quarto Minguante", illumination: 50, emoji: "🌗" },
    { phase: "Lua Minguante", illumination: 25, emoji: "🌘" },
  ];

  return phases[phaseIndex];
}

// Season calculation (Southern Hemisphere - Brazil)
export function getSeason(date: Date): {
  season: string;
  color: string;
} {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Southern Hemisphere seasons (approximate dates)
  if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) {
    return { season: "Verão", color: "#FFB800" };
  } else if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
    return { season: "Outono", color: "#FF6B35" };
  } else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 22)) {
    return { season: "Inverno", color: "#4FC3F7" };
  } else {
    return { season: "Primavera", color: "#81C784" };
  }
}

// Day of week
export function getDayOfWeek(date: Date): string {
  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return days[date.getDay()];
}

// Days since date
export function getDaysSince(date: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(today.getTime() - targetDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

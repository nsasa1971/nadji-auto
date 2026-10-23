import baza from '../data/baza.json';

// baza.json: marka -> model -> generacija -> tekst. Tekst ovde ne koristimo.
const podaci = baza as Record<string, Record<string, Record<string, string>>>;

export const marke = (): string[] => Object.keys(podaci).sort((a, b) => a.localeCompare(b, 'sr-Latn'));

export const modeli = (marka: string): string[] =>
  Object.hasOwn(podaci, marka) ? Object.keys(podaci[marka]) : [];

export const generacije = (marka: string, model: string): string[] =>
  Object.hasOwn(podaci, marka) && Object.hasOwn(podaci[marka], model) ? Object.keys(podaci[marka][model]) : [];

export const postojiMarka = (marka: string): boolean => Object.hasOwn(podaci, marka);
export const postojiModel = (marka: string, model: string): boolean => modeli(marka).includes(model);

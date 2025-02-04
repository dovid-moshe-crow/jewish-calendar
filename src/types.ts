export interface HebrewDateOptions {
  year: number;
  month: number;
  day: number;
  isHebrewYear?: boolean;
}

export interface ZmanimOptions {
  latitude: number;
  longitude: number;
  elevation: number;
  timeZone: string;
}

export interface Holiday {
  name: string;
  hebrewName: string;
  date: HebrewDateOptions;
  description?: string;
  category: 'BIBLICAL' | 'RABBINICAL' | 'MODERN' | 'CUSTOM';
}

export type DateFormat = 'HEBREW' | 'ENGLISH' | 'FULL_HEBREW' | 'FULL_ENGLISH';

export interface ParshahInfo {
  name: string;
  hebrewName: string;
  isSpecial: boolean;
  specialType?: 'DOUBLE' | 'SPECIAL';
} 
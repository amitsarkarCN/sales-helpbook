import { ElementType } from 'react';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

export enum ThemeColors {
  Primary = '#f68d1e',
  Secondary = '#414141',
  White = '#ffffff'
}

export type BrochureSubCategory = 'Job Bootcamp' | 'IIT PG' | 'Student' | 'Others';
// Since Certificates use the same categories, we can reuse or alias this type
export type CertificateSubCategory = BrochureSubCategory;
export type EMIPlanSubCategory = BrochureSubCategory;

export type AlumniCategory = 'Software Development' | 'Data Analysis' | 'PG Certification';

export interface Brochure {
  id: string;
  title: string;
  url: string;
  subCategory: BrochureSubCategory;
}

export interface Certificate {
  id: string;
  title: string;
  url: string;
  subCategory: CertificateSubCategory;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Alumni {
  id: string;
  name: string;
  currentCompany: string;
  designation: string;
  linkedinProfile: string;
  imageUrl?: string;
  category: AlumniCategory;
  ctc?: string;
  year?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  videoUrl: string;
  details: string;
}

export interface CompetitorFile {
  id: string;
  title: string;
  url: string;
}

export interface ImportantLink {
  id: string;
  title: string;
  url: string;
}

export interface SalesScript {
  id: string;
  title: string;
  url: string;
}

export interface ProjectAssignment {
  id: string;
  title: string;
  url: string;
}

export interface EMIPlan {
  id: string;
  title: string;
  url: string;
  subCategory: EMIPlanSubCategory;
}

export interface HandbookItem {
  id: string;
  title: string;
  url: string;
}
import { Category, BrochureSubCategory, FAQ, Alumni, AlumniCategory, Testimonial, CompetitorFile, ImportantLink, SalesScript, ProjectAssignment, EMIPlan, HandbookItem } from './types';
import { 
  FileText, 
  Award, 
  HelpCircle, 
  Users, 
  Briefcase, 
  BarChart3, 
  Link, 
  MessageSquare, 
  FolderKanban, 
  CreditCard, 
  GraduationCap, 
  Lightbulb 
} from 'lucide-react';

export const CATEGORIES: Category[] = [
  {
    id: 'brochures',
    title: 'Program Brochures',
    description: 'Detailed curriculum and program guides for all courses.',
    icon: FileText
  },
  {
    id: 'certificates',
    title: 'Certificates',
    description: 'Sample certificates and issuance guidelines.',
    icon: Award
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    description: 'Common objections and standard answers.',
    icon: HelpCircle
  },
  {
    id: 'alumni',
    title: 'Coding Ninjas Alumni',
    description: 'Success stories and alumni network details.',
    icon: Users
  },
  {
    id: 'placements',
    title: 'Placement and Companies Hiring',
    description: 'List of hiring partners and placement statistics.',
    icon: Briefcase
  },
  {
    id: 'competitors',
    title: 'Competitor Analysis',
    description: 'Comparison charts and battle cards.',
    icon: BarChart3
  },
  {
    id: 'links',
    title: 'Important Links',
    description: 'Quick access to internal portals and resources.',
    icon: Link
  },
  {
    id: 'scripts',
    title: 'Sales Script and Quick Comms',
    description: 'Call scripts, email templates, and quick replies.',
    icon: MessageSquare
  },
  {
    id: 'projects',
    title: 'Project and Assignments',
    description: 'Showcase of student projects and capstones.',
    icon: FolderKanban
  },
  {
    id: 'emi',
    title: 'EMI Plans',
    description: 'Financial aid options and EMI calculators.',
    icon: CreditCard
  },
  {
    id: 'handbook',
    title: 'Training Handbook',
    description: 'Internal sales training modules and quizzes.',
    icon: GraduationCap
  },
  {
    id: 'requests',
    title: 'Feature Request',
    description: 'Submit feedback and request new tools.',
    icon: Lightbulb
  }
];

export const BROCHURE_SUBCATEGORIES: BrochureSubCategory[] = [
  'Job Bootcamp',
  'IIT PG',
  'Student',
  'Others'
];

export const FAQ_CATEGORIES = [
  'Platform Specific',
  'Q&A Persona specific',
  'Q&A FSD focussed',
  'Q&A Job bootcamp focussed',
  'Q&A DA focussed',
  'Live Demo class(MasC) by Data Analyst mentors'
];

export const ALUMNI_CATEGORIES: AlumniCategory[] = [
  'Software Development',
  'Data Analysis',
  'PG Certification'
];

export const INITIAL_FAQS: FAQ[] = [
  { id: '1', category: 'Platform Specific', question: 'Sneak Peek to Job Bootcamp Platform(formerly known as Career Camp)', answer: 'https://www.youtube.com/watch?v=wmRx0RikV3M' },
  { id: '2', category: 'Q&A Persona specific', question: 'Right time to switch from service to product companies:', answer: 'https://youtu.be/O3dxnGM8_X4' },
  { id: '3', category: 'Q&A Persona specific', question: 'Switching from non tech to tech role:', answer: 'https://youtu.be/bN-lA1Uafjk' },
  { id: '4', category: 'Q&A Persona specific', question: 'Switching from semi tech to Tech role:', answer: 'https://youtu.be/mGaRg8_l_HQ' },
  { id: '5', category: 'Q&A FSD focussed', question: 'Importance of DSA for Product based companies:', answer: 'https://youtu.be/6Ga4QXkD7_4' },
  { id: '6', category: 'Q&A FSD focussed', question: 'Sample projects by Coding Ninjas Alumni', answer: '1. https://github.com/rahulsin14?tab=repositories 2. https://github.com/Akashpal95/Social-IO 3. https://github.com/rahulsin14/Hospital-server' },
  { id: '7', category: 'Q&A Job bootcamp focussed', question: 'Right time to join a bootcamp:', answer: 'https://youtu.be/Snn1YBgM1KQ' },
  { id: '8', category: 'Q&A Job bootcamp focussed', question: 'Introduction to job bootcamp:', answer: 'https://youtu.be/0fkiQSm_3ok' },
  { id: '9', category: 'Q&A Job bootcamp focussed', question: 'How placements work at job bootcamp:', answer: 'https://youtu.be/ArQZFDNpx-M' },
  { id: '10', category: 'Q&A Job bootcamp focussed', question: 'Can I get a good ROI with job bootcamp:', answer: 'https://youtu.be/5GxgdAOm59M' },
  { id: '11', category: 'Q&A Job bootcamp focussed', question: 'Managing Job Bootcamp alongside your job:', answer: 'https://youtu.be/dXee9T6HPK4' },
  { id: '12', category: 'Q&A Job bootcamp focussed', question: 'Self study vs joining a bootcamp:', answer: 'https://youtu.be/9FRY9oLWiEY' },
  { id: '13', category: 'Q&A Job bootcamp focussed', question: 'Importance of community in learning:', answer: 'https://youtu.be/1J0mG7Epqic' },
  { id: '14', category: 'Q&A Job bootcamp focussed', question: 'Which language to opt for?', answer: 'https://youtu.be/ndVwF90AA_M' },
  { id: '15', category: 'Q&A Job bootcamp focussed', question: 'Structured learning, a smart way of learning', answer: 'https://youtube.com/shorts/RI2IzNATaw4' },
  { id: '16', category: 'Q&A Job bootcamp focussed', question: 'Does gap in your profile matters? Yes & NO', answer: 'https://youtu.be/gBhYZPhu1dE' },
  { id: '17', category: 'Q&A Job bootcamp focussed', question: 'Impact of recession on Jobs', answer: 'https://youtu.be/T7iTR-ownSw' },
  { id: '18', category: 'Q&A Job bootcamp focussed', question: 'CS or IT Degree matters?', answer: 'https://youtu.be/4PEUdQkxUiQ' },
  { id: '19', category: 'Q&A Job bootcamp focussed', question: 'Alumni talking about 1:1 doubt support', answer: 'https://youtu.be/fQZhd1tfRVU' },
  { id: '20', category: 'Q&A Job bootcamp focussed', question: 'Coming from tier 3 college? This is how Job Bootcamp can help you ?', answer: 'https://youtu.be/dXmeC98uSNw' },
  { id: '21', category: 'Q&A Job bootcamp focussed', question: 'Coding Ninjas services', answer: 'https://youtu.be/xorZjYn6MoE' },
  { id: '22', category: 'Q&A DA focussed', question: 'How to Become a Successful Data Analyst | Key Roles & Responsibilities Explained', answer: 'https://youtu.be/oESpQf1G8e8' },
  { id: '23', category: 'Q&A DA focussed', question: 'What It Takes to Be a successful Data Analyst', answer: 'https://youtu.be/A7hQzuvNoBc' },
  { id: '24', category: 'Q&A DA focussed', question: 'How to make an ATS friendly RESUME | Perfect DATA ANALYST Resume', answer: 'https://youtu.be/BQBbVh9pMuQ' },
  { id: '25', category: 'Q&A DA focussed', question: '7 Reasons You Are Not Getting Hired | Data Analyst Interview Mistakes', answer: 'https://youtu.be/cOdJ6ipUZfc' },
  { id: '26', category: 'Q&A DA focussed', question: 'How to become a Data Analyst in 2024! | Complete ROADMAP', answer: 'https://youtu.be/hilUU1QV8n0' },
  { id: '27', category: 'Live Demo class(MasC) by Data Analyst mentors', question: 'Mentor Ashwin Goyal', answer: 'https://youtube.com/live/41wd0esjgtQ?feature=share' },
  { id: '28', category: 'Live Demo class(MasC) by Data Analyst mentors', question: 'Mentor Megna Roy', answer: 'https://www.youtube.com/live/nUvGdYmDIUk?si=Q61TmmAhinhbuMpr' }
];

export const INITIAL_ALUMNI: Alumni[] = [];

export const INITIAL_TESTIMONIALS: Testimonial[] = [];

export const INITIAL_COMPETITORS: CompetitorFile[] = [];

export const INITIAL_IMPORTANT_LINKS: ImportantLink[] = [];

export const INITIAL_SALES_SCRIPTS: SalesScript[] = [];

export const INITIAL_PROJECTS: ProjectAssignment[] = [];

export const INITIAL_EMI_PLANS: EMIPlan[] = [];

export const INITIAL_HANDBOOK_ITEMS: HandbookItem[] = [];
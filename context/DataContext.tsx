import React, { createContext, useContext, useState, useEffect } from 'react';
import { Brochure, Certificate, FAQ, Alumni, Testimonial, CompetitorFile, ImportantLink, SalesScript, ProjectAssignment, EMIPlan, HandbookItem } from '../types';
import { 
  INITIAL_FAQS, INITIAL_ALUMNI, INITIAL_TESTIMONIALS, INITIAL_COMPETITORS, 
  INITIAL_IMPORTANT_LINKS, INITIAL_SALES_SCRIPTS, INITIAL_PROJECTS, 
  INITIAL_EMI_PLANS, INITIAL_HANDBOOK_ITEMS 
} from '../constants';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query,
  getDocs,
  writeBatch
} from 'firebase/firestore';

// Initial data for Brochures/Certs which are defined inside context previously
const INITIAL_BROCHURES: Brochure[] = [
  { id: '1', title: 'Full Stack Web Development', url: '#', subCategory: 'Job Bootcamp' },
  { id: '2', title: 'Data Analytics & Engineering', url: '#', subCategory: 'Job Bootcamp' },
  { id: '3', title: 'IIT Guwahati - Data Science', url: '#', subCategory: 'IIT PG' },
  { id: '4', title: 'College Student Special', url: '#', subCategory: 'Student' },
];

const INITIAL_CERTIFICATES: Certificate[] = [
  { id: '1', title: 'Full Stack Completion Certificate', url: '#', subCategory: 'Job Bootcamp' },
  { id: '2', title: 'Excellence Award Sample', url: '#', subCategory: 'Student' },
];

interface DataContextType {
  brochures: Brochure[];
  addBrochure: (brochure: Omit<Brochure, 'id'>) => void;
  deleteBrochure: (id: string) => void;
  
  certificates: Certificate[];
  addCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  deleteCertificate: (id: string) => void;

  faqs: FAQ[];
  addFaq: (faq: Omit<FAQ, 'id'>) => void;
  updateFaq: (id: string, faq: Omit<FAQ, 'id'>) => void;
  deleteFaq: (id: string) => void;

  alumni: Alumni[];
  addAlumni: (alumni: Omit<Alumni, 'id'>) => void;
  deleteAlumni: (id: string) => void;

  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;

  competitors: CompetitorFile[];
  addCompetitor: (competitor: Omit<CompetitorFile, 'id'>) => void;
  updateCompetitor: (id: string, competitor: Omit<CompetitorFile, 'id'>) => void;
  deleteCompetitor: (id: string) => void;

  importantLinks: ImportantLink[];
  addImportantLink: (link: Omit<ImportantLink, 'id'>) => void;
  updateImportantLink: (id: string, link: Omit<ImportantLink, 'id'>) => void;
  deleteImportantLink: (id: string) => void;

  salesScripts: SalesScript[];
  addSalesScript: (script: Omit<SalesScript, 'id'>) => void;
  updateSalesScript: (id: string, script: Omit<SalesScript, 'id'>) => void;
  deleteSalesScript: (id: string) => void;

  projects: ProjectAssignment[];
  addProject: (project: Omit<ProjectAssignment, 'id'>) => void;
  updateProject: (id: string, project: Omit<ProjectAssignment, 'id'>) => void;
  deleteProject: (id: string) => void;

  emiPlans: EMIPlan[];
  addEMIPlan: (plan: Omit<EMIPlan, 'id'>) => void;
  deleteEMIPlan: (id: string) => void;

  handbookItems: HandbookItem[];
  addHandbookItem: (item: Omit<HandbookItem, 'id'>) => void;
  deleteHandbookItem: (id: string) => void;
  
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seeding, setSeeding] = useState(true);
  const [loadedCollections, setLoadedCollections] = useState<Set<string>>(new Set());
  
  // State
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [competitors, setCompetitors] = useState<CompetitorFile[]>([]);
  const [importantLinks, setImportantLinks] = useState<ImportantLink[]>([]);
  const [salesScripts, setSalesScripts] = useState<SalesScript[]>([]);
  const [projects, setProjects] = useState<ProjectAssignment[]>([]);
  const [emiPlans, setEmiPlans] = useState<EMIPlan[]>([]);
  const [handbookItems, setHandbookItems] = useState<HandbookItem[]>([]);

  // Generic helper to seed data if collection is empty
  const seedCollection = async (collectionName: string, initialData: any[]) => {
    try {
      const q = query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log(`Seeding ${collectionName}...`);
        const batch = writeBatch(db);
        initialData.forEach((item) => {
          // Remove ID from item as Firestore creates its own, or use a new ref
          // We'll let firestore auto-id but we pass the fields
          const docRef = doc(collection(db, collectionName));
          const { id, ...data } = item;
          batch.set(docRef, data);
        });
        await batch.commit();
      }
    } catch (e) {
      console.error(`Error seeding ${collectionName}:`, e);
    }
  };

  // Seed data on mount
  useEffect(() => {
    const seedAll = async () => {
      await seedCollection('brochures', INITIAL_BROCHURES);
      await seedCollection('certificates', INITIAL_CERTIFICATES);
      await seedCollection('faqs', INITIAL_FAQS);
      await seedCollection('alumni', INITIAL_ALUMNI);
      await seedCollection('testimonials', INITIAL_TESTIMONIALS);
      await seedCollection('competitors', INITIAL_COMPETITORS);
      await seedCollection('links', INITIAL_IMPORTANT_LINKS);
      await seedCollection('scripts', INITIAL_SALES_SCRIPTS);
      await seedCollection('projects', INITIAL_PROJECTS);
      await seedCollection('emi', INITIAL_EMI_PLANS);
      await seedCollection('handbook', INITIAL_HANDBOOK_ITEMS);
      setSeeding(false);
    };
    seedAll();
  }, []);

  // Generic Listener
  const useCollectionListener = (collectionName: string, setState: Function) => {
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setState(items);
        setLoadedCollections(prev => {
          if (prev.has(collectionName)) return prev;
          const next = new Set(prev);
          next.add(collectionName);
          return next;
        });
      });
      return () => unsubscribe();
    }, [collectionName, setState]);
  };

  // Attach Listeners
  useCollectionListener('brochures', setBrochures);
  useCollectionListener('certificates', setCertificates);
  useCollectionListener('faqs', setFaqs);
  useCollectionListener('alumni', setAlumni);
  useCollectionListener('testimonials', setTestimonials);
  useCollectionListener('competitors', setCompetitors);
  useCollectionListener('links', setImportantLinks);
  useCollectionListener('scripts', setSalesScripts);
  useCollectionListener('projects', setProjects);
  useCollectionListener('emi', setEmiPlans);
  useCollectionListener('handbook', setHandbookItems);

  // CRUD Handlers
  const addToCollection = async (collectionName: string, data: any) => {
    await addDoc(collection(db, collectionName), data);
  };

  const deleteFromCollection = async (collectionName: string, id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  const updateInCollection = async (collectionName: string, id: string, data: any) => {
    await updateDoc(doc(db, collectionName, id), data);
  };

  // Loading is true if seeding is in progress OR if not all collections have emitted their initial snapshot
  // There are 11 collections being listened to.
  const loading = seeding || loadedCollections.size < 11;

  // Exported Functions
  return (
    <DataContext.Provider value={{ 
      loading,

      brochures, 
      addBrochure: (item) => addToCollection('brochures', item),
      deleteBrochure: (id) => deleteFromCollection('brochures', id),

      certificates,
      addCertificate: (item) => addToCollection('certificates', item),
      deleteCertificate: (id) => deleteFromCollection('certificates', id),

      faqs,
      addFaq: (item) => addToCollection('faqs', item),
      updateFaq: (id, item) => updateInCollection('faqs', id, item),
      deleteFaq: (id) => deleteFromCollection('faqs', id),

      alumni,
      addAlumni: (item) => addToCollection('alumni', item),
      deleteAlumni: (id) => deleteFromCollection('alumni', id),

      testimonials,
      addTestimonial: (item) => addToCollection('testimonials', item),
      deleteTestimonial: (id) => deleteFromCollection('testimonials', id),

      competitors,
      addCompetitor: (item) => addToCollection('competitors', item),
      updateCompetitor: (id, item) => updateInCollection('competitors', id, item),
      deleteCompetitor: (id) => deleteFromCollection('competitors', id),

      importantLinks,
      addImportantLink: (item) => addToCollection('links', item),
      updateImportantLink: (id, item) => updateInCollection('links', id, item),
      deleteImportantLink: (id) => deleteFromCollection('links', id),

      salesScripts,
      addSalesScript: (item) => addToCollection('scripts', item),
      updateSalesScript: (id, item) => updateInCollection('scripts', id, item),
      deleteSalesScript: (id) => deleteFromCollection('scripts', id),

      projects,
      addProject: (item) => addToCollection('projects', item),
      updateProject: (id, item) => updateInCollection('projects', id, item),
      deleteProject: (id) => deleteFromCollection('projects', id),

      emiPlans,
      addEMIPlan: (item) => addToCollection('emi', item),
      deleteEMIPlan: (id) => deleteFromCollection('emi', id),

      handbookItems,
      addHandbookItem: (item) => addToCollection('handbook', item),
      deleteHandbookItem: (id) => deleteFromCollection('handbook', id),
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

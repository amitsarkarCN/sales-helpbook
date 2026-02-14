import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useData } from '../context/DataContext';
import { BROCHURE_SUBCATEGORIES, FAQ_CATEGORIES, ALUMNI_CATEGORIES } from '../constants';
import { BrochureSubCategory, AlumniCategory, EMIPlanSubCategory } from '../types';
import { Trash2, Plus, FileText, ExternalLink, Lock, AlertCircle, Award, HelpCircle, Edit2, Users, Video, BarChart3, Link, MessageSquare, FolderKanban, CreditCard, GraduationCap, Loader2, Share2, Sparkles, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { GoogleGenAI, Type } from "@google/genai";

const AdminPanel: React.FC = () => {
  const { 
    loading: dataLoading,
    brochures, addBrochure, deleteBrochure,
    certificates, addCertificate, deleteCertificate,
    faqs, addFaq, updateFaq, deleteFaq,
    alumni, addAlumni, deleteAlumni,
    testimonials, addTestimonial, deleteTestimonial,
    testimonialPosts, addTestimonialPost, updateTestimonialPost, deleteTestimonialPost,
    competitors, addCompetitor, updateCompetitor, deleteCompetitor,
    importantLinks, addImportantLink, updateImportantLink, deleteImportantLink,
    salesScripts, addSalesScript, updateSalesScript, deleteSalesScript,
    projects, addProject, updateProject, deleteProject,
    emiPlans, addEMIPlan, deleteEMIPlan,
    handbookItems, addHandbookItem, deleteHandbookItem
  } = useData();
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // UI State
  const [activeTab, setActiveTab] = useState<'brochures' | 'certificates' | 'faqs' | 'alumni' | 'testimonials' | 'testimonialPosts' | 'competitors' | 'links' | 'scripts' | 'projects' | 'emi' | 'handbook'>('brochures');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState(''); 
  const [url, setUrl] = useState(''); 
  const [subCategory, setSubCategory] = useState<string>('Job Bootcamp'); 
  
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [alumniCategory, setAlumniCategory] = useState<AlumniCategory>('Software Development');
  const [ctc, setCtc] = useState('');
  const [year, setYear] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    resetForm();
    if (activeTab === 'faqs') {
      setSubCategory(FAQ_CATEGORIES[0]);
    } else if (activeTab === 'alumni') {
      setAlumniCategory('Software Development');
    } else if (activeTab === 'brochures' || activeTab === 'certificates' || activeTab === 'emi') {
      setSubCategory(BROCHURE_SUBCATEGORIES[0]);
    }
  }, [activeTab]);

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setCompany('');
    setDesignation('');
    setImageUrl('');
    setDetails('');
    setCtc('');
    setYear('');
    setEditingId(null);
    setFetchSuccess(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const fetchPostMetadata = async () => {
    if (!url || !url.startsWith('http')) {
      setError('Please enter a valid social media URL first.');
      return;
    }

    setIsFetchingMetadata(true);
    setError('');
    setFetchSuccess(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `I need metadata for this social media post: ${url}. 
        
        TASK:
        1. Identify the platform (LinkedIn, Instagram, Twitter/X).
        2. Extract or generate a professional title based on the post content (e.g., "Career Success: Rahul joins Google" or "Alumni Spotlight: Sneha's Feedback").
        3. Search for the most representative PUBLIC image URL. For Instagram, look for the post thumbnail. For LinkedIn, look for the 'og:image' or the profile picture of the author if it's a profile link.
        4. Return a direct URL to a JPG/PNG that is likely to be accessible.
        
        CRITICAL: Ensure the image URL is a direct link to a hosted image asset.`,
        config: {
          systemInstruction: 'You are a professional metadata extraction tool specializing in social media content. Your output must be strictly JSON format.',
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'A concise, professional title for the post.' },
              imageUrl: { type: Type.STRING, description: 'A publicly accessible direct image URL for the thumbnail.' },
              platform: { type: Type.STRING, description: 'The social media platform identified.' }
            },
            required: ['title', 'imageUrl'],
          },
        },
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      
      const data = JSON.parse(text);
      
      if (data.title) setTitle(data.title);
      if (data.imageUrl) setImageUrl(data.imageUrl);
      setFetchSuccess(true);
      
    } catch (err) {
      console.error('Metadata fetch error:', err);
      setError('Automated fetch failed for this URL. This usually happens if the post is private or platform-blocked. Please fill in the details manually.');
    } finally {
      setIsFetchingMetadata(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    if (activeTab === 'brochures') {
      addBrochure({ title, url, subCategory: subCategory as BrochureSubCategory });
    } else if (activeTab === 'certificates') {
      addCertificate({ title, url, subCategory: subCategory as BrochureSubCategory });
    } else if (activeTab === 'emi') {
      addEMIPlan({ title, url, subCategory: subCategory as EMIPlanSubCategory });
    } else if (activeTab === 'faqs') {
      if (editingId) {
        updateFaq(editingId, { question: title, answer: url, category: subCategory });
      } else {
        addFaq({ question: title, answer: url, category: subCategory });
      }
    } else if (activeTab === 'alumni') {
      addAlumni({
        name: title,
        linkedinProfile: url,
        currentCompany: company,
        designation: designation,
        imageUrl: imageUrl,
        category: alumniCategory,
        ctc: ctc,
        year: year
      });
    } else if (activeTab === 'testimonials') {
      addTestimonial({
        name: title,
        videoUrl: url,
        details: details
      });
    } else if (activeTab === 'testimonialPosts') {
      if (editingId) {
        updateTestimonialPost(editingId, { title, url, imageUrl });
      } else {
        addTestimonialPost({ title, url, imageUrl });
      }
    } else if (activeTab === 'competitors') {
      if (editingId) {
        updateCompetitor(editingId, { title, url });
      } else {
        addCompetitor({ title, url });
      }
    } else if (activeTab === 'links') {
      if (editingId) {
        updateImportantLink(editingId, { title, url });
      } else {
        addImportantLink({ title, url });
      }
    } else if (activeTab === 'scripts') {
      if (editingId) {
        updateSalesScript(editingId, { title, url });
      } else {
        addSalesScript({ title, url });
      }
    } else if (activeTab === 'projects') {
      if (editingId) {
        updateProject(editingId, { title, url });
      } else {
        addProject({ title, url });
      }
    } else if (activeTab === 'handbook') {
      addHandbookItem({ title, url });
    }
    
    resetForm();
  };

  const startEditFaq = (id: string, q: string, a: string, c: string) => {
    setEditingId(id);
    setTitle(q);
    setUrl(a);
    setSubCategory(c);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditItem = (id: string, t: string, u: string, img?: string) => {
    setEditingId(id);
    setTitle(t);
    setUrl(u);
    if (img) setImageUrl(img);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let currentList: any[] = [];
  let Icon: any = FileText;
  
  if (activeTab === 'brochures') {
    currentList = brochures;
    Icon = FileText;
  } else if (activeTab === 'certificates') {
    currentList = certificates;
    Icon = Award;
  } else if (activeTab === 'emi') {
    currentList = emiPlans;
    Icon = CreditCard;
  } else if (activeTab === 'faqs') {
    currentList = faqs;
    Icon = HelpCircle;
  } else if (activeTab === 'alumni') {
    currentList = alumni;
    Icon = Users;
  } else if (activeTab === 'testimonials') {
    currentList = testimonials;
    Icon = Video;
  } else if (activeTab === 'testimonialPosts') {
    currentList = testimonialPosts;
    Icon = Share2;
  } else if (activeTab === 'competitors') {
    currentList = competitors;
    Icon = BarChart3;
  } else if (activeTab === 'links') {
    currentList = importantLinks;
    Icon = Link;
  } else if (activeTab === 'scripts') {
    currentList = salesScripts;
    Icon = MessageSquare;
  } else if (activeTab === 'projects') {
    currentList = projects;
    Icon = FolderKanban;
  } else if (activeTab === 'handbook') {
    currentList = handbookItems;
    Icon = GraduationCap;
  }

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#f68d1e] mb-4" />
          <p className="text-gray-500 font-medium">Loading Database...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#f68d1e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#f68d1e]" />
              </div>
              <h2 className="text-2xl font-bold text-[#414141]">Sales Helpbook Admin</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] outline-none"
                  placeholder="admin@codingninjas.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-[#f68d1e] text-white font-medium py-3 rounded-lg hover:bg-[#e07b10] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const getLabel = (field: 'title' | 'url' | 'cat') => {
    if (activeTab === 'faqs') {
      if (field === 'title') return 'Question';
      if (field === 'url') return 'Answer (Text or URL)';
      if (field === 'cat') return 'Category';
    } else if (activeTab === 'alumni') {
      if (field === 'title') return 'Full Name';
      if (field === 'url') return 'LinkedIn Profile URL';
      if (field === 'cat') return 'Category';
    } else if (activeTab === 'testimonials') {
      if (field === 'title') return 'Student Name';
      if (field === 'url') return 'YouTube Video URL';
    } else if (activeTab === 'testimonialPosts') {
      if (field === 'title') return 'Post Title';
      if (field === 'url') return 'Social Media Link (LinkedIn/Instagram)';
    } else if (activeTab === 'competitors') {
      if (field === 'title') return 'Document Title';
      if (field === 'url') return 'PDF Link URL';
    } else if (activeTab === 'links') {
      if (field === 'title') return 'Link Title';
      if (field === 'url') return 'Destination URL';
    } else if (activeTab === 'scripts') {
      if (field === 'title') return 'Script Title';
      if (field === 'url') return 'PDF/Doc URL';
    } else if (activeTab === 'projects') {
      if (field === 'title') return 'Project Title';
      if (field === 'url') return 'Project URL';
    } else if (activeTab === 'emi') {
      if (field === 'title') return 'Plan Title';
      if (field === 'url') return 'PDF Link URL';
    } else if (activeTab === 'handbook') {
      if (field === 'title') return 'Handbook Title';
      if (field === 'url') return 'PDF Link URL';
    } else {
      if (field === 'title') return 'Title';
      if (field === 'url') return activeTab === 'brochures' ? 'URL' : 'Image/Link URL';
      if (field === 'cat') return 'Category';
    }
    return '';
  };

  const isSimpleItemTab = ['competitors', 'links', 'scripts', 'projects', 'handbook', 'testimonialPosts'].includes(activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#414141]">Admin Console</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              Connected: {user.email}
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-[#f68d1e] font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto pb-2">
          {['brochures', 'certificates', 'faqs', 'alumni', 'testimonials', 'testimonialPosts', 'competitors', 'links', 'scripts', 'projects', 'emi', 'handbook'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-4 text-sm font-medium transition-colors relative whitespace-nowrap capitalize ${
                activeTab === tab ? 'text-[#f68d1e]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'faqs' ? 'FAQ' : tab === 'emi' ? 'EMI Plans' : tab === 'testimonialPosts' ? 'Testimonial Posts' : tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f68d1e]" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#414141] mb-4 flex items-center gap-2">
                {editingId ? <Edit2 className="w-5 h-5 text-[#f68d1e]" /> : <Plus className="w-5 h-5 text-[#f68d1e]" />}
                {editingId ? 'Edit Entry' : `New ${activeTab === 'testimonialPosts' ? 'Testimonial Post' : 'Entry'}`}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* URL Input with Auto-Fetch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getLabel('url')}
                  </label>
                  <div className="flex flex-col gap-2">
                    {activeTab === 'faqs' ? (
                       <textarea
                       value={url}
                       onChange={(e) => setUrl(e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] outline-none transition-all h-24 resize-none"
                       required
                     />
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] outline-none transition-all"
                          required={activeTab !== 'alumni' && activeTab !== 'testimonialPosts'} 
                        />
                        {activeTab === 'testimonialPosts' && (
                          <button
                            type="button"
                            onClick={fetchPostMetadata}
                            disabled={isFetchingMetadata || !url}
                            className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all border ${
                              fetchSuccess 
                                ? 'bg-green-50 text-green-600 border-green-200' 
                                : 'bg-[#f68d1e]/10 text-[#f68d1e] border-[#f68d1e]/20 hover:bg-[#f68d1e] hover:text-white'
                            } disabled:opacity-50`}
                          >
                            {isFetchingMetadata ? <Loader2 className="w-3 h-3 animate-spin" /> : fetchSuccess ? <CheckCircle2 className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                            {isFetchingMetadata ? 'Analyzing Post...' : fetchSuccess ? 'Info Fetched Successfully' : '✨ Auto-Fetch Title & Thumbnail'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title / Name / Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getLabel('title')}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] outline-none"
                    required
                  />
                </div>

                {/* Thumbnail Preview Area */}
                {(activeTab === 'testimonialPosts' || activeTab === 'alumni') && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Image Preview</label>
                    <div className={`aspect-video w-full rounded-lg bg-gray-50 border border-dashed flex items-center justify-center overflow-hidden transition-colors ${imageUrl ? 'border-green-200' : 'border-gray-200'}`}>
                      {imageUrl ? (
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={() => setImageUrl('')} />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-300">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-[10px] font-medium uppercase tracking-wider">No Thumbnail</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gray-400">Manual Image URL (Override)</span>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Paste image address..."
                        className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded outline-none focus:border-[#f68d1e]"
                      />
                    </div>
                  </div>
                )}
                
                {activeTab === 'alumni' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Google" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. SDE" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" required />
                    </div>
                  </div>
                )}

                {activeTab === 'testimonials' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Story Details</label>
                    <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Batch, Placement details..." className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none h-24" required />
                  </div>
                )}

                {activeTab === 'alumni' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select value={alumniCategory} onChange={(e) => setAlumniCategory(e.target.value as AlumniCategory)} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none">
                        {ALUMNI_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                )}

                {!isSimpleItemTab && activeTab !== 'alumni' && activeTab !== 'testimonials' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none">
                      {activeTab === 'faqs' ? FAQ_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>) : BROCHURE_SUBCATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-[#f68d1e] text-white font-medium py-2.5 rounded-lg hover:bg-[#e07b10] transition-colors shadow-sm">
                    {editingId ? 'Update Entry' : 'Add to Helpbook'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="px-4 py-2.5 bg-gray-100 text-gray-600 font-medium rounded-lg transition-colors">Cancel</button>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-[10px] p-2 rounded flex items-start gap-1">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-[#414141] capitalize">
                  {activeTab === 'testimonialPosts' ? 'Testimonial Posts' : activeTab}
                </h2>
                <span className="bg-[#f68d1e]/10 text-[#f68d1e] text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {currentList.length} Total
                </span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {currentList.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No entries in this section yet.</div>
                ) : (
                  currentList.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start justify-between group gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-400 group-hover:text-[#f68d1e] group-hover:bg-[#f68d1e]/10 transition-colors mt-1 overflow-hidden w-12 h-12 flex items-center justify-center">
                          {(activeTab === 'alumni' || activeTab === 'testimonialPosts') && item.imageUrl ? (
                             <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                             <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#414141] text-sm md:text-base break-words">
                            {activeTab === 'faqs' ? item.question : activeTab === 'alumni' || activeTab === 'testimonials' ? item.name : item.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            {activeTab !== 'alumni' && activeTab !== 'testimonials' && !isSimpleItemTab && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                {activeTab === 'faqs' ? item.category : item.subCategory}
                              </span>
                            )}
                            {(item.url || item.linkedinProfile || item.videoUrl) && (
                              <a href={item.url || item.linkedinProfile || item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                                View Post <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {(activeTab === 'faqs' || isSimpleItemTab) && (
                          <button
                            onClick={() => {
                              if (activeTab === 'faqs') startEditFaq(item.id, item.question, item.answer, item.category);
                              else if (activeTab === 'testimonialPosts') startEditItem(item.id, item.title, item.url, item.imageUrl);
                              else startEditItem(item.id, item.title, item.url);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                             if (activeTab === 'brochures') deleteBrochure(item.id);
                             else if (activeTab === 'certificates') deleteCertificate(item.id);
                             else if (activeTab === 'alumni') deleteAlumni(item.id);
                             else if (activeTab === 'testimonials') deleteTestimonial(item.id);
                             else if (activeTab === 'testimonialPosts') deleteTestimonialPost(item.id);
                             else if (activeTab === 'competitors') deleteCompetitor(item.id);
                             else if (activeTab === 'links') deleteImportantLink(item.id);
                             else if (activeTab === 'scripts') deleteSalesScript(item.id);
                             else if (activeTab === 'projects') deleteProject(item.id);
                             else if (activeTab === 'emi') deleteEMIPlan(item.id);
                             else if (activeTab === 'handbook') deleteHandbookItem(item.id);
                             else deleteFaq(item.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
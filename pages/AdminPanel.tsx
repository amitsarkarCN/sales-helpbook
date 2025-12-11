import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useData } from '../context/DataContext';
import { BROCHURE_SUBCATEGORIES, FAQ_CATEGORIES, ALUMNI_CATEGORIES } from '../constants';
import { BrochureSubCategory, AlumniCategory, EMIPlanSubCategory } from '../types';
import { Trash2, Plus, FileText, ExternalLink, Lock, AlertCircle, Award, HelpCircle, Edit2, Users, Video, BarChart3, Link, MessageSquare, FolderKanban, CreditCard, GraduationCap } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { 
    loading,
    brochures, addBrochure, deleteBrochure,
    certificates, addCertificate, deleteCertificate,
    faqs, addFaq, updateFaq, deleteFaq,
    alumni, addAlumni, deleteAlumni,
    testimonials, addTestimonial, deleteTestimonial,
    competitors, addCompetitor, updateCompetitor, deleteCompetitor,
    importantLinks, addImportantLink, updateImportantLink, deleteImportantLink,
    salesScripts, addSalesScript, updateSalesScript, deleteSalesScript,
    projects, addProject, updateProject, deleteProject,
    emiPlans, addEMIPlan, deleteEMIPlan,
    handbookItems, addHandbookItem, deleteHandbookItem
  } = useData();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // UI State
  const [activeTab, setActiveTab] = useState<'brochures' | 'certificates' | 'faqs' | 'alumni' | 'testimonials' | 'competitors' | 'links' | 'scripts' | 'projects' | 'emi' | 'handbook'>('brochures');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State - Shared & Specific
  const [title, setTitle] = useState(''); // Used as 'Question' for FAQs, 'Name' for Alumni/Testimonial, 'Title' for others
  const [url, setUrl] = useState(''); // Used as 'Answer', 'LinkedIn', 'Video URL', 'PDF URL'
  const [subCategory, setSubCategory] = useState<string>('Job Bootcamp'); 
  
  // Specific for Alumni/Testimonial
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [alumniCategory, setAlumniCategory] = useState<AlumniCategory>('Software Development');
  const [ctc, setCtc] = useState('');
  const [year, setYear] = useState('');
  
  // Specific for Testimonials (Details)
  const [details, setDetails] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('sales_helpbook_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Reset form when tab changes
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
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Admin@CN2016') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sales_helpbook_auth', 'true');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sales_helpbook_auth');
    setUsername('');
    setPassword('');
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

  const startEditItem = (id: string, t: string, u: string) => {
    setEditingId(id);
    setTitle(t);
    setUrl(u);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to get current list based on tab
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f68d1e]"></div>
          <p className="mt-4 text-gray-500 font-medium">Initializing Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#f68d1e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#f68d1e]" />
              </div>
              <h2 className="text-2xl font-bold text-[#414141]">Admin Access</h2>
              <p className="text-gray-500 mt-2">Please sign in to manage content</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                  placeholder="Enter username"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f68d1e] text-white font-medium py-3 rounded-lg hover:bg-[#e07b10] transition-colors shadow-sm text-base mt-2"
              >
                Sign In
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

  const isSimpleItemTab = ['competitors', 'links', 'scripts', 'projects', 'handbook'].includes(activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#414141]">Admin Panel</h1>
            <p className="text-gray-500 mt-1">Manage content for Sales Helpbook</p>
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
          {['brochures', 'certificates', 'faqs', 'alumni', 'testimonials', 'competitors', 'links', 'scripts', 'projects', 'emi', 'handbook'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-4 text-sm font-medium transition-colors relative whitespace-nowrap capitalize ${
                activeTab === tab
                  ? 'text-[#f68d1e]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'faqs' ? 'FAQ' : tab === 'emi' ? 'EMI Plans' : tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f68d1e]" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Add New Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#414141] mb-4 flex items-center gap-2">
                {editingId ? <Edit2 className="w-5 h-5 text-[#f68d1e]" /> : <Plus className="w-5 h-5 text-[#f68d1e]" />}
                {editingId ? 'Edit Item' : `Add New ${activeTab === 'faqs' ? 'FAQ' : activeTab === 'alumni' ? 'Alumni' : activeTab === 'testimonials' ? 'Testimonial' : activeTab === 'competitors' ? 'Competitor Doc' : activeTab === 'emi' ? 'EMI Plan' : activeTab === 'handbook' ? 'Handbook' : 'Item'}`}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title / Name / Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getLabel('title')}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={activeTab === 'faqs' ? "e.g. What is the refund policy?" : "e.g. Title / Name"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                
                {/* Extra Fields for Alumni */}
                {activeTab === 'alumni' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Google"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CTC (Optional)</label>
                        <input
                          type="text"
                          value={ctc}
                          onChange={(e) => setCtc(e.target.value)}
                          placeholder="e.g. 24 LPA"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year (Optional)</label>
                        <input
                          type="text"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          placeholder="e.g. 2023"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={alumniCategory}
                        onChange={(e) => setAlumniCategory(e.target.value as AlumniCategory)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                      >
                         {ALUMNI_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                         ))}
                      </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                       <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </>
                )}

                {/* Extra fields for Testimonials */}
                {activeTab === 'testimonials' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Details (Batch, Placement, Hike etc.)</label>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Enter details..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all h-24 resize-none"
                      required
                    />
                  </div>
                )}

                {/* URL / Answer / LinkedIn / Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getLabel('url')}
                  </label>
                  {activeTab === 'faqs' ? (
                     <textarea
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     placeholder="Enter answer or paste URL..."
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all h-24 resize-none"
                     required
                   />
                  ) : (
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                      required={activeTab !== 'alumni'} 
                    />
                  )}
                </div>
                
                {/* Category Dropdown (Hidden for Alumni, Testimonials, Competitors, Links, Scripts, Projects) */}
                {activeTab !== 'alumni' && activeTab !== 'testimonials' && !isSimpleItemTab && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f68d1e] focus:border-transparent outline-none transition-all"
                    >
                      {activeTab === 'faqs' 
                        ? FAQ_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))
                        : BROCHURE_SUBCATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))
                      }
                    </select>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#f68d1e] text-white font-medium py-2.5 rounded-lg hover:bg-[#e07b10] transition-colors shadow-sm"
                  >
                    {editingId ? 'Update' : 'Add'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2.5 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Existing List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-[#414141] capitalize">
                  Existing {activeTab === 'faqs' ? 'FAQs' : activeTab === 'competitors' ? 'Competitor Files' : activeTab === 'emi' ? 'EMI Plans' : activeTab === 'handbook' ? 'Handbook Docs' : activeTab}
                </h2>
                <span className="bg-[#f68d1e]/10 text-[#f68d1e] text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {currentList.length} Total
                </span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {currentList.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No items added yet.
                  </div>
                ) : (
                  currentList.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start justify-between group gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-400 group-hover:text-[#f68d1e] group-hover:bg-[#f68d1e]/10 transition-colors mt-1">
                          {activeTab === 'alumni' && item.imageUrl ? (
                             <img src={item.imageUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                          ) : (
                             <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#414141] text-sm md:text-base break-words">
                            {activeTab === 'faqs' ? item.question : activeTab === 'alumni' || activeTab === 'testimonials' ? item.name : item.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            {activeTab !== 'alumni' && activeTab !== 'testimonials' && !isSimpleItemTab ? (
                              <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                {activeTab === 'faqs' ? item.category : item.subCategory}
                              </span>
                            ) : null}
                            
                            {activeTab === 'alumni' && (
                               <>
                               <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                 {item.category}
                               </span>
                               <span className="text-xs text-gray-500">
                                 {item.designation} at {item.currentCompany}
                               </span>
                               {(item.year || item.ctc) && (
                                 <span className="text-xs font-medium text-[#f68d1e] px-1.5 py-0.5 bg-[#f68d1e]/10 rounded">
                                   {[item.year, item.ctc].filter(Boolean).join(' • ')}
                                 </span>
                               )}
                               </>
                            )}

                            {activeTab !== 'faqs' && (item.url || item.linkedinProfile || item.videoUrl) && (
                              <a 
                                href={item.url || item.linkedinProfile || item.videoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                              >
                                View {activeTab === 'alumni' ? 'Profile' : activeTab === 'testimonials' ? 'Video' : 'Link'} <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          {activeTab === 'faqs' && (
                             <p className="text-xs text-gray-500 mt-1 line-clamp-2 break-all">{item.answer}</p>
                          )}
                          {activeTab === 'testimonials' && (
                             <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">{item.details}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                         {(activeTab === 'faqs' || isSimpleItemTab) && activeTab !== 'handbook' && (
                          <button
                            onClick={() => {
                              if (activeTab === 'faqs') startEditFaq(item.id, item.question, item.answer, item.category);
                              else startEditItem(item.id, item.title, item.url);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Item"
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
                             else if (activeTab === 'competitors') deleteCompetitor(item.id);
                             else if (activeTab === 'links') deleteImportantLink(item.id);
                             else if (activeTab === 'scripts') deleteSalesScript(item.id);
                             else if (activeTab === 'projects') deleteProject(item.id);
                             else if (activeTab === 'emi') deleteEMIPlan(item.id);
                             else if (activeTab === 'handbook') deleteHandbookItem(item.id);
                             else deleteFaq(item.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Item"
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
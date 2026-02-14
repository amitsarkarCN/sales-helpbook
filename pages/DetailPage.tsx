import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CATEGORIES, BROCHURE_SUBCATEGORIES, FAQ_CATEGORIES, ALUMNI_CATEGORIES } from '../constants';
import { Construction, FileText, Download, ExternalLink, ChevronRight, Award, HelpCircle, PlayCircle, Linkedin, User, Video, Youtube, BarChart3, Link, MessageSquare, FolderKanban, CreditCard, GraduationCap, Share2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, brochures, certificates, faqs, alumni, testimonials, testimonialPosts, competitors, importantLinks, salesScripts, projects, emiPlans, handbookItems } = useData();
  
  const [testimonialTab, setTestimonialTab] = useState<'videos' | 'posts'>('videos');

  let category = CATEGORIES.find(c => c.id === id);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header showBack />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f68d1e]"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header showBack />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-500">Category not found.</p>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  const renderBrochuresContent = () => (
    <div className="space-y-10">
      {BROCHURE_SUBCATEGORIES.map((subCat) => {
        const items = brochures.filter(b => b.subCategory === subCat);
        if (items.length === 0) return null;
        return (
          <div key={subCat} className="animate-fade-in">
            <h3 className="text-xl font-bold text-[#414141] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <ChevronRight className="w-5 h-5 text-[#f68d1e]" />
              {subCat}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((brochure) => (
                <a key={brochure.id} href={brochure.url} target="_blank" rel="noopener noreferrer" className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-start gap-4">
                  <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors">
                    <FileText className="w-6 h-6 text-[#f68d1e] group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors leading-tight mb-1">{brochure.title}</h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1">View Document <ExternalLink className="w-3 h-3" /></p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCertificatesContent = () => (
    <div className="space-y-10">
      {BROCHURE_SUBCATEGORIES.map((subCat) => {
        const items = certificates.filter(c => c.subCategory === subCat);
        if (items.length === 0) return null;
        return (
          <div key={subCat} className="animate-fade-in">
            <h3 className="text-xl font-bold text-[#414141] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <ChevronRight className="w-5 h-5 text-[#f68d1e]" />
              {subCat}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((cert) => (
                <a key={cert.id} href={cert.url} target="_blank" rel="noopener noreferrer" className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-start gap-4">
                  <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors">
                    <Award className="w-6 h-6 text-[#f68d1e] group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors leading-tight mb-1">{cert.title}</h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1">View Certificate <ExternalLink className="w-3 h-3" /></p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderFaqContent = () => (
    <div className="space-y-10">
      {FAQ_CATEGORIES.map((cat) => {
        const items = faqs.filter(f => f.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="animate-fade-in">
            <h3 className="text-xl font-bold text-[#414141] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <ChevronRight className="w-5 h-5 text-[#f68d1e]" />
              {cat}
            </h3>
            <div className="space-y-3">
              {items.map((faq) => {
                const isUrl = faq.answer.trim().startsWith('http');
                return (
                  <div key={faq.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-0.5"><HelpCircle className="w-5 h-5 text-[#f68d1e]" /></div>
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-[#414141] mb-2">{faq.question}</h4>
                        {isUrl ? (
                          <a href={faq.answer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f68d1e]/10 text-[#f68d1e] rounded-lg hover:bg-[#f68d1e] hover:text-white transition-colors text-sm font-medium">
                            <PlayCircle className="w-4 h-4" /> Watch Answer Video
                          </a>
                        ) : (
                          <div className="text-gray-600 text-sm whitespace-pre-wrap">{faq.answer}</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderAlumniContent = () => (
    <div className="space-y-8 animate-fade-in">
      {ALUMNI_CATEGORIES.map((categoryName) => {
        const categoryAlumni = alumni.filter(a => a.category === categoryName);
        if (categoryAlumni.length === 0) return null;
        return (
          <div key={categoryName} className="space-y-4">
            <h3 className="text-xl font-bold text-[#414141] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <ChevronRight className="w-5 h-5 text-[#f68d1e]" />
              {categoryName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryAlumni.map((alum) => (
                <div key={alum.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all group flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-gray-50 group-hover:border-[#f68d1e]/20 bg-gray-100 flex items-center justify-center">
                    {alum.imageUrl ? <img src={alum.imageUrl} alt={alum.name} className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-gray-400" />}
                  </div>
                  <h3 className="text-lg font-bold text-[#414141] mb-1">{alum.name}</h3>
                  <p className="text-[#f68d1e] font-medium text-sm mb-1">{alum.designation}</p>
                  <p className="text-gray-500 text-sm mb-4">{alum.currentCompany}</p>
                  {alum.linkedinProfile && (
                    <a href={alum.linkedinProfile} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-gray-500 hover:text-[#0077b5] text-sm font-medium">
                      <Linkedin className="w-4 h-4" /> View Profile
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTestimonialsContent = () => {
    const getYoutubeThumbnail = (url: string) => {
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
    };

    return (
      <div className="animate-fade-in">
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100 mb-8">
          <button 
            onClick={() => setTestimonialTab('videos')}
            className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${testimonialTab === 'videos' ? 'border-[#f68d1e] text-[#f68d1e]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            Success Videos
          </button>
          <button 
            onClick={() => setTestimonialTab('posts')}
            className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${testimonialTab === 'posts' ? 'border-[#f68d1e] text-[#f68d1e]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            Social Media Posts
          </button>
        </div>

        {testimonialTab === 'videos' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => {
              const thumbnailUrl = getYoutubeThumbnail(testimonial.videoUrl);
              return (
                <div key={testimonial.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col">
                  <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" className="relative aspect-video bg-gray-100 block group/video">
                    {thumbnailUrl ? <img src={thumbnailUrl} alt={testimonial.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><Video className="w-12 h-12" /></div>}
                    <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform"><PlayCircle className="w-6 h-6 text-[#f68d1e] fill-current" /></div>
                    </div>
                  </a>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-[#414141] mb-2">{testimonial.name}</h3>
                    <div className="text-sm text-gray-600 whitespace-pre-line flex-1">{testimonial.details}</div>
                    <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-[#f68d1e] font-medium text-sm hover:underline"><Youtube className="w-4 h-4" /> Watch on YouTube</a>
                  </div>
                </div>
              );
            })}
            {testimonials.length === 0 && <div className="col-span-full py-20 text-center text-gray-500">No success videos yet.</div>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialPosts.map((post) => (
              <a 
                key={post.id} 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Share2 className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-white">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-[#414141] group-hover:text-[#f68d1e] transition-colors line-clamp-2">{post.title}</h3>
                  <div className="mt-auto pt-3 text-xs text-gray-400 font-medium flex items-center gap-1.5">
                    Click to view post
                  </div>
                </div>
              </a>
            ))}
            {testimonialPosts.length === 0 && <div className="col-span-full py-20 text-center text-gray-500">No social media posts yet.</div>}
          </div>
        )}
      </div>
    );
  };

  const renderCompetitorsContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {competitors.map((item) => (
        <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-center gap-4">
          <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors flex-shrink-0"><BarChart3 className="w-6 h-6 text-[#f68d1e] group-hover:text-white" /></div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors truncate mb-1">{item.title}</h4>
            <p className="text-xs text-gray-400 flex items-center gap-1">View Analysis PDF <ExternalLink className="w-3 h-3" /></p>
          </div>
        </a>
      ))}
    </div>
  );

  const renderGenericListContent = (items: any[], type: 'link' | 'script' | 'project' | 'handbook') => {
    const TypeIcon = type === 'link' ? Link : type === 'script' ? MessageSquare : type === 'handbook' ? GraduationCap : FolderKanban;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-center gap-4">
            <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors flex-shrink-0"><TypeIcon className="w-6 h-6 text-[#f68d1e] group-hover:text-white" /></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors truncate mb-1">{item.title}</h4>
              <p className="text-xs text-gray-400 flex items-center gap-1">{type === 'link' ? 'Visit Link' : 'View Document'} <ExternalLink className="w-3 h-3" /></p>
            </div>
          </a>
        ))}
      </div>
    );
  };

  const renderEMIPlansContent = () => (
    <div className="space-y-10">
      {BROCHURE_SUBCATEGORIES.map((subCat) => {
        const items = emiPlans.filter(p => p.subCategory === subCat);
        if (items.length === 0) return null;
        return (
          <div key={subCat} className="animate-fade-in">
            <h3 className="text-xl font-bold text-[#414141] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <ChevronRight className="w-5 h-5 text-[#f68d1e]" /> {subCat}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((plan) => (
                <a key={plan.id} href={plan.url} target="_blank" rel="noopener noreferrer" className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-start gap-4">
                  <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors"><CreditCard className="w-6 h-6 text-[#f68d1e] group-hover:text-white" /></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors leading-tight mb-1">{plan.title}</h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1">View Plan PDF <ExternalLink className="w-3 h-3" /></p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const getRenderer = () => {
    switch (category?.id) {
      case 'brochures': return renderBrochuresContent();
      case 'certificates': return renderCertificatesContent();
      case 'faq': return renderFaqContent();
      case 'alumni': return renderAlumniContent();
      case 'testimonials': return renderTestimonialsContent();
      case 'competitors': return renderCompetitorsContent();
      case 'links': return renderGenericListContent(importantLinks, 'link');
      case 'scripts': return renderGenericListContent(salesScripts, 'script');
      case 'projects': return renderGenericListContent(projects, 'project');
      case 'emi': return renderEMIPlansContent();
      case 'handbook': return renderGenericListContent(handbookItems, 'handbook');
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showBack />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-[#414141] text-white p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0"><Icon className="w-8 h-8 md:w-10 md:h-10 text-[#f68d1e]" /></div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.title}</h1>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          {getRenderer()}
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CATEGORIES, BROCHURE_SUBCATEGORIES, FAQ_CATEGORIES, ALUMNI_CATEGORIES } from '../constants';
import { Construction, FileText, Download, ExternalLink, ChevronRight, Award, HelpCircle, PlayCircle, Linkedin, User, Video, Youtube, BarChart3, Link, MessageSquare, FolderKanban, CreditCard, GraduationCap } from 'lucide-react';
import { useData } from '../context/DataContext';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { brochures, certificates, faqs, alumni, testimonials, competitors, importantLinks, salesScripts, projects, emiPlans, handbookItems } = useData();

  // Handle special case for 'testimonials' which isn't in main CATEGORIES
  let category = CATEGORIES.find(c => c.id === id);
  
  if (id === 'testimonials') {
    category = {
      id: 'testimonials',
      title: 'Video Testimonials',
      description: 'Inspiring success stories from our alumni.',
      icon: Video
    };
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

  // Specific Renderer for Brochures
  const renderBrochuresContent = () => {
    return (
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
                  <a 
                    key={brochure.id}
                    href={brochure.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-start gap-4"
                  >
                    <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors">
                      <FileText className="w-6 h-6 text-[#f68d1e] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors leading-tight mb-1">
                        {brochure.title}
                      </h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        View Document <ExternalLink className="w-3 h-3" />
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
        
        {brochures.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No brochures available at the moment.
          </div>
        )}
      </div>
    );
  };

  // Specific Renderer for Certificates
  const renderCertificatesContent = () => {
    return (
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
                  <a 
                    key={cert.id}
                    href={cert.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-start gap-4"
                  >
                    <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors">
                      <Award className="w-6 h-6 text-[#f68d1e] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors leading-tight mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        View Certificate <ExternalLink className="w-3 h-3" />
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
        
        {certificates.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No certificates available at the moment.
          </div>
        )}
      </div>
    );
  };

  // Specific Renderer for FAQs
  const renderFaqContent = () => {
    return (
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
                    <div key={faq.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-0.5">
                           <HelpCircle className="w-5 h-5 text-[#f68d1e]" />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-base font-semibold text-[#414141] mb-2">{faq.question}</h4>
                           {isUrl ? (
                             <a 
                               href={faq.answer} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f68d1e]/10 text-[#f68d1e] rounded-lg hover:bg-[#f68d1e] hover:text-white transition-colors text-sm font-medium"
                             >
                               <PlayCircle className="w-4 h-4" />
                               Watch Answer Video
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
        
        {faqs.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No FAQs available at the moment.
          </div>
        )}
      </div>
    );
  };

  // Specific Renderer for Alumni
  const renderAlumniContent = () => {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#f68d1e]/10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#f68d1e]/20">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#414141]">Looking for Placement Data?</h3>
              <p className="text-sm text-gray-600">Access detailed reports and hiring statistics.</p>
            </div>
            <a 
              href="https://www.codingninjas.com/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#f68d1e] hover:bg-[#e07b10] text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm whitespace-nowrap"
            >
              Click Here
            </a>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-200">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#414141]">Looking for Video Testimonials?</h3>
              <p className="text-sm text-gray-600">Watch success stories from our alumni.</p>
            </div>
            <button 
              onClick={() => navigate('/section/testimonials')}
              className="bg-[#414141] hover:bg-black text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm whitespace-nowrap flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              Watch Videos
            </button>
          </div>
        </div>

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
                    <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-gray-50 group-hover:border-[#f68d1e]/20 transition-colors bg-gray-100 flex items-center justify-center">
                      {alum.imageUrl ? (
                        <img src={alum.imageUrl} alt={alum.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#414141] mb-1">{alum.name}</h3>
                    <p className="text-[#f68d1e] font-medium text-sm mb-1">{alum.designation}</p>
                    <p className="text-gray-500 text-sm mb-4">{alum.currentCompany}</p>
                    
                    {/* New Data Display - Improved Aesthetics */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {alum.year && (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          Batch {alum.year}
                        </div>
                      )}
                      {alum.ctc && (
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                          {alum.ctc}
                        </div>
                      )}
                    </div>

                    {alum.linkedinProfile && (
                      <a 
                        href={alum.linkedinProfile}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-2 text-gray-500 hover:text-[#0077b5] transition-colors text-sm font-medium"
                      >
                        <Linkedin className="w-4 h-4" />
                        View Profile
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {alumni.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No alumni profiles available at the moment.
          </div>
        )}
      </div>
    );
  };

  // Specific Renderer for Testimonials
  const renderTestimonialsContent = () => {
    const getYoutubeThumbnail = (url: string) => {
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
    };

    return (
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => {
            const thumbnailUrl = getYoutubeThumbnail(testimonial.videoUrl);
            return (
              <div key={testimonial.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col">
                <a 
                  href={testimonial.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative aspect-video bg-gray-100 block group/video"
                >
                  {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Video className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform">
                      <PlayCircle className="w-6 h-6 text-[#f68d1e] fill-current" />
                    </div>
                  </div>
                </a>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-[#414141] mb-2">{testimonial.name}</h3>
                  <div className="text-sm text-gray-600 whitespace-pre-line flex-1">
                    {testimonial.details}
                  </div>
                  <a 
                    href={testimonial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 text-[#f68d1e] font-medium text-sm hover:underline"
                  >
                    <Youtube className="w-4 h-4" />
                    Watch on YouTube
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No video testimonials available at the moment.
          </div>
        )}
      </div>
    );
  };

  // Specific Renderer for Competitors
  const renderCompetitorsContent = () => {
    return (
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitors.map((item) => (
            <a 
              key={item.id}
              href={item.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-center gap-4"
            >
              <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-[#f68d1e] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors leading-tight mb-1 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  View Analysis PDF <ExternalLink className="w-3 h-3" />
                </p>
              </div>
            </a>
          ))}
        </div>
        
        {competitors.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No competitor analysis documents available at the moment.
          </div>
        )}
      </div>
    );
  };

  // Generic List Renderer (Reusable for Links, Scripts, Projects)
  const renderGenericListContent = (items: any[], type: 'link' | 'script' | 'project' | 'handbook') => {
    const TypeIcon = type === 'link' ? Link : type === 'script' ? MessageSquare : type === 'handbook' ? GraduationCap : FolderKanban;
    const actionText = type === 'link' ? 'Visit Link' : 'View Document';

    return (
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <a 
              key={item.id}
              href={item.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-center gap-4"
            >
              <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors flex-shrink-0">
                <TypeIcon className="w-6 h-6 text-[#f68d1e] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors leading-tight mb-1 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  {actionText} <ExternalLink className="w-3 h-3" />
                </p>
              </div>
            </a>
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No items available at the moment.
          </div>
        )}
      </div>
    );
  };

  // Specific Renderer for EMI Plans
  const renderEMIPlansContent = () => {
    return (
      <div className="space-y-10">
        {BROCHURE_SUBCATEGORIES.map((subCat) => {
          const items = emiPlans.filter(p => p.subCategory === subCat);
          if (items.length === 0) return null;

          return (
            <div key={subCat} className="animate-fade-in">
              <h3 className="text-xl font-bold text-[#414141] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <ChevronRight className="w-5 h-5 text-[#f68d1e]" />
                {subCat}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((plan) => (
                  <a 
                    key={plan.id}
                    href={plan.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#f68d1e]/30 transition-all flex items-start gap-4"
                  >
                    <div className="bg-[#fff7ed] p-3 rounded-lg group-hover:bg-[#f68d1e] transition-colors">
                      <CreditCard className="w-6 h-6 text-[#f68d1e] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#414141] group-hover:text-[#f68d1e] transition-colors leading-tight mb-1">
                        {plan.title}
                      </h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        View Plan PDF <ExternalLink className="w-3 h-3" />
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
        
        {emiPlans.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No EMI plans available at the moment.
          </div>
        )}
      </div>
    );
  };

  // Default Placeholder for other categories
  const renderPlaceholder = () => (
    <div className="flex items-center justify-center py-16 flex-col text-center space-y-4">
      <div className="w-20 h-20 bg-[#f68d1e]/10 rounded-full flex items-center justify-center mb-4">
        <Construction className="w-10 h-10 text-[#f68d1e]" />
      </div>
      <h2 className="text-2xl font-bold text-[#414141]">Content Coming Soon</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        We are currently compiling the resources for <strong>{category?.title}</strong>. 
        Please check back later for updates.
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 flex items-center space-x-3 opacity-60">
            <div className="bg-gray-100 p-2 rounded">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
            <Download className="w-4 h-4 text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );

  const getRenderer = () => {
    switch (category?.id) {
      case 'brochures':
        return renderBrochuresContent();
      case 'certificates':
        return renderCertificatesContent();
      case 'faq':
        return renderFaqContent();
      case 'alumni':
        return renderAlumniContent();
      case 'testimonials':
        return renderTestimonialsContent();
      case 'competitors':
        return renderCompetitorsContent();
      case 'links':
        return renderGenericListContent(importantLinks, 'link');
      case 'scripts':
        return renderGenericListContent(salesScripts, 'script');
      case 'projects':
        return renderGenericListContent(projects, 'project');
      case 'emi':
        return renderEMIPlansContent();
      case 'handbook':
        return renderGenericListContent(handbookItems, 'handbook');
      default:
        return renderPlaceholder();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showBack />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Header Banner */}
          <div className="bg-[#414141] text-white p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
               <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#f68d1e]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.title}</h1>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          {getRenderer()}
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
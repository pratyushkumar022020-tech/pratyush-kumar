import React, { useState } from 'react';
import { 
  Lock, KeyRound, Palette, Image as ImageIcon, FileText, Users, 
  Building2, Camera, Calendar, Download, RefreshCw, Save, CheckCircle2, 
  AlertCircle, Trash2, Plus, Edit2, Eye, ShieldCheck, ArrowRight,
  ExternalLink, LogOut, Sun, Check, Upload, Globe, Phone, Mail, MapPin,
  Clock, Sparkles, FolderArchive
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { THEME_PRESETS } from '../data/cmsDefaults';
import { Doctor, Department, GalleryItem, Page } from '../types';

interface AdminPageProps {
  onNavigate: (page: Page) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const cms = useCms();
  const { config } = cms;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sarphi_admin_auth') === 'true';
  });
  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  type AdminTab = 'theme' | 'logo' | 'content' | 'doctors' | 'departments' | 'gallery' | 'appointments' | 'leads' | 'backup';
  const [activeTab, setActiveTab] = useState<AdminTab>('theme');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Lead management state
  const [leadRecipientInput, setLeadRecipientInput] = useState(config.leadRecipientEmail || 'roadydigital@gmail.com');
  const [privyrWebhookInput, setPrivyrWebhookInput] = useState(config.privyrWebhookUrl || 'https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/d4Sj1sEf');
  const [privyrTestStatus, setPrivyrTestStatus] = useState<string | null>(null);
  const [isTestingPrivyr, setIsTestingPrivyr] = useState(false);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');

  // Doctor editing modal state
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

  // Department editing state
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);

  // Gallery editing state
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const triggerSaveNotification = (msg: string = 'बदलाव सुरक्षित कर लिए गए हैं! (Changes saved)') => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === config.adminPasswordHash || inputPassword === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sarphi_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('गलत पासवर्ड! कृपया पुनः प्रयास करें। (Incorrect password, default is: admin123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sarphi_admin_auth');
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length >= 4) {
      cms.updateAdminPassword(newPassword.trim());
      setPasswordChangeSuccess(true);
      setNewPassword('');
      setTimeout(() => setPasswordChangeSuccess(false), 3000);
      triggerSaveNotification('पासवर्ड सफलतापूर्वक बदल दिया गया है!');
    }
  };

  // Image Upload helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await cms.savePhotoFile(file);
        callback(base64);
        triggerSaveNotification('फोटो अपलोड हो गई है!');
      } catch (err) {
        console.error('File upload error', err);
      }
    }
  };

  // =========================================================================
  // LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0B4F6C]/10 text-[#0B4F6C] flex items-center justify-center mx-auto border border-[#0B4F6C]/20 shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              एडमिन पैनल लॉगिन
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              वेबसाइट कंटेंट, फोटो व रंग डिजाइन प्रबंधित करने हेतु लॉगिन करें
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                एडमिन पासवर्ड (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="डिफ़ॉल्ट पासवर्ड: admin123"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0B4F6C] focus:ring-2 focus:ring-[#0B4F6C]/20 outline-hidden text-sm transition-all"
                  required
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                डिफ़ॉल्ट पासवर्ड: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-700">admin123</code>
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>लॉगिन करें (Access Dashboard)</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0B4F6C] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>← मुख्य वेबसाइट पर जाएं</span>
            </button>
            <span>v2.4 CMS Powered</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // AUTHENTICATED DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Top Admin Bar */}
      <header className="bg-[#0B4F6C] text-white py-3.5 px-4 sm:px-8 border-b border-slate-700 sticky top-0 z-40 shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-black text-sm border border-white/20">
              CMS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg leading-tight tracking-tight">
                  Sarphi CMS • कंट्रोल पैनल
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  लाइव मोड (Live)
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                कंटेंट, फोटो, कलर डिजाइन एवं अपॉइंटमेंट मैनेजर
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="वेबसाइट लाइव देखें"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-300" />
              <span>लाइव वेबसाइट</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-xs font-semibold text-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Save Success Notification */}
      {saveSuccessNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-sm font-bold">{saveSuccessNotice}</span>
        </div>
      )}

      {/* Main Admin Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex items-center gap-1.5 overflow-x-auto mb-6 scrollbar-none">
          <button
            onClick={() => setActiveTab('theme')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'theme'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Palette className="w-4 h-4 text-[#1995AD]" />
            <span>रंग एवं थीम (Colors & Theme)</span>
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'logo'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#1995AD]" />
            <span>लोगो एवं फोटो (Logo & Images)</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-[#1995AD]" />
            <span>पेज कंटेंट (Text Content)</span>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'doctors'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-[#1995AD]" />
            <span>डॉक्टर्स ({config.doctors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'departments'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#1995AD]" />
            <span>विभाग ({config.departments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Camera className="w-4 h-4 text-[#1995AD]" />
            <span>गैलरी फोटो</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer relative ${
              activeTab === 'appointments'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#1995AD]" />
            <span>मरीज अपॉइंटमेंट</span>
            {config.appointments.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center">
                {config.appointments.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer relative ${
              activeTab === 'leads'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4 text-[#1995AD]" />
            <span>लीड्स / पूछताछ (Leads)</span>
            {(config.leads || []).length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                {(config.leads || []).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-[#0B4F6C] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-[#1995AD]" />
            <span>बैकअप & पासवर्ड</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: THEME & COLOR DESIGN                                         */}
        {/* =================================================================== */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#0B4F6C]" />
                  <span>रंग एवं थीम चयन (Color Schemes & Custom Theme)</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  वेबसाइट का मुख्य रंग (Primary Color), एक्सेंट कलर (Secondary Accent), टॉप-बार व बैकग्राउंड को एक क्लिक में बदलें।
                </p>
              </div>

              {/* Ready-to-use Preset Color Themes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  1-क्लिक रेडीमेड कलर प्रीसेट (Choose Preset)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = config.theme.primaryColor === preset.primaryColor && config.theme.secondaryColor === preset.secondaryColor;
                    return (
                      <button
                        key={preset.name}
                        onClick={() => {
                          cms.updateTheme({
                            ...preset,
                            presetName: preset.name
                          });
                          triggerSaveNotification(`'${preset.name}' थीम लागू कर दी गई है!`);
                        }}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#0B4F6C] bg-[#0B4F6C]/5 ring-2 ring-[#0B4F6C]/30 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-900 block">
                            {preset.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded-full shadow-xs border border-white"
                              style={{ backgroundColor: preset.primaryColor }}
                              title="Primary"
                            />
                            <span
                              className="w-5 h-5 rounded-full shadow-xs border border-white"
                              style={{ backgroundColor: preset.secondaryColor }}
                              title="Secondary"
                            />
                            <span
                              className="w-5 h-5 rounded-full shadow-xs border border-white"
                              style={{ backgroundColor: preset.accentColor }}
                              title="Accent"
                            />
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Pickers */}
              <div className="pt-6 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                  कस्टम रंग चुनें (Custom Color Palette)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Primary Color */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      मुख्य ब्रांड रंग (Primary Brand)
                    </span>
                    <p className="text-[11px] text-slate-500">हेडर, प्राथमिक बटन व मुख्य शीर्षक</p>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="color"
                        value={config.theme.primaryColor}
                        onChange={(e) => {
                          cms.updateTheme({ primaryColor: e.target.value });
                        }}
                        className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={config.theme.primaryColor}
                        onChange={(e) => {
                          cms.updateTheme({ primaryColor: e.target.value });
                        }}
                        className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      सहायक रंग (Secondary / Accent)
                    </span>
                    <p className="text-[11px] text-slate-500">हाइलाइट्स, आइकन्स व बैज</p>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="color"
                        value={config.theme.secondaryColor}
                        onChange={(e) => {
                          cms.updateTheme({ secondaryColor: e.target.value });
                        }}
                        className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={config.theme.secondaryColor}
                        onChange={(e) => {
                          cms.updateTheme({ secondaryColor: e.target.value });
                        }}
                        className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Top Bar Announcement Color */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      टॉप अनाउंसमेंट बार (Top Bar)
                    </span>
                    <p className="text-[11px] text-slate-500">24x7 नोटिस और हेल्पलाइन पट्टी</p>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="color"
                        value={config.theme.topbarColor}
                        onChange={(e) => {
                          cms.updateTheme({ topbarColor: e.target.value });
                        }}
                        className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={config.theme.topbarColor}
                        onChange={(e) => {
                          cms.updateTheme({ topbarColor: e.target.value });
                        }}
                        className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Canvas Background Color */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      पेज बैकग्राउंड (Page Canvas)
                    </span>
                    <p className="text-[11px] text-slate-500">पूरे पेज का पृष्ठभूमि रंग</p>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="color"
                        value={config.theme.bgColor}
                        onChange={(e) => {
                          cms.updateTheme({ bgColor: e.target.value });
                        }}
                        className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={config.theme.bgColor}
                        onChange={(e) => {
                          cms.updateTheme({ bgColor: e.target.value });
                        }}
                        className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Theme Preview Box */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                  लाइव थीम पूर्वावलोकन (Real-Time Live Preview)
                </span>
                <div 
                  className="p-6 rounded-2xl border shadow-sm transition-all"
                  style={{
                    backgroundColor: config.theme.primaryColor,
                    color: '#ffffff'
                  }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <span className="text-xs font-bold tracking-wider uppercase opacity-80">
                        {config.hospital.name} • {config.hospital.taglineHindi}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black mt-1">
                        रंग बदलाव पूरे वेबसाइट पर तुरंत लागू हो गए हैं!
                      </h3>
                      <p className="text-xs text-slate-200 mt-1 max-w-lg">
                        हेडर, बटन, कार्ड्स व पूरे नेविगेशन में नए कलर्स सक्रिय हैं।
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        style={{
                          backgroundColor: config.theme.secondaryColor,
                          color: '#ffffff'
                        }}
                        className="px-5 py-2.5 rounded-xl font-bold text-xs shadow-md"
                      >
                        सेकेंडरी बटन
                      </button>
                      <button
                        onClick={() => onNavigate('home')}
                        className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-slate-900 shadow-md cursor-pointer"
                      >
                        होमपेज पर देखें →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: LOGO & PHOTOS                                                */}
        {/* =================================================================== */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#0B4F6C]" />
                  <span>लोगो एवं मुख्य फोटो प्रबंधन (Logo & Primary Photos)</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  वेबसाइट का मुख्य लोगो, हेरो बैनर फोटो और संस्थान का नाम-स्लोगन बदलें।
                </p>
              </div>

              {/* Logo Settings */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block">
                  1. वेबसाइट लोगो इमेज (Header & Footer Logo)
                </span>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Current Logo Preview */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-xs text-center space-y-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">वर्तमान लोगो (Preview)</span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 p-2 flex items-center justify-center border border-slate-200 overflow-hidden shadow-inner">
                      <img
                        src={config.logo.imageUrl || '/logo.svg'}
                        alt="Current Logo"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/logo.svg';
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {config.logo.titleText}
                    </span>
                  </div>

                  {/* Logo Upload & URL Options */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        कंप्यूटर / मोबाइल से नया लोगो अपलोड करें (Upload Image File)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => cms.updateLogo({ imageUrl: url }))}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0B4F6C] file:text-white hover:file:bg-[#08384D] file:cursor-pointer cursor-pointer border border-slate-300 rounded-xl p-1 bg-white"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">समर्थित फॉर्मेट: PNG, JPG, SVG, WebP</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        या लोगो का ऑनलाइन लिंक (Image URL)
                      </label>
                      <input
                        type="text"
                        value={config.logo.imageUrl}
                        onChange={(e) => cms.updateLogo({ imageUrl: e.target.value })}
                        placeholder="https://example.com/my-logo.png या /logo.svg"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#0B4F6C] outline-hidden bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          लोगो मुख्य शीर्षक (Brand Title)
                        </label>
                        <input
                          type="text"
                          value={config.logo.titleText}
                          onChange={(e) => cms.updateLogo({ titleText: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          लोगो उप-शीर्षक (Brand Subtitle)
                        </label>
                        <input
                          type="text"
                          value={config.logo.subtitleText}
                          onChange={(e) => cms.updateLogo({ subtitleText: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Section Visual Management */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block">
                  2. होमपेज हेरो सेक्शन इमेज (Hero Section Photo / Banner)
                </span>

                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.hero.useCustomHeroImage}
                      onChange={(e) => cms.updateHero({ useCustomHeroImage: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B4F6C]"></div>
                  </label>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    कस्टम फोटोग्राफ दिखाएं (Enable Custom Hero Photograph)
                  </span>
                </div>

                {config.hero.useCustomHeroImage ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-3">
                    <div className="md:col-span-5">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        कंप्यूटर से फोटो अपलोड करें
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => cms.updateHero({ heroImageUrl: url }))}
                        className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0B4F6C] file:text-white hover:file:bg-[#08384D] file:cursor-pointer cursor-pointer border border-slate-300 rounded-xl p-1 bg-white"
                      />
                      <div className="mt-3">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          या ऑनलाइन इमेज URL
                        </label>
                        <input
                          type="text"
                          value={config.hero.heroImageUrl || ''}
                          onChange={(e) => cms.updateHero({ heroImageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-7">
                      <span className="text-xs font-bold text-slate-600 block mb-1.5">फोटो प्रीव्यू:</span>
                      <div className="h-44 sm:h-52 w-full rounded-2xl bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center">
                        {config.hero.heroImageUrl ? (
                          <img
                            src={config.hero.heroImageUrl}
                            alt="Hero Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4 text-slate-400 text-xs">
                            कोई फोटो अपलोड नहीं है। (कृपया फोटो अपलोड करें या URL डालें)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-800">
                    ℹ️ वर्तमान में डिफ़ॉल्ट <strong>'बेस्ट हॉस्पिटल इन धनबाद'</strong> डिजिटल शोकेस कार्ड सक्रिय है। अपनी वास्तविक क्लिनिक/हॉस्पिटल फोटो लगाने हेतु ऊपर दिए गए टॉगल को चालू करें।
                  </div>
                )}
              </div>

              {/* About Section Image */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block">
                  3. 'हमारे बारे में' (About Us) सेक्शन फोटो
                </span>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        हॉस्पिटल भवन / डॉक्टर फोटो अपलोड करें
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => cms.updateAbout({ aboutImageUrl: url }))}
                        className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0B4F6C] file:text-white hover:file:bg-[#08384D] file:cursor-pointer cursor-pointer border border-slate-300 rounded-xl p-1 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        या इमेज URL
                      </label>
                      <input
                        type="text"
                        value={config.about.aboutImageUrl || ''}
                        onChange={(e) => cms.updateAbout({ aboutImageUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <div className="h-36 w-full rounded-2xl bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center">
                      {config.about.aboutImageUrl ? (
                        <img
                          src={config.about.aboutImageUrl}
                          alt="About Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">डिफ़ॉल्ट क्लिनिकल इलस्ट्रेशन सक्रिय है</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: CONTENT & TEXT                                               */}
        {/* =================================================================== */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0B4F6C]" />
                  <span>पेज कंटेंट एवं टेक्स्ट संपादन (Content & Text Editor)</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  हॉस्पिटल का नाम, संपर्क नंबर, पता, हेरो हेडलाइन, और विवरण आसानी से बदलें।
                </p>
              </div>

              {/* 1. General & Contact Information */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block border-b pb-2 border-slate-200">
                  1. सामान्य एवं संपर्क जानकारी (Hospital Info & Contacts)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      हॉस्पिटल का नाम (Hospital Name)
                    </label>
                    <input
                      type="text"
                      value={config.hospital.name}
                      onChange={(e) => cms.updateHospital({ name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      हिंदी टैगलाइन (Hindi Tagline)
                    </label>
                    <input
                      type="text"
                      value={config.hospital.taglineHindi}
                      onChange={(e) => cms.updateHospital({ taglineHindi: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-[#0B4F6C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      अंग्रेजी टैगलाइन (English Tagline)
                    </label>
                    <input
                      type="text"
                      value={config.hospital.taglineEnglish}
                      onChange={(e) => cms.updateHospital({ taglineEnglish: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      प्राथमिक हेल्पलाइन (Primary Phone)
                    </label>
                    <input
                      type="text"
                      value={config.hospital.phonePrimary}
                      onChange={(e) => cms.updateHospital({ phonePrimary: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      इमरजेंसी हेल्पलाइन (Emergency Phone)
                    </label>
                    <input
                      type="text"
                      value={config.hospital.phoneEmergency}
                      onChange={(e) => cms.updateHospital({ phoneEmergency: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-mono text-rose-600 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      आधिकारिक ईमेल (Official Email)
                    </label>
                    <input
                      type="email"
                      value={config.hospital.email}
                      onChange={(e) => cms.updateHospital({ email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      हॉस्पिटल का पूरा पता (Full Address)
                    </label>
                    <textarea
                      rows={2}
                      value={config.hospital.address}
                      onChange={(e) => cms.updateHospital({ address: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ओपीडी एवं विजिटिंग टाइमिंग (OPD & Visiting Hours)
                    </label>
                    <input
                      type="text"
                      value={config.hospital.opdHours}
                      onChange={(e) => cms.updateHospital({ opdHours: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white mb-2"
                    />
                    <input
                      type="text"
                      value={config.hospital.workingHours}
                      onChange={(e) => cms.updateHospital({ workingHours: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Hero Section Headlines */}
              <div className="space-y-4 pt-4">
                <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block border-b pb-2 border-slate-200">
                  2. हेरो सेक्शन हेडलाइन्स (Hero Section Headlines & Notice)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      टॉप अनाउंसमेंट बार टेक्स्ट (Top Notice Banner)
                    </label>
                    <input
                      type="text"
                      value={config.hero.announcementNotice}
                      onChange={(e) => cms.updateHero({ announcementNotice: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      हेरो Eyebrow बैज टेक्स्ट
                    </label>
                    <input
                      type="text"
                      value={config.hero.eyebrowHindi}
                      onChange={(e) => cms.updateHero({ eyebrowHindi: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      मुख्य H1 हेडलाइन (Bold Headline)
                    </label>
                    <input
                      type="text"
                      value={config.hero.headlineMain}
                      onChange={(e) => cms.updateHero({ headlineMain: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-extrabold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      उप-हेडलाइन लाइन 1
                    </label>
                    <input
                      type="text"
                      value={config.hero.headlineSub1}
                      onChange={(e) => cms.updateHero({ headlineSub1: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      उप-हेडलाइन लाइन 2
                    </label>
                    <input
                      type="text"
                      value={config.hero.headlineSub2}
                      onChange={(e) => cms.updateHero({ headlineSub2: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    हेरो मुख्य विवरण पैराग्राफ (Hero Description)
                  </label>
                  <textarea
                    rows={2}
                    value={config.hero.description}
                    onChange={(e) => cms.updateHero({ description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">विश्वास बिंदु 1</label>
                    <input
                      type="text"
                      value={config.hero.trustPoint1}
                      onChange={(e) => cms.updateHero({ trustPoint1: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">विश्वास बिंदु 2</label>
                    <input
                      type="text"
                      value={config.hero.trustPoint2}
                      onChange={(e) => cms.updateHero({ trustPoint2: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">विश्वास बिंदु 3</label>
                    <input
                      type="text"
                      value={config.hero.trustPoint3}
                      onChange={(e) => cms.updateHero({ trustPoint3: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 3. About Section */}
              <div className="space-y-4 pt-4">
                <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block border-b pb-2 border-slate-200">
                  3. 'हमारे बारे में' सेक्शन (About Hospital Narrative)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      सेक्शन शीर्षक (Section Heading)
                    </label>
                    <input
                      type="text"
                      value={config.about.heading}
                      onChange={(e) => cms.updateAbout({ heading: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      फिलॉसफी बॉक्स का शीर्षक
                    </label>
                    <input
                      type="text"
                      value={config.about.philosophyTitle}
                      onChange={(e) => cms.updateAbout({ philosophyTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    परिचय पैराग्राफ (Intro Text)
                  </label>
                  <textarea
                    rows={2}
                    value={config.about.introText}
                    onChange={(e) => cms.updateAbout({ introText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    हॉस्पिटल विजन एवं कम्युनिटी केयर (Philosophy Narrative)
                  </label>
                  <textarea
                    rows={3}
                    value={config.about.philosophyText}
                    onChange={(e) => cms.updateAbout({ philosophyText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: DOCTORS DIRECTORY                                            */}
        {/* =================================================================== */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#0B4F6C]" />
                    <span>डॉक्टर्स टीम प्रबंधन (Doctors Directory)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    डॉक्टरों की सूची देखें, नया डॉक्टर जोड़ें, अनुभव, ओपीडी समय व फोटो संपादित करें।
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newDoc: Doctor = {
                      id: 'doc-' + Date.now(),
                      name: 'डॉ. ',
                      title: 'सलाहकार चिकित्सक',
                      departmentId: config.departments[0]?.id || 'gen-med',
                      departmentName: config.departments[0]?.name || 'General Medicine',
                      qualifications: 'MBBS, MD',
                      experience: '5+ Years Experience',
                      opdTimings: '10:00 AM - 02:00 PM',
                      opdDays: 'Mon - Sat',
                      roomNumber: 'Chamber 101',
                      bio: 'वरिष्ठ विशेषज्ञ डॉक्टर।',
                      specializations: ['Clinical Consultations', 'Preventive Care'],
                      gender: 'male',
                      photoUrl: ''
                    };
                    setEditingDoctor(newDoc);
                    setIsDoctorModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया डॉक्टर जोड़ें (Add Doctor)</span>
                </button>
              </div>

              {/* Doctors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                          {doctor.photoUrl ? (
                            <img src={doctor.photoUrl} alt={doctor.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-7 h-7 text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-sm truncate">
                            {doctor.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#0B4F6C] block truncate">
                            {doctor.departmentName}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {doctor.qualifications}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 bg-white p-2.5 rounded-xl border border-slate-100">
                        <p><strong>अनुभव:</strong> {doctor.experience}</p>
                        <p><strong>ओपीडी समय:</strong> {doctor.opdTimings} ({doctor.opdDays})</p>
                        <p><strong>कक्ष संख्या:</strong> {doctor.roomNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <button
                        onClick={() => {
                          setEditingDoctor(doctor);
                          setIsDoctorModalOpen(true);
                        }}
                        className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>एडिट करें</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`क्या आप ${doctor.name} को हटाना चाहते हैं?`)) {
                            cms.updateDoctors(config.doctors.filter(d => d.id !== doctor.id));
                            triggerSaveNotification('डॉक्टर हटा दिया गया है!');
                          }
                        }}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>हटाएं</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Doctor Edit Modal */}
        {isDoctorModalOpen && editingDoctor && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <h3 className="font-bold text-lg text-slate-900">
                  डॉक्टर विवरण संपादित करें
                </h3>
                <button
                  onClick={() => setIsDoctorModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">डॉक्टर का नाम (Doctor Name)</label>
                  <input
                    type="text"
                    value={editingDoctor.name}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">विभाग (Department)</label>
                    <select
                      value={editingDoctor.departmentId}
                      onChange={(e) => {
                        const dept = config.departments.find(d => d.id === e.target.value);
                        setEditingDoctor({
                          ...editingDoctor,
                          departmentId: e.target.value,
                          departmentName: dept?.name || ''
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    >
                      {config.departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">योग्यता (Qualifications)</label>
                    <input
                      type="text"
                      value={editingDoctor.qualifications}
                      onChange={(e) => setEditingDoctor({ ...editingDoctor, qualifications: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">अनुभव (Experience)</label>
                    <input
                      type="text"
                      value={editingDoctor.experience}
                      onChange={(e) => setEditingDoctor({ ...editingDoctor, experience: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">कक्ष संख्या (Room No)</label>
                    <input
                      type="text"
                      value={editingDoctor.roomNumber}
                      onChange={(e) => setEditingDoctor({ ...editingDoctor, roomNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ओपीडी समय (OPD Timings)</label>
                    <input
                      type="text"
                      value={editingDoctor.opdTimings}
                      onChange={(e) => setEditingDoctor({ ...editingDoctor, opdTimings: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ओपीडी दिन (OPD Days)</label>
                    <input
                      type="text"
                      value={editingDoctor.opdDays}
                      onChange={(e) => setEditingDoctor({ ...editingDoctor, opdDays: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                {/* Doctor Photo Upload */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block font-bold text-slate-700 mb-1">डॉक्टर फोटो (Photo Upload / URL)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (url) => setEditingDoctor({ ...editingDoctor, photoUrl: url }))}
                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0B4F6C] file:text-white mb-2"
                  />
                  <input
                    type="text"
                    value={editingDoctor.photoUrl || ''}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, photoUrl: e.target.value })}
                    placeholder="या फोटो URL डालें (https://...)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">संक्षिप्त बायो (Brief Bio)</label>
                  <textarea
                    rows={2}
                    value={editingDoctor.bio}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDoctorModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const exists = config.doctors.some(d => d.id === editingDoctor.id);
                    if (exists) {
                      cms.updateDoctors(config.doctors.map(d => d.id === editingDoctor.id ? editingDoctor : d));
                    } else {
                      cms.updateDoctors([...config.doctors, editingDoctor]);
                    }
                    setIsDoctorModalOpen(false);
                    triggerSaveNotification('डॉक्टर सुरक्षित कर दिया गया है!');
                  }}
                  className="px-5 py-2 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-bold cursor-pointer"
                >
                  सुरक्षित करें (Save Doctor)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 5: DEPARTMENTS                                                  */}
        {/* =================================================================== */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#0B4F6C]" />
                    <span>चिकित्सा विभाग प्रबंधन (Departments & Services)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    विभिन्न विभागों के नाम, विवरण व सामान्य उपचार संपादित करें।
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newDept: Department = {
                      id: 'dept-' + Date.now(),
                      name: 'नया विभाग',
                      shortDesc: 'विभाग का संक्षिप्त विवरण।',
                      fullDesc: 'विभाग की विस्तृत जानकारी एवं चिकित्सा सुविधाएं।',
                      headOfDept: 'विभागाध्यक्ष',
                      commonTreatments: ['सामान्य परामर्श', 'डायग्नोस्टिक्स'],
                      facilities: ['विशेषज्ञ कक्ष'],
                      opdSchedule: 'सोम - शनि: 10:00 AM - 02:00 PM',
                      iconName: 'Stethoscope'
                    };
                    setEditingDept(newDept);
                    setIsDeptModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया विभाग जोड़ें (Add Department)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.departments.map((dept) => (
                  <div
                    key={dept.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {dept.name}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {dept.shortDesc}
                      </p>
                      <div className="text-[11px] text-slate-500 pt-1">
                        <strong>प्रमुख:</strong> {dept.headOfDept}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <button
                        onClick={() => {
                          setEditingDept(dept);
                          setIsDeptModalOpen(true);
                        }}
                        className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>एडिट करें</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`क्या आप '${dept.name}' विभाग को हटाना चाहते हैं?`)) {
                            cms.updateDepartments(config.departments.filter(d => d.id !== dept.id));
                            triggerSaveNotification('विभाग हटा दिया गया है!');
                          }
                        }}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>हटाएं</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Department Edit Modal */}
        {isDeptModalOpen && editingDept && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <h3 className="font-bold text-lg text-slate-900">
                  विभाग विवरण संपादित करें
                </h3>
                <button
                  onClick={() => setIsDeptModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">विभाग का नाम (Department Name)</label>
                  <input
                    type="text"
                    value={editingDept.name}
                    onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">विभागाध्यक्ष (Head of Dept)</label>
                  <input
                    type="text"
                    value={editingDept.headOfDept}
                    onChange={(e) => setEditingDept({ ...editingDept, headOfDept: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">संक्षिप्त विवरण (Short Description)</label>
                  <textarea
                    rows={2}
                    value={editingDept.shortDesc}
                    onChange={(e) => setEditingDept({ ...editingDept, shortDesc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">विस्तृत विवरण (Full Description)</label>
                  <textarea
                    rows={3}
                    value={editingDept.fullDesc}
                    onChange={(e) => setEditingDept({ ...editingDept, fullDesc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ओपीडी समय (Schedule)</label>
                  <input
                    type="text"
                    value={editingDept.opdSchedule}
                    onChange={(e) => setEditingDept({ ...editingDept, opdSchedule: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDeptModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const exists = config.departments.some(d => d.id === editingDept.id);
                    if (exists) {
                      cms.updateDepartments(config.departments.map(d => d.id === editingDept.id ? editingDept : d));
                    } else {
                      cms.updateDepartments([...config.departments, editingDept]);
                    }
                    setIsDeptModalOpen(false);
                    triggerSaveNotification('विभाग सुरक्षित कर दिया गया है!');
                  }}
                  className="px-5 py-2 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-bold cursor-pointer"
                >
                  सुरक्षित करें
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 6: GALLERY                                                      */}
        {/* =================================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#0B4F6C]" />
                    <span>फोटो गैलरी प्रबंधन (Facility Photos)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    ऑपरेशन थिएटर, आईसीयू, पैथोलॉजी लैब व वार्ड्स की फोटो जोड़ें या बदलें।
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newItem: GalleryItem = {
                      id: 'gal-' + Date.now(),
                      title: 'नई सुविधा फोटो',
                      category: 'हॉस्पिटल सुविधा',
                      description: 'सुविधा का विवरण।',
                      imageUrl: ''
                    };
                    setEditingGalleryItem(newItem);
                    setIsGalleryModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नई फोटो जोड़ें (Add Photo)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div className="h-44 bg-slate-200 overflow-hidden relative">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                          <Camera className="w-8 h-8 mb-1" />
                          <span className="text-xs">क्लिनिकल इलस्ट्रेशन सक्रिय</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingGalleryItem(item);
                          setIsGalleryModalOpen(true);
                        }}
                        className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>फोटो बदलें</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`क्या आप '${item.title}' फोटो को हटाना चाहते हैं?`)) {
                            cms.updateGalleryItems(config.galleryItems.filter(g => g.id !== item.id));
                            triggerSaveNotification('फोटो हटा दी गई है!');
                          }
                        }}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>हटाएं</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Edit Modal */}
        {isGalleryModalOpen && editingGalleryItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <h3 className="font-bold text-lg text-slate-900">
                  गैलरी फोटो जोड़ें / बदलें
                </h3>
                <button onClick={() => setIsGalleryModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">फोटो शीर्षक (Title)</label>
                  <input
                    type="text"
                    value={editingGalleryItem.title}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">श्रेणी (Category)</label>
                  <input
                    type="text"
                    value={editingGalleryItem.category}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">कंप्यूटर से फोटो अपलोड करें</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (url) => setEditingGalleryItem({ ...editingGalleryItem, imageUrl: url }))}
                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0B4F6C] file:text-white mb-2 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingGalleryItem.imageUrl || ''}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, imageUrl: e.target.value })}
                    placeholder="या ऑनलाइन इमेज URL (https://...)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">विवरण (Description)</label>
                  <textarea
                    rows={2}
                    value={editingGalleryItem.description}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const exists = config.galleryItems.some(g => g.id === editingGalleryItem.id);
                    if (exists) {
                      cms.updateGalleryItems(config.galleryItems.map(g => g.id === editingGalleryItem.id ? editingGalleryItem : g));
                    } else {
                      cms.updateGalleryItems([...config.galleryItems, editingGalleryItem]);
                    }
                    setIsGalleryModalOpen(false);
                    triggerSaveNotification('गैलरी फोटो सुरक्षित कर दी गई है!');
                  }}
                  className="px-5 py-2 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-bold cursor-pointer"
                >
                  सुरक्षित करें
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 7: APPOINTMENTS                                                 */}
        {/* =================================================================== */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#0B4F6C]" />
                    <span>मरीज अपॉइंटमेंट अनुरोध (Patient Appointments)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    वेबसाइट से मरीजों द्वारा सबमिट किए गए अपॉइंटमेंट फॉर्म्स की सूची।
                  </p>
                </div>

                {config.appointments.length > 0 && (
                  <button
                    onClick={() => {
                      const csvHeader = "ID,Patient Name,Phone,Age,Gender,Department,Date,Slot,Status,Created At\n";
                      const csvRows = config.appointments.map(a => 
                        `"${a.id}","${a.patientName}","${a.patientPhone}","${a.patientAge}","${a.patientGender}","${a.departmentId}","${a.appointmentDate}","${a.preferredSlot}","${a.status}","${a.createdAt}"`
                      ).join("\n");
                      const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.setAttribute('href', url);
                      link.setAttribute('download', `patient-appointments-${new Date().toISOString().slice(0, 10)}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#0B4F6C]" />
                    <span>CSV में डाउनलोड करें (Export CSV)</span>
                  </button>
                )}
              </div>

              {config.appointments.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="font-bold text-slate-700 text-sm">अभी तक कोई अपॉइंटमेंट नहीं आया है</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    जैसे ही कोई मरीज वेबसाइट पर 'Book an Appointment' फॉर्म भरेगा, उसका विवरण यहाँ स्वतः प्रदर्शित होगा।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="p-3.5">मरीज का नाम</th>
                        <th className="p-3.5">फोन नंबर</th>
                        <th className="p-3.5">उम्र / लिंग</th>
                        <th className="p-3.5">दिनांक & स्लॉट</th>
                        <th className="p-3.5">स्थिति (Status)</th>
                        <th className="p-3.5 text-right">कार्रवाई</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {config.appointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900">
                            {appt.patientName}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {new Date(appt.createdAt).toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-slate-800">
                            <a href={`tel:${appt.patientPhone}`} className="text-[#0B4F6C] hover:underline font-bold">
                              {appt.patientPhone}
                            </a>
                          </td>
                          <td className="p-3.5 text-slate-600">
                            {appt.patientAge} वर्ष • {appt.patientGender}
                          </td>
                          <td className="p-3.5 text-slate-700">
                            <strong>{appt.appointmentDate}</strong>
                            <span className="block text-[11px] text-slate-500">{appt.preferredSlot}</span>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => {
                                const nextStatus = appt.status === 'confirmed' ? 'pending' : 'confirmed';
                                cms.updateAppointmentStatus(appt.id, nextStatus);
                              }}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                appt.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}
                            >
                              {appt.status === 'confirmed' ? '✓ स्वीकृत (Confirmed)' : '⏳ लंबित (Pending)'}
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`क्या आप ${appt.patientName} का अपॉइंटमेंट हटाना चाहते हैं?`)) {
                                  cms.deleteAppointment(appt.id);
                                }
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                              title="हटाएं"
                            >
                              <Trash2 className="w-4 h-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 8: LEADS & ENQUIRIES (रोडी डिजिटल ईमेल इंटीग्रेशन)             */}
        {/* =================================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Header & CSV Export */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#0B4F6C]" />
                    <span>कांटेक्ट लीड्स एवं पूछताछ (Contact Leads & Inquiries)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Contact Us फॉर्म से भरे गए सभी विवरण (नाम, फोन नंबर, ईमेल एड्रेस, सर्विस, डेट ऑफ बर्थ) सीधे <strong className="text-[#0B4F6C] font-semibold">{config.leadRecipientEmail || 'roadydigital@gmail.com'}</strong> पर भेजे जाते हैं और यहाँ भी सुरक्षित स्टोर रहते हैं।
                  </p>
                </div>

                {(config.leads || []).length > 0 && (
                  <button
                    onClick={() => {
                      const csvHeader = "ID,Patient Name,Phone,Email,Service,Date of Birth,Preferred Date,Preferred Time,Message,Sent To Email,Status,Submitted At\n";
                      const csvRows = (config.leads || []).map(l => 
                        `"${l.id}","${l.name}","${l.phone}","${l.email || ''}","${l.service}","${l.dateOfBirth}","${l.preferredDate || ''}","${l.preferredTime || ''}","${(l.message || '').replace(/"/g, '""')}","${l.sentToEmail}","${l.status}","${l.submittedAt}"`
                      ).join("\n");
                      const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.setAttribute('href', url);
                      link.setAttribute('download', `sarphi-leads-${new Date().toISOString().slice(0, 10)}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#0B4F6C]" />
                    <span>सभी लीड्स CSV में डाउनलोड करें (Export CSV)</span>
                  </button>
                )}
              </div>

              {/* Target Email Configuration Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-white border border-sky-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      <span>लीड प्राप्त करने वाला ईमेल (Recipient Email Setup)</span>
                    </span>
                    <p className="text-xs text-slate-600">
                      सभी नए कांटेक्ट फॉर्म सबमिशन सीधे इस ईमेल पते पर फॉरवर्ड किए जाते हैं:
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold w-fit flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active: {config.leadRecipientEmail || 'roadydigital@gmail.com'}</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={leadRecipientInput}
                      onChange={(e) => setLeadRecipientInput(e.target.value)}
                      placeholder="e.g. roadydigital@gmail.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl text-xs border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (leadRecipientInput.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadRecipientInput.trim())) {
                        cms.updateLeadRecipientEmail(leadRecipientInput.trim());
                        triggerSaveNotification(`लीड ईमेल को ${leadRecipientInput.trim()} पर अपडेट कर दिया गया है!`);
                      } else {
                        alert('कृपया वैध ईमेल पता दर्ज करें (Please enter a valid email address)');
                      }
                    }}
                    className="px-5 py-2 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#1995AD]" />
                    <span>ईमेल सुरक्षित करें (Save)</span>
                  </button>
                </div>
              </div>

              {/* Privyr CRM Generic Webhook Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-slate-50 to-white border border-purple-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-purple-700" />
                      <span>Privyr CRM Webhook Integration (लाइव वेबहुक)</span>
                    </span>
                    <p className="text-xs text-slate-600">
                      वेबसाइट पर भरा जाने वाला कोई भी लीड फॉर्म या अपॉइंटमेंट फॉर्म तुरंत इस Privyr Webhook पर पोस्ट होता है:
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold w-fit flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Privyr Connected</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      value={privyrWebhookInput}
                      onChange={(e) => setPrivyrWebhookInput(e.target.value)}
                      placeholder="https://www.privyr.com/api/v1/incoming-leads/..."
                      className="w-full px-4 py-2 rounded-xl text-xs border border-slate-300 bg-white font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (privyrWebhookInput.trim().startsWith('http')) {
                        cms.updatePrivyrWebhookUrl(privyrWebhookInput.trim());
                        triggerSaveNotification('Privyr Webhook URL सुरक्षित कर लिया गया है!');
                      } else {
                        alert('कृपया वैध Webhook URL दर्ज करें');
                      }
                    }}
                    className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Webhook सेव करें</span>
                  </button>

                  <button
                    disabled={isTestingPrivyr}
                    onClick={async () => {
                      setIsTestingPrivyr(true);
                      setPrivyrTestStatus(null);
                      const res = await cms.postToPrivyr({
                        name: "Privyr Test Lead",
                        phone: "+919876543210",
                        email: "test@privyr.com",
                        notes: "Privyr integration test from Sarphi Hospital Admin Panel",
                        lead_source: "Admin Panel Test"
                      });
                      setIsTestingPrivyr(false);
                      if (res.success) {
                        setPrivyrTestStatus("✓ Privyr Webhook पर टेस्ट लीड सफलतापूर्वक पहुँच गई है (Status: Success 200)!");
                      } else {
                        setPrivyrTestStatus("⚠️ Webhook प्रतिक्रिया मिली। कृपया Privyr डैशबोर्ड चेक करें।");
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-purple-300 hover:bg-purple-50 text-purple-900 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isTestingPrivyr ? (
                      <span className="w-3.5 h-3.5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    )}
                    <span>टेस्ट लीड भेजें (Test)</span>
                  </button>
                </div>

                {privyrTestStatus && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{privyrTestStatus}</span>
                  </div>
                )}
              </div>

              {/* Lead Counts Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">कुल लीड्स (Total)</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">{(config.leads || []).length}</div>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <span className="text-[11px] font-bold text-rose-700 uppercase">नई लीड्स (New)</span>
                  <div className="text-2xl font-black text-rose-900 mt-1">
                    {(config.leads || []).filter(l => l.status === 'new').length}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[11px] font-bold text-amber-700 uppercase">संपर्क किया (Contacted)</span>
                  <div className="text-2xl font-black text-amber-900 mt-1">
                    {(config.leads || []).filter(l => l.status === 'contacted').length}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">समाधान हुआ (Resolved)</span>
                  <div className="text-2xl font-black text-emerald-900 mt-1">
                    {(config.leads || []).filter(l => l.status === 'resolved').length}
                  </div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              {(config.leads || []).length > 0 && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      value={leadSearchQuery}
                      onChange={(e) => setLeadSearchQuery(e.target.value)}
                      placeholder="नाम, फोन, ईमेल या सर्विस द्वारा खोजें..."
                      className="w-full px-4 py-2 rounded-xl text-xs border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">स्थिति:</span>
                    <select
                      value={leadStatusFilter}
                      onChange={(e) => setLeadStatusFilter(e.target.value as any)}
                      className="px-3 py-1.5 rounded-xl text-xs border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] cursor-pointer"
                    >
                      <option value="all">सभी (All Status)</option>
                      <option value="new">नई (New)</option>
                      <option value="contacted">संपर्क किया (Contacted)</option>
                      <option value="resolved">समाधान हुआ (Resolved)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Leads Table / Cards */}
              {(config.leads || []).length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 text-[#0B4F6C] flex items-center justify-center mx-auto">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">अभी तक कोई लीड प्राप्त नहीं हुई है</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      जैसे ही कोई मरीज वेबसाइट पर Contact Us फॉर्म में नाम, फोन नंबर, ईमेल, सर्विस और डेट ऑफ बर्थ भरेगा, वह सीधे <strong>{config.leadRecipientEmail || 'roadydigital@gmail.com'}</strong> पर पहुँच जाएगा और यहाँ भी दिखेगा।
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-5 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Contact Us पेज पर जाकर टेस्ट लीड भेजें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="p-3.5">मरीज का नाम (Name)</th>
                        <th className="p-3.5">फोन & संपर्क (Phone)</th>
                        <th className="p-3.5">सर्विस (Service)</th>
                        <th className="p-3.5">डेट ऑफ बर्थ (DOB)</th>
                        <th className="p-3.5">संदेश / समस्या</th>
                        <th className="p-3.5">स्थिति (Status)</th>
                        <th className="p-3.5 text-right">कार्रवाई</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {(config.leads || [])
                        .filter(l => {
                          const matchesQuery = 
                            !leadSearchQuery.trim() ||
                            l.name.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
                            l.phone.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
                            (l.email && l.email.toLowerCase().includes(leadSearchQuery.toLowerCase())) ||
                            l.service.toLowerCase().includes(leadSearchQuery.toLowerCase());
                          const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
                          return matchesQuery && matchesStatus;
                        })
                        .map((lead) => {
                          const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                          const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

                          return (
                            <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3.5">
                                <strong className="text-slate-900 font-bold block">{lead.name}</strong>
                                <span className="text-[10px] text-slate-400 font-normal block">
                                  {new Date(lead.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                                </span>
                                <span className="inline-block mt-0.5 text-[9px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                                  Sent to: {lead.sentToEmail}
                                </span>
                              </td>

                              <td className="p-3.5 space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <a
                                    href={`tel:${lead.phone}`}
                                    className="font-bold text-[#0B4F6C] hover:underline font-mono"
                                  >
                                    {lead.phone}
                                  </a>
                                  {cleanPhone && (
                                    <a
                                      href={`https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for contacting Sarphi Hospital regarding ${lead.service}. How can we assist you?`)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold hover:bg-emerald-200 transition-colors"
                                      title="WhatsApp पर चैट करें"
                                    >
                                      WA
                                    </a>
                                  )}
                                </div>
                                {lead.email && (
                                  <a
                                    href={`mailto:${lead.email}`}
                                    className="text-slate-500 hover:text-slate-800 text-[11px] block truncate max-w-[150px]"
                                    title={lead.email}
                                  >
                                    {lead.email}
                                  </a>
                                )}
                              </td>

                              <td className="p-3.5">
                                <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-[#0B4F6C] font-semibold text-xs border border-slate-200">
                                  {lead.service}
                                </span>
                                {lead.preferredDate && (
                                  <span className="block text-[10px] text-slate-500 mt-1">
                                    Date: {lead.preferredDate} ({lead.preferredTime || 'Anytime'})
                                  </span>
                                )}
                              </td>

                              <td className="p-3.5">
                                <strong className="text-slate-800 block">{lead.dateOfBirth}</strong>
                                {lead.dateOfBirth && (
                                  <span className="text-[10px] font-semibold text-slate-500">
                                    जन्म तिथि (DOB)
                                  </span>
                                )}
                              </td>

                              <td className="p-3.5 text-slate-600 max-w-xs">
                                <p className="line-clamp-2 text-[11px]">
                                  {lead.message || <span className="text-slate-400 italic">कोई अतिरिक्त संदेश नहीं</span>}
                                </p>
                              </td>

                              <td className="p-3.5">
                                <select
                                  value={lead.status}
                                  onChange={(e) => {
                                    cms.updateLeadStatus(lead.id, e.target.value as any);
                                    triggerSaveNotification(`लीड स्थिति: ${e.target.value}`);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer border ${
                                    lead.status === 'new'
                                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                                      : lead.status === 'contacted'
                                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  }`}
                                >
                                  <option value="new">🔴 नई लीड (New)</option>
                                  <option value="contacted">🟡 संपर्क किया (Contacted)</option>
                                  <option value="resolved">🟢 पूर्ण (Resolved)</option>
                                </select>
                              </td>

                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => {
                                    if (confirm(`क्या आप ${lead.name} की यह लीड हटाना चाहते हैं?`)) {
                                      cms.deleteLead(lead.id);
                                      triggerSaveNotification('लीड हटा दी गई!');
                                    }
                                  }}
                                  className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                                  title="लीड हटाएं"
                                >
                                  <Trash2 className="w-4 h-4 inline" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 9: BACKUP, EXPORT & PASSWORD                                    */}
        {/* =================================================================== */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FolderArchive className="w-5 h-5 text-[#0B4F6C]" />
                  <span>बैकअप, एक्सपोर्ट एवं एडमिन सुरक्षा (Backup & Settings)</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  अपनी सभी सेटिंग्स व कंटेंट को डाउनलोड करें ताकि सर्वर पर सुरक्षित रखा जा सके।
                </p>
              </div>

              {/* Export / Import Config */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block">
                    सेटिंग्स एक्सपोर्ट (Export Settings JSON)
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    आपके सभी रंग, फोटो, टेक्स्ट, डॉक्टर्स व संपर्क जानकारी को एक JSON फ़ाइल में बैकअप लें।
                  </p>
                  <button
                    onClick={() => cms.exportConfigJson()}
                    className="px-5 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>बैकअप डाउनलोड करें (Download JSON)</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block">
                    सेटिंग्स इम्पोर्ट (Restore Backup)
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    पहले से डाउनलोड की गई बैकअप JSON फ़ाइल को अपलोड करके सभी सेटिंग्स रीस्टोर करें।
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const content = event.target?.result as string;
                          const ok = cms.importConfigJson(content);
                          if (ok) {
                            triggerSaveNotification('बैकअप सफलतापूर्वक रीस्टोर हो गया!');
                          } else {
                            alert('अमान्य JSON फ़ाइल!');
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white cursor-pointer"
                  />
                </div>
              </div>

              {/* Change Admin Password */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  एडमिन पासवर्ड बदलें (Change Admin Password)
                </span>

                <form onSubmit={handlePasswordUpdate} className="flex items-center gap-3 flex-wrap max-w-md">
                  <input
                    type="password"
                    placeholder="नया पासवर्ड (न्यूनतम 4 अक्षर)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white outline-hidden"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    अपडेट करें
                  </button>
                </form>

                {passwordChangeSuccess && (
                  <p className="text-xs text-emerald-600 font-bold">
                    ✓ पासवर्ड सफलतापूर्वक अपडेट कर दिया गया है!
                  </p>
                )}
              </div>

              {/* Factory Reset */}
              <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-bold text-rose-900 text-sm">डिफ़ॉल्ट सेटिंग्स पर रीसेट करें (Factory Reset)</h4>
                  <p className="text-xs text-rose-700 mt-0.5">
                    यह सभी बदलावों को मिटाकर वेबसाइट को मूल डिफ़ॉल्ट स्थिति में ला देगा।
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('क्या आप सचमुच सभी बदलाव रीसेट करना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।')) {
                      cms.resetToDefaults();
                      triggerSaveNotification('सभी सेटिंग्स रीसेट हो गई हैं!');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                >
                  रीसेट करें (Reset All)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

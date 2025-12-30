
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { db } from '../services/dataService';
import { TourPackage, Booking, Story, User, Destination, ContactMessage, NewsletterSignup, SiteSettings } from '../types';
import { 
  LayoutDashboard, Map, Users, CalendarCheck, BookOpen, 
  Plus, Edit, Trash2, Check, X, Search, DollarSign, Clock, 
  Shield, ShieldAlert, Navigation, ListOrdered, FileText, 
  TrendingUp, Bell, Settings, Eye, Mail, User as UserIcon, 
  Star, Upload, Link as LinkIcon, MessageSquare, Reply, 
  Inbox, UserPlus, Home, Save, Globe, Key, LogOut, Download,
  TrendingDown, BarChart3, Activity, ChevronDown, Filter,
  Layers, Share2, Printer, MessageCircle, GripVertical, AlertCircle,
  Image as ImageIcon, Camera, Trash
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
  onLogout: () => void;
}

interface AdminNotification {
  id: string;
  type: 'booking' | 'message' | 'story';
  title: string;
  subtitle: string;
  time: string;
  targetTab: 'bookings' | 'messages' | 'stories';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'destinations' | 'bookings' | 'stories' | 'users' | 'messages' | 'newsletters' | 'settings' | 'profile'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  
  // State pulled from DataService (Mock Backend)
  const [tours, setTours] = useState<TourPackage[]>(db.getTours());
  const [destinations, setDestinations] = useState<Destination[]>(db.getDestinations());
  const [bookings, setBookings] = useState<Booking[]>(db.getBookings());
  const [stories, setStories] = useState<Story[]>(db.getStories());
  const [users, setUsers] = useState<User[]>(db.getUsers());
  const [messages, setMessages] = useState<ContactMessage[]>(db.getMessages());
  const [newsletters, setNewsletters] = useState<NewsletterSignup[]>(db.getNewsletters());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(db.getSettings());

  // Package Editor State
  const [isPackageEditorOpen, setIsPackageEditorOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Partial<TourPackage>>({});
  
  // Destination Editor State
  const [isDestinationEditorOpen, setIsDestinationEditorOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Partial<Destination>>({});

  const [profileForm, setProfileForm] = useState({
    name: 'Chief Warden',
    email: 'admin@wildlifesafari.rw',
    currentPassword: '',
    newPassword: '',
    avatar: 'https://ui-avatars.com/api/?name=CW&background=194932&color=fff'
  });

  // --- DERIVED NOTIFICATIONS ---
  const adminNotifications = useMemo((): AdminNotification[] => {
    const alerts: AdminNotification[] = [];
    
    // Add pending bookings
    bookings.filter(b => b.status === 'pending').forEach(b => {
      alerts.push({
        id: `b-${b.id}`,
        type: 'booking',
        title: 'New Booking Request',
        subtitle: `${b.userName} requested ${b.tourTitle}`,
        time: 'Just now',
        targetTab: 'bookings'
      });
    });

    // Add unread messages
    messages.filter(m => m.status === 'unread').forEach(m => {
      alerts.push({
        id: `m-${m.id}`,
        type: 'message',
        title: 'New Message',
        subtitle: `From ${m.name}: ${m.subject}`,
        time: 'Today',
        targetTab: 'messages'
      });
    });

    // Add pending stories
    stories.filter(s => s.status === 'pending').forEach(s => {
      alerts.push({
        id: `s-${s.id}`,
        type: 'story',
        title: 'Story Awaiting Review',
        subtitle: `"${s.title}" by ${s.author}`,
        time: 'Pending',
        targetTab: 'stories'
      });
    });

    return alerts.slice(0, 5); // Only show latest 5
  }, [bookings, messages, stories]);

  // --- UTILS ---

  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) {
      alert("No data available to export.");
      return;
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(val => 
        typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : 
        Array.isArray(val) ? `"${val.join('; ')}"` : val
      ).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportMenuOpen(false);
  };

  // --- HANDLERS ---

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const tour = { 
      ...editingTour, 
      id: editingTour.id || Date.now().toString(),
      highlights: editingTour.highlights || [],
      dailyItinerary: editingTour.dailyItinerary || [],
      inclusions: editingTour.inclusions || [],
      exclusions: editingTour.exclusions || []
    } as TourPackage;
    editingTour.id ? setTours(db.updateTour(tour)) : setTours(db.addTour(tour));
    setIsPackageEditorOpen(false);
  };

  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = {
      ...editingDestination,
      id: editingDestination.id || Date.now().toString(),
      packageCount: editingDestination.packageCount || 0,
      image: editingDestination.image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop',
    } as Destination;
    editingDestination.id ? setDestinations(db.updateDestination(dest)) : setDestinations(db.addDestination(dest));
    setIsDestinationEditorOpen(false);
  };

  const handleBookingAction = (id: string, status: 'confirmed' | 'rejected') => {
    if (confirm(`Confirm status change to ${status}?`)) setBookings(db.updateBookingStatus(id, status));
  };

  const handleMessageStatus = (id: string, status: 'unread' | 'read' | 'replied') => {
    setMessages(db.updateMessageStatus(id, status));
  };

  const handleToggleAdmin = (user: User) => {
    setUsers(db.updateUserRole(user.id, user.role === 'admin' ? 'user' : 'admin'));
  };

  const handleStoryAction = (id: string, status: 'approved' | 'rejected') => {
    setStories(db.updateStoryStatus(id, status));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteSettings(db.updateSettings(siteSettings));
    alert('Settings saved successfully.');
  };

  // --- SUB-COMPONENTS ---

  const SidebarLink = ({ icon: Icon, label, active, onClick, count }: any) => (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${active ? 'bg-safari-800 text-white shadow-lg' : 'text-safari-300 hover:bg-white/5 hover:text-white'}`}>
      <div className="flex items-center gap-3">
        <Icon size={18} className={active ? 'text-safari-400' : 'text-safari-500'} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {count !== undefined && count > 0 && (
        <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{count}</span>
      )}
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, color, trend, trendUp }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 transition-all hover:shadow-md group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}><Icon size={24} /></div>
        {trend && (
          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trendUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend}
          </span>
        )}
      </div>
      <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
      <h3 className="text-3xl font-bold text-safari-900 mt-1">{value}</h3>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$84,200" icon={DollarSign} color="bg-emerald-50 text-emerald-600" trend="14%" trendUp={true} />
        <StatCard title="Avg. Booking" value="$1,250" icon={Activity} color="bg-blue-50 text-blue-600" trend="2.4%" trendUp={true} />
        <StatCard title="Total Inquiries" value={messages.length} icon={MessageSquare} color="bg-indigo-50 text-indigo-600" trend="18%" trendUp={true} />
        <StatCard title="Subscribers" value={newsletters.length} icon={Mail} color="bg-purple-50 text-purple-600" trend="5.1%" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6">
              <h3 className="font-bold text-safari-900 text-sm flex items-center gap-2 mb-4"><TrendingUp size={16} className="text-safari-500" /> Revenue Flow</h3>
              <div className="h-40 w-full relative">
                 <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                    <path d="M0,120 Q50,110 80,80 T160,60 T240,90 T320,40 T400,20" fill="none" stroke="#34ae6f" strokeWidth="3" />
                 </svg>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6">
              <h3 className="font-bold text-safari-900 text-sm flex items-center gap-2 mb-4"><Layers size={16} className="text-orange-500" /> Booking Volume</h3>
              <div className="h-40 flex items-end justify-between gap-1">
                 {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-safari-100 rounded-t-lg hover:bg-safari-500 transition-colors" style={{ height: `${h}%` }}></div>
                 ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
             <div className="p-6 border-b border-stone-50 flex justify-between items-center">
                <h3 className="font-bold text-safari-900 flex items-center gap-2"><MessageCircle size={18} className="text-indigo-500" /> Recent Inquiries</h3>
                <button onClick={() => setActiveTab('messages')} className="text-[10px] font-black uppercase text-safari-600 hover:underline">View All</button>
             </div>
             <div className="divide-y divide-stone-50">
                {messages.slice(0, 3).map(m => (
                  <div key={m.id} className="p-5 flex items-start gap-4 hover:bg-stone-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">{m.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-safari-900">{m.name}</span>
                        <span className="text-[9px] text-stone-400 uppercase">{new Date(m.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-stone-500 truncate italic">"{m.message}"</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 flex flex-col h-full">
            <div className="p-6 border-b border-stone-50"><h3 className="font-bold text-safari-900 flex items-center gap-2"><Clock size={18} className="text-orange-500" /> Action Center</h3></div>
            <div className="flex-1 p-6 space-y-6">
              <div className="flex gap-4">
                 <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><CalendarCheck size={18} /></div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-safari-900">Pending Bookings</p>
                   <p className="text-xs text-stone-500">{bookings.filter(b => b.status === 'pending').length} requests require review</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><UserPlus size={18} /></div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-safari-900">Community Growth</p>
                   <p className="text-xs text-stone-500">12 new subscribers this week</p>
                 </div>
              </div>
            </div>
            <div className="p-6 pt-0">
               <div className="bg-safari-950 p-6 rounded-2xl text-white">
                  <h4 className="font-bold text-xs mb-3">Daily Export</h4>
                  <p className="text-[10px] opacity-70 mb-4">Download the latest booking manifests and tour availability for today.</p>
                  <button onClick={() => exportToCSV(bookings, 'daily_manifest')} className="w-full py-2 bg-safari-600 rounded-lg text-[10px] font-bold hover:bg-safari-500 transition-all flex items-center justify-center gap-2">
                    <Download size={12}/> Generate Manifest
                  </button>
               </div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderPackages = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-safari-900">Safari Packages</h2>
          <p className="text-stone-500 text-sm">Professional tour catalog management.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => exportToCSV(tours, 'safari_packages')} className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-stone-50 transition-colors"><Download size={16} /> Export</button>
          <button onClick={() => { setEditingTour({}); setIsPackageEditorOpen(true); }} className="bg-safari-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-safari-700 shadow-md transition-all"><Plus size={16} /> Create Package</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm group hover:shadow-md transition-all">
            <div className="h-44 relative overflow-hidden">
              <img src={t.image} alt={t.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => { setEditingTour(t); setIsPackageEditorOpen(true); }} className="p-2 bg-white/90 backdrop-blur rounded-lg text-safari-600 shadow-sm hover:bg-white transition-all"><Edit size={14} /></button>
                <button onClick={() => setTours(db.deleteTour(t.id))} className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-600 shadow-sm hover:bg-white transition-all"><Trash2 size={14} /></button>
              </div>
              <div className="absolute bottom-3 left-3 bg-safari-900/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">{t.duration}</div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-safari-900 text-lg mb-1">{t.title}</h4>
              <p className="text-xs text-stone-500 mb-4 line-clamp-2">{t.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                <span className="text-xl font-black text-safari-700">{t.price}</span>
                <span className="text-[10px] text-stone-400 font-bold uppercase">Base Price</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDestinations = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-safari-900">National Parks & Destinations</h2>
          <p className="text-stone-500 text-sm">Manage the key regions of your safari offerings.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => exportToCSV(destinations, 'destinations')} className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-stone-50 transition-colors"><Download size={16} /> Export</button>
          <button onClick={() => { setEditingDestination({}); setIsDestinationEditorOpen(true); }} className="bg-safari-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-safari-700 shadow-md transition-all"><Plus size={16} /> Add Destination</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map(d => (
          <div key={d.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm group">
            <div className="h-48 relative overflow-hidden">
               <img src={d.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={d.name} />
               <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => { setEditingDestination(d); setIsDestinationEditorOpen(true); }} className="p-2 bg-white/90 backdrop-blur rounded-lg text-safari-600 shadow-sm hover:bg-white transition-all"><Edit size={14} /></button>
                <button onClick={() => setDestinations(db.deleteDestination(d.id))} className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-600 shadow-sm hover:bg-white transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-safari-900 text-xl mb-1 font-serif">{d.name}</h4>
              <p className="text-sm text-stone-500 mb-4 line-clamp-2">{d.description}</p>
              <div className="flex items-center justify-between">
                 <div className="flex gap-1">
                   {d.highlights?.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-tighter bg-safari-50 text-safari-600 px-1.5 py-0.5 rounded">{h}</span>
                   ))}
                 </div>
                 <span className="text-[10px] text-stone-400 font-bold uppercase">{d.packageCount} Active Tours</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- REUSABLE DYNAMIC LIST COMPONENT ---
  const DynamicList = ({ label, items, onAdd, onRemove, icon: Icon }: any) => {
    const [tempValue, setTempValue] = useState('');
    return (
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block">{label}</label>
        <div className="flex gap-2">
           <input 
              type="text" 
              value={tempValue} 
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); onAdd(tempValue); setTempValue(''); } }}
              className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-safari-500 outline-none" 
              placeholder={`Add to ${label}...`}
           />
           <button 
             type="button" 
             onClick={() => { onAdd(tempValue); setTempValue(''); }}
             className="bg-safari-600 text-white p-2.5 rounded-xl hover:bg-safari-700 transition-colors"
           ><Plus size={20}/></button>
        </div>
        <div className="flex flex-wrap gap-2">
           {items?.map((item: string, i: number) => (
             <div key={i} className="bg-stone-100 text-stone-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 group">
                {item}
                <button type="button" onClick={() => onRemove(i)} className="text-stone-400 hover:text-red-500 transition-colors"><X size={14}/></button>
             </div>
           ))}
        </div>
      </div>
    );
  };

  // --- REUSABLE IMAGE PICKER COMPONENT ---
  const ImagePicker = ({ value, onChange, label }: { value: string | undefined, onChange: (val: string) => void, label: string }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block">{label}</label>
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative h-48 rounded-3xl border-2 border-dashed border-stone-200 bg-stone-50 flex flex-col items-center justify-center cursor-pointer group hover:border-safari-400 hover:bg-safari-50 transition-all overflow-hidden"
        >
          {value ? (
            <>
              <img src={value} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Preview" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera className="text-white" size={32} />
              </div>
            </>
          ) : (
            <>
              <ImageIcon className="text-stone-300 group-hover:text-safari-400 mb-2" size={40} />
              <span className="text-xs font-bold text-stone-500 group-hover:text-safari-600">Click to upload cover image</span>
              <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-tighter">JPG, PNG, WEBP (Max 5MB)</span>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, onChange);
            }} 
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-safari-950 text-white fixed h-full z-20 flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
           <div className="bg-safari-600 p-2 rounded-xl"><LayoutDashboard size={20} className="text-white" /></div>
           <div><h2 className="text-lg font-serif font-bold leading-none text-white">SafariAdmin</h2><p className="text-[10px] text-safari-400 uppercase tracking-widest mt-1">Management Suite</p></div>
        </div>
        <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
          <SidebarLink icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarLink icon={Map} label="Safari Packages" active={activeTab === 'packages'} onClick={() => setActiveTab('packages')} />
          <SidebarLink icon={Navigation} label="Destinations" active={activeTab === 'destinations'} onClick={() => setActiveTab('destinations')} />
          <SidebarLink icon={CalendarCheck} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} count={bookings.filter(b => b.status === 'pending').length} />
          <SidebarLink icon={MessageCircle} label="Chats & Support" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} count={messages.filter(m => m.status === 'unread').length} />
          <SidebarLink icon={Mail} label="Newsletters" active={activeTab === 'newsletters'} onClick={() => setActiveTab('newsletters')} />
          <SidebarLink icon={BookOpen} label="Moderation" active={activeTab === 'stories'} onClick={() => setActiveTab('stories')} count={stories.filter(s => s.status === 'pending').length} />
          <SidebarLink icon={Users} label="System Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <div className="h-px bg-white/5 my-4"></div>
          <SidebarLink icon={Settings} label="Site Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <SidebarLink icon={UserIcon} label="My Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
        <div className="p-6 border-t border-white/5 space-y-4">
          <button onClick={onNavigateHome} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-safari-300 hover:text-white transition-colors"><Eye size={16} /> Preview Site</button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"><LogOut size={16} /> Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="bg-white border-b border-stone-200 sticky top-0 z-50 px-10 py-4 flex justify-between items-center shadow-sm">
          <div className="relative w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
             <input type="text" placeholder={`Search in ${activeTab}...`} className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none text-sm transition-all" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center gap-6">
             {/* Global Export */}
             <div className="relative">
               <button onClick={() => setIsExportMenuOpen(!isExportMenuOpen)} className="flex items-center gap-2 px-4 py-2 bg-safari-50 text-safari-700 rounded-xl text-xs font-bold hover:bg-safari-100 transition-all border border-safari-100"><Download size={16} /> Export Data <ChevronDown size={14} className={`transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} /></button>
               {isExportMenuOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-stone-100 py-1 z-50 animate-fade-in-up">
                    <button onClick={() => exportToCSV(bookings, 'bookings')} className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 text-stone-700 flex items-center gap-2"><FileText size={14}/> All Bookings</button>
                    <button onClick={() => exportToCSV(tours, 'safari_packages')} className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 text-stone-700 flex items-center gap-2"><Map size={14}/> All Tours</button>
                 </div>
               )}
             </div>

             {/* NOTIFICATIONS SYSTEM */}
             <div className="relative">
               <button 
                onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                className={`transition-colors relative p-2 rounded-xl ${isNotificationMenuOpen ? 'bg-safari-100 text-safari-600' : 'text-stone-400 hover:text-safari-600'}`}
               >
                 <Bell size={20} />
                 {adminNotifications.length > 0 && (
                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                 )}
               </button>

               {isNotificationMenuOpen && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setIsNotificationMenuOpen(false)}></div>
                   <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-100 py-2 z-50 animate-fade-in-up">
                      <div className="px-4 py-2 border-b border-stone-50 flex justify-between items-center">
                        <h4 className="text-xs font-black uppercase text-stone-400 tracking-widest">Recent Activity</h4>
                        {adminNotifications.length > 0 && <span className="text-[10px] font-bold text-safari-600">{adminNotifications.length} New</span>}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {adminNotifications.length > 0 ? adminNotifications.map(notif => (
                          <button 
                            key={notif.id}
                            onClick={() => { setActiveTab(notif.targetTab); setIsNotificationMenuOpen(false); }}
                            className="w-full text-left px-4 py-4 hover:bg-stone-50 flex gap-3 transition-colors group"
                          >
                             <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notif.type === 'booking' ? 'bg-blue-50 text-blue-600' : notif.type === 'message' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                {notif.type === 'booking' ? <CalendarCheck size={18}/> : notif.type === 'message' ? <MessageSquare size={18}/> : <BookOpen size={18}/>}
                             </div>
                             <div className="min-w-0">
                                <p className="text-xs font-bold text-safari-900 group-hover:text-safari-600 transition-colors">{notif.title}</p>
                                <p className="text-[10px] text-stone-500 line-clamp-1">{notif.subtitle}</p>
                                <p className="text-[9px] text-stone-300 mt-1 font-bold uppercase">{notif.time}</p>
                             </div>
                          </button>
                        )) : (
                          <div className="p-10 text-center text-stone-400">
                             <Check className="mx-auto mb-2 text-stone-200" size={32} />
                             <p className="text-xs font-medium">All caught up!</p>
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-2 border-t border-stone-50 mt-1">
                        <button 
                          onClick={() => { setActiveTab('bookings'); setIsNotificationMenuOpen(false); }}
                          className="w-full py-2 text-[10px] font-black uppercase text-stone-400 hover:text-safari-600 text-center tracking-widest transition-colors"
                        >
                          View All Activities
                        </button>
                      </div>
                   </div>
                 </>
               )}
             </div>

             <button onClick={() => setActiveTab('settings')} className="text-stone-400 hover:text-safari-600 transition-colors hover:rotate-90 transition-transform"><Settings size={20} /></button>
             <div className="h-6 w-px bg-stone-200"></div>
             <button onClick={() => setActiveTab('profile')} className="w-10 h-10 rounded-xl bg-safari-100 flex items-center justify-center text-safari-600 font-bold overflow-hidden border border-safari-200 shadow-inner">
                <img src={profileForm.avatar} className="w-full h-full object-cover" alt="Profile" />
             </button>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto flex-grow w-full">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'packages' && renderPackages()}
          {activeTab === 'destinations' && renderDestinations()}
          {activeTab === 'bookings' && (
            <div className="animate-fade-in space-y-6">
               <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-safari-900">Tour Bookings</h2>
                 <button onClick={() => exportToCSV(bookings, 'bookings_report')} className="bg-safari-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:bg-safari-700 transition-all"><Download size={16}/> Export Full Report</button>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-100">
                    <tr><th className="px-6 py-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">Traveler</th><th className="px-6 py-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">Safari Package</th><th className="px-6 py-4 text-[10px] font-black uppercase text-stone-400 tracking-widest text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-stone-50 group transition-colors">
                        <td className="px-6 py-4"><p className="text-sm font-bold text-safari-900">{b.userName}</p><p className="text-[10px] text-stone-400">{b.userId}</p></td>
                        <td className="px-6 py-4 text-sm text-stone-700 font-medium">{b.tourTitle}</td>
                        <td className="px-6 py-4 text-right">
                          {b.status === 'pending' ? (
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleBookingAction(b.id, 'confirmed')} className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"><Check size={14}/></button>
                              <button onClick={() => handleBookingAction(b.id, 'rejected')} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"><X size={14}/></button>
                            </div>
                          ) : (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'messages' && <div className="animate-fade-in space-y-6">
            <h2 className="text-2xl font-bold text-safari-900">Chats & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {messages.map(m => (
                  <div key={m.id} className={`bg-white rounded-3xl border ${m.status === 'unread' ? 'border-safari-300 shadow-md' : 'border-stone-200'} p-6 flex flex-col group`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-safari-700 uppercase">{m.name.charAt(0)}</div>
                        <div><h4 className="font-bold text-safari-900 text-sm truncate max-w-[150px]">{m.name}</h4><p className="text-[10px] text-stone-400 truncate max-w-[150px]">{m.email}</p></div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${m.status === 'unread' ? 'bg-safari-100 text-safari-700' : 'bg-stone-100 text-stone-400'}`}>{m.status}</span>
                    </div>
                    <p className="text-stone-500 text-xs italic mb-6 flex-1 line-clamp-3">"{m.message}"</p>
                    <div className="pt-4 border-t border-stone-50 flex justify-between items-center">
                      <span className="text-[10px] text-stone-300 font-bold">{new Date(m.createdAt).toLocaleDateString()}</span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleMessageStatus(m.id, 'read')} className="p-1.5 text-stone-400 hover:text-safari-600 rounded"><Check size={16} /></button>
                        <button onClick={() => setMessages(messages.filter(msg => msg.id !== m.id))} className="p-1.5 text-stone-400 hover:text-red-600 rounded"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
               ))}
            </div>
          </div>}
          {activeTab === 'newsletters' && <div className="animate-fade-in">
             <h2 className="text-2xl font-bold text-safari-900 mb-6">Subscribers</h2>
             <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-100">
                    <tr><th className="px-6 py-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">Email Address</th><th className="px-6 py-4 text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {newsletters.map(n => (
                      <tr key={n.id} className="hover:bg-stone-50 group">
                        <td className="px-6 py-4 text-sm font-medium text-safari-900">{n.email}</td>
                        <td className="px-6 py-4 text-right"><button onClick={() => setNewsletters(newsletters.filter(nl => nl.id !== n.id))} className="p-1.5 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>}
          {activeTab === 'stories' && <div className="animate-fade-in">
             <h2 className="text-2xl font-bold text-safari-900 mb-6">Moderation Queue</h2>
             <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-100">
                    <tr><th className="px-6 py-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">Story Title</th><th className="px-6 py-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">Status</th><th className="px-6 py-4 text-right"></th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {stories.map(s => (
                      <tr key={s.id} className="hover:bg-stone-50 group">
                        <td className="px-6 py-4 font-bold text-safari-900 text-sm italic">"{s.title}"</td>
                        <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${s.status === 'pending' ? 'bg-orange-100 text-orange-700' : s.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span></td>
                        <td className="px-6 py-4 text-right">
                          {s.status === 'pending' && <div className="flex justify-end gap-2"><button onClick={() => handleStoryAction(s.id, 'approved')} className="p-1.5 bg-green-50 text-green-600 rounded-lg"><Check size={14}/></button><button onClick={() => handleStoryAction(s.id, 'rejected')} className="p-1.5 bg-red-50 text-red-600 rounded-lg"><X size={14}/></button></div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>}
          {activeTab === 'users' && <div className="animate-fade-in">
             <h2 className="text-2xl font-bold text-safari-900 mb-6">System Users</h2>
             <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-100">
                    <tr><th className="px-6 py-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">User</th><th className="px-6 py-4 text-[10px] font-black uppercase text-stone-400 tracking-widest">Role</th><th className="px-6 py-4 text-right"></th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-stone-50 group transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3"><img src={u.avatar} className="w-8 h-8 rounded-full border border-stone-100 shadow-sm" alt={u.name} /><div><p className="text-sm font-bold text-safari-900">{u.name}</p><p className="text-[10px] text-stone-400">{u.email}</p></div></td>
                        <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${u.role === 'admin' ? 'bg-safari-100 text-safari-700' : 'bg-stone-100 text-stone-600'}`}>{u.role}</span></td>
                        <td className="px-6 py-4 text-right"><button onClick={() => handleToggleAdmin(u)} className={`p-1.5 rounded transition-all ${u.role === 'admin' ? 'text-red-400 hover:bg-red-50' : 'text-safari-400 hover:bg-safari-50'}`} title="Toggle Admin Role"><Shield size={16}/></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>}
          {activeTab === 'settings' && <div className="animate-fade-in space-y-8">
             <h2 className="text-2xl font-bold text-safari-900">Platform Settings</h2>
             <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-6">
                    <h3 className="font-bold text-safari-900 border-b border-stone-100 pb-4">General Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Site Name" value={siteSettings.siteName} onChange={(v:string)=>setSiteSettings({...siteSettings, siteName: v})} />
                        <InputField label="Contact Email" value={siteSettings.contactEmail} onChange={(v:string)=>setSiteSettings({...siteSettings, contactEmail: v})} />
                    </div>
                </div>
                <div className="flex justify-end"><button type="submit" className="bg-safari-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all hover:bg-safari-700 hover:scale-105"><Save size={18} /> Save Settings</button></div>
            </form>
          </div>}
          {activeTab === 'profile' && <div className="animate-fade-in">
             <h2 className="text-2xl font-bold text-safari-900 mb-8">My Administrator Profile</h2>
             <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center max-w-2xl mx-auto">
                <div className="relative mb-6">
                  <img src={profileForm.avatar} className="w-32 h-32 rounded-full border-4 border-safari-100 shadow-md object-cover" alt="Profile" />
                  <button className="absolute bottom-1 right-1 bg-safari-600 p-2 rounded-full text-white shadow-lg border-2 border-white hover:bg-safari-700 transition-all"><Upload size={16} /></button>
                </div>
                <h3 className="text-2xl font-bold text-safari-900">{profileForm.name}</h3>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">System Administrator</p>
                <div className="w-full h-px bg-stone-100 my-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
                   <div><p className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Email</p><p className="text-sm font-bold text-stone-700">{profileForm.email}</p></div>
                   <div><p className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Status</p><p className="text-sm font-bold text-safari-600">Active Duty</p></div>
                </div>
             </div>
          </div>}
        </div>
      </main>

      {/* --- PACKAGE EDITOR MODAL --- */}
      {isPackageEditorOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-safari-950/80 backdrop-blur-md" onClick={() => setIsPackageEditorOpen(false)}></div>
          <div className="relative bg-white w-full max-w-6xl max-h-[95vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
            
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <div className="flex items-center gap-4">
                <div className="bg-safari-600 p-3 rounded-2xl text-white shadow-lg shadow-safari-200/50"><Map size={28} /></div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-safari-900">{editingTour.id ? 'Edit Safari Package' : 'Design New Safari Experience'}</h3>
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">Package Designer Suite</p>
                </div>
              </div>
              <button onClick={() => setIsPackageEditorOpen(false)} className="text-stone-400 hover:text-stone-600 p-2 hover:bg-stone-100 rounded-full transition-all"><X size={28}/></button>
            </div>

            <form onSubmit={handleSavePackage} className="flex-1 overflow-y-auto bg-white p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-safari-900 flex items-center gap-2 border-b border-stone-100 pb-2"><Activity size={18} className="text-safari-500"/> Core Metrics</h4>
                    <ImagePicker label="Safari Cover Image" value={editingTour.image} onChange={(base64) => setEditingTour({...editingTour, image: base64})} />
                    <InputField label="Safari Title" value={editingTour.title} onChange={(v:string)=>setEditingTour({...editingTour, title: v})} required placeholder="e.g. 5-Day Primates & Peaks" />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Duration" value={editingTour.duration} onChange={(v:string)=>setEditingTour({...editingTour, duration: v})} required placeholder="e.g. 5 Days" />
                      <InputField label="Base Price" value={editingTour.price} onChange={(v:string)=>setEditingTour({...editingTour, price: v})} required placeholder="e.g. $1,200" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block">Short Teaser</label>
                      <textarea value={editingTour.description || ''} onChange={(e)=>setEditingTour({...editingTour, description: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-safari-500 outline-none h-24 resize-none" placeholder="Brief summary for catalog cards..." />
                    </div>
                  </div>
                  <DynamicList label="Safari Highlights" items={editingTour.highlights} onAdd={(v:string) => setEditingTour({...editingTour, highlights: [...(editingTour.highlights || []), v]})} onRemove={(idx:number) => setEditingTour({...editingTour, highlights: editingTour.highlights?.filter((_, i) => i !== idx)})} />
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                    <h4 className="text-lg font-bold text-safari-900 flex items-center gap-2"><ListOrdered size={18} className="text-safari-500"/> Daily Itinerary</h4>
                    <button type="button" onClick={() => setEditingTour({...editingTour, dailyItinerary: [...(editingTour.dailyItinerary || []), { day: (editingTour.dailyItinerary?.length || 0) + 1, title: '', description: '' }]})} className="text-[10px] font-black uppercase text-safari-600 hover:underline flex items-center gap-1"><Plus size={12}/> Add Day</button>
                  </div>
                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scroll-smooth">
                    {editingTour.dailyItinerary?.map((day, idx) => (
                      <div key={idx} className="bg-stone-50 p-5 rounded-3xl border border-stone-100 relative group animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-black bg-safari-600 text-white px-2 py-1 rounded-lg uppercase tracking-widest">Day {day.day}</span>
                           <button type="button" onClick={() => setEditingTour({...editingTour, dailyItinerary: editingTour.dailyItinerary?.filter((_, i) => i !== idx).map((d, i) => ({...d, day: i+1}))})} className="text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                        </div>
                        <div className="space-y-3">
                          <input type="text" value={day.title} onChange={(e) => { const newItin = [...(editingTour.dailyItinerary || [])]; newItin[idx].title = e.target.value; setEditingTour({...editingTour, dailyItinerary: newItin}); }} className="w-full bg-transparent border-b border-stone-200 p-1 text-sm font-bold text-safari-900 outline-none focus:border-safari-500 transition-colors" placeholder="Day Title" />
                          <textarea value={day.description} onChange={(e) => { const newItin = [...(editingTour.dailyItinerary || [])]; newItin[idx].description = e.target.value; setEditingTour({...editingTour, dailyItinerary: newItin}); }} className="w-full bg-transparent text-xs text-stone-500 outline-none resize-none h-16" placeholder="Activities..." />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-8">
                    <DynamicList label="What's Included" items={editingTour.inclusions} onAdd={(v:string) => setEditingTour({...editingTour, inclusions: [...(editingTour.inclusions || []), v]})} onRemove={(idx:number) => setEditingTour({...editingTour, inclusions: editingTour.inclusions?.filter((_, i) => i !== idx)})} />
                    <DynamicList label="What's Excluded" items={editingTour.exclusions} onAdd={(v:string) => setEditingTour({...editingTour, exclusions: [...(editingTour.exclusions || []), v]})} onRemove={(idx:number) => setEditingTour({...editingTour, exclusions: editingTour.exclusions?.filter((_, i) => i !== idx)})} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-16 pt-10 border-t border-stone-100 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setIsPackageEditorOpen(false)} className="px-8 py-3 rounded-2xl font-bold text-stone-400 hover:bg-stone-50 transition-colors">Discard Changes</button>
                <button type="submit" className="bg-safari-600 text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-safari-200/50 hover:bg-safari-700 hover:scale-105 transition-all flex items-center gap-2 uppercase tracking-widest text-sm"><Save size={18} /> Finalize Safari</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DESTINATION EDITOR MODAL --- */}
      {isDestinationEditorOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-safari-950/80 backdrop-blur-md" onClick={() => setIsDestinationEditorOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
               <div className="flex items-center gap-4">
                  <div className="bg-safari-600 p-3 rounded-2xl text-white shadow-lg"><Navigation size={28} /></div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-safari-900">{editingDestination.id ? 'Refine Destination' : 'Add New Frontier'}</h3>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">Region Management Suite</p>
                  </div>
               </div>
               <button onClick={() => setIsDestinationEditorOpen(false)} className="text-stone-400 hover:text-stone-600 p-2"><X size={28}/></button>
            </div>
            <form onSubmit={handleSaveDestination} className="flex-1 overflow-y-auto p-10 space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <InputField label="Destination Name" value={editingDestination.name} onChange={(v:string)=>setEditingDestination({...editingDestination, name: v})} required placeholder="e.g. Volcanoes National Park" />
                    <ImagePicker label="Destination Background Image" value={editingDestination.image} onChange={(base64) => setEditingDestination({...editingDestination, image: base64})} />
                    <InputField label="Starting Price Label" value={editingDestination.price} onChange={(v:string)=>setEditingDestination({...editingDestination, price: v})} placeholder="e.g. $800" />
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block">Detailed Description</label>
                      <textarea value={editingDestination.description || ''} onChange={(e)=>setEditingDestination({...editingDestination, description: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-safari-500 outline-none h-32 resize-none" />
                    </div>
                  </div>
                  <div className="space-y-10">
                    <DynamicList label="Key Highlights" items={editingDestination.highlights} onAdd={(v:string) => setEditingDestination({...editingDestination, highlights: [...(editingDestination.highlights || []), v]})} onRemove={(idx:number) => setEditingDestination({...editingDestination, highlights: editingDestination.highlights?.filter((_, i) => i !== idx)})} />
                  </div>
               </div>
               <div className="flex justify-end gap-4 pt-10 border-t border-stone-100">
                  <button type="button" onClick={() => setIsDestinationEditorOpen(false)} className="px-8 py-3 rounded-2xl font-bold text-stone-400 hover:bg-stone-50">Discard</button>
                  <button type="submit" className="bg-safari-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-safari-200/50 hover:bg-safari-700 transition-all flex items-center gap-2"><Save size={18} /> Save Destination</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, value, onChange, required, placeholder, type = "text", icon: Icon }: any) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest block">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" size={16} />}
      <input type={type} className={`w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none text-sm transition-all ${Icon ? 'pl-10' : ''}`} value={value || ''} onChange={e => onChange && onChange(e.target.value)} required={required} placeholder={placeholder} />
    </div>
  </div>
);

export default AdminDashboard;

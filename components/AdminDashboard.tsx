import React, { useState, useMemo } from 'react';
import { db } from '../services/dataService';
import { TourPackage, Booking, Story, User, Destination } from '../types';
import { 
  LayoutDashboard, Map, Users, CalendarCheck, BookOpen, 
  Plus, Edit, Trash2, Check, X, Search, DollarSign, Clock, 
  Shield, ShieldAlert, Image as ImageIcon, Navigation, 
  ListOrdered, FileText, ChevronRight, TrendingUp, Bell, Settings, Eye,
  ArrowUpDown, Filter, Mail, User as UserIcon, Star, Upload, Link as LinkIcon
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'destinations' | 'bookings' | 'stories' | 'users'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State
  const [tours, setTours] = useState<TourPackage[]>(db.getTours());
  const [destinations, setDestinations] = useState<Destination[]>(db.getDestinations());
  const [bookings, setBookings] = useState<Booking[]>(db.getBookings());
  const [stories, setStories] = useState<Story[]>(db.getStories());
  const [users, setUsers] = useState<User[]>(db.getUsers());

  // Sorting State for Bookings
  const [bookingSort, setBookingSort] = useState<{key: keyof Booking, dir: 'asc' | 'desc'}>({key: 'createdAt', dir: 'desc'});

  // Package Editor State
  const [isPackageEditorOpen, setIsPackageEditorOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Partial<TourPackage>>({
    dailyItinerary: [],
    gallery: [],
    highlights: [],
    inclusions: [],
    exclusions: []
  });

  // Destination Editor State
  const [isDestinationEditorOpen, setIsDestinationEditorOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Partial<Destination>>({});

  // User Editor State
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<User>>({ role: 'user' });

  // --- FILTERS & SORTING ---
  
  const sortedAndFilteredBookings = useMemo(() => {
    let filtered = bookings.filter(b => 
      b.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.tourTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const valA = a[bookingSort.key] || '';
      const valB = b[bookingSort.key] || '';
      if (valA < valB) return bookingSort.dir === 'asc' ? -1 : 1;
      if (valA > valB) return bookingSort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [bookings, searchQuery, bookingSort]);

  const filteredStories = stories.filter(s => 
    s.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- UTILS ---

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // --- HANDLERS ---

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPackage = {
      ...editingTour,
      id: editingTour.id || Date.now().toString(),
    } as TourPackage;

    if (editingTour.id) {
      setTours(db.updateTour(finalPackage));
    } else {
      setTours(db.addTour(finalPackage));
    }
    setIsPackageEditorOpen(false);
  };

  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDestination = {
      ...editingDestination,
      id: editingDestination.id || Date.now().toString(),
      packageCount: editingDestination.packageCount || 0
    } as Destination;

    if (editingDestination.id) {
      setDestinations(db.updateDestination(finalDestination));
    } else {
      setDestinations(db.addDestination(finalDestination));
    }
    setIsDestinationEditorOpen(false);
    setEditingDestination({});
  };

  const handleBookingAction = (id: string, status: 'confirmed' | 'rejected') => {
    if (confirm(`Are you sure you want to ${status} this booking?`)) {
      setBookings(db.updateBookingStatus(id, status));
    }
  };

  const handleStoryAction = (id: string, status: 'approved' | 'rejected') => {
    setStories(db.updateStoryStatus(id, status));
  };

  const handleToggleAdmin = (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    setUsers(db.updateUserRole(user.id, newRole));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers(db.addUser(editingUser));
    setIsUserEditing(false);
    setEditingUser({ role: 'user' });
  };

  const handleSortBookings = (key: keyof Booking) => {
    setBookingSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc'
    }));
  };

  const addItineraryDay = () => {
    const currentDays = editingTour.dailyItinerary || [];
    setEditingTour({
      ...editingTour,
      dailyItinerary: [
        ...currentDays,
        { day: currentDays.length + 1, title: '', description: '' }
      ]
    });
  };

  const removeItineraryDay = (index: number) => {
    const updated = [...(editingTour.dailyItinerary || [])];
    updated.splice(index, 1);
    const reindexed = updated.map((item, i) => ({ ...item, day: i + 1 }));
    setEditingTour({ ...editingTour, dailyItinerary: reindexed });
  };

  const addGalleryImage = () => {
    setEditingTour({
      ...editingTour,
      gallery: [...(editingTour.gallery || []), '']
    });
  };

  const removeGalleryImage = (index: number) => {
    const updated = [...(editingTour.gallery || [])];
    updated.splice(index, 1);
    setEditingTour({ ...editingTour, gallery: updated });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | number) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      if (field === 'image') {
        setEditingTour(prev => ({ ...prev, image: base64 }));
      } else {
        const updatedGallery = [...(editingTour.gallery || [])];
        updatedGallery[field] = base64;
        setEditingTour(prev => ({ ...prev, gallery: updatedGallery }));
      }
    }
  };

  const handleDestinationFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setEditingDestination(prev => ({ ...prev, image: base64 }));
    }
  };

  // --- RENDERERS ---

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp size={12} /> {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-safari-900 mt-1">{value}</h3>
      </div>
    </div>
  );

  const InputField = ({ label, value, onChange, required, placeholder, type = "text" }: any) => (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-stone-500">{label}</label>
      <input 
        type={type}
        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none text-sm" 
        value={value || ''} 
        onChange={e => onChange(e.target.value)} 
        required={required}
        placeholder={placeholder}
      />
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$84,200" icon={DollarSign} color="bg-emerald-50 text-emerald-600" trend="+14%" />
        <StatCard title="Active Safaris" value={tours.length} icon={Map} color="bg-blue-50 text-blue-600" />
        <StatCard title="Pending Approvals" value={bookings.filter(b => b.status === 'pending').length} icon={CalendarCheck} color="bg-orange-50 text-orange-600" />
        <StatCard title="User Stories" value={stories.length} icon={BookOpen} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h3 className="font-bold text-safari-900 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-safari-500" /> Popular Destinations
          </h3>
          <div className="space-y-4">
            {destinations.map(dest => (
              <div key={dest.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <img src={dest.image} className="w-10 h-10 rounded-lg object-cover" />
                  <span className="text-sm font-semibold text-stone-700">{dest.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-safari-500 rounded-full" style={{ width: `${(dest.packageCount / tours.length) * 100}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-stone-400">{dest.packageCount} Tours</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h3 className="font-bold text-safari-900 mb-4 flex items-center gap-2">
            <Bell size={18} className="text-orange-500" /> System Alerts
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-sm flex items-start gap-3">
              <ImageIcon size={18} className="shrink-0 mt-0.5" />
              <span>Package "Akagera Big 5" is missing high-resolution gallery images.</span>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-100 rounded-xl text-orange-700 text-sm flex items-start gap-3">
              <Users size={18} className="shrink-0 mt-0.5" />
              <span>{stories.filter(s => s.status === 'pending').length} stories are pending moderation.</span>
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
          <p className="text-stone-500 text-sm">Design and manage your core safari product offering.</p>
        </div>
        <button 
          onClick={() => {
            setEditingTour({
              dailyItinerary: [],
              gallery: [],
              highlights: [],
              inclusions: [],
              exclusions: []
            });
            setIsPackageEditorOpen(true);
          }}
          className="bg-safari-600 hover:bg-safari-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-safari-100 transition-all transform hover:-translate-y-1"
        >
          <Plus size={20} /> Create New Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(tour => (
          <div key={tour.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm group hover:shadow-md transition-all">
            <div className="h-40 relative">
               <img src={tour.image} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-black uppercase text-safari-900">
                 {tour.duration}
               </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-safari-900 mb-1">{tour.title}</h4>
              <p className="text-stone-400 text-xs flex items-center gap-1 mb-4">
                <Navigation size={12} /> {destinations.find(d => d.id === tour.destinationId)?.name || 'General Rwanda'}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                <span className="font-bold text-safari-700">{tour.price}</span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingTour(tour); setIsPackageEditorOpen(true); }} className="p-2 text-stone-400 hover:text-safari-600 hover:bg-safari-50 rounded-lg transition-all"><Edit size={16} /></button>
                  <button onClick={() => setTours(db.deleteTour(tour.id))} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-safari-900">Bookings Management</h2>
          <p className="text-stone-500 text-sm">Oversee all safari reservations and customer requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th onClick={() => handleSortBookings('id')} className="px-6 py-4 text-xs font-bold text-stone-500 uppercase cursor-pointer hover:bg-stone-100 transition-colors">
                  <div className="flex items-center gap-1">ID <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => handleSortBookings('userName')} className="px-6 py-4 text-xs font-bold text-stone-500 uppercase cursor-pointer hover:bg-stone-100 transition-colors">
                  <div className="flex items-center gap-1">Customer <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => handleSortBookings('tourTitle')} className="px-6 py-4 text-xs font-bold text-stone-500 uppercase cursor-pointer hover:bg-stone-100 transition-colors">
                  <div className="flex items-center gap-1">Tour <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => handleSortBookings('date')} className="px-6 py-4 text-xs font-bold text-stone-500 uppercase cursor-pointer hover:bg-stone-100 transition-colors">
                  <div className="flex items-center gap-1">Travel Date <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => handleSortBookings('status')} className="px-6 py-4 text-xs font-bold text-stone-500 uppercase cursor-pointer hover:bg-stone-100 transition-colors">
                  <div className="flex items-center gap-1">Status <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {sortedAndFilteredBookings.map(b => (
                <tr key={b.id} className="hover:bg-stone-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-[10px] text-stone-400">#{b.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-safari-900">{b.userName}</div>
                    <div className="text-xs text-stone-400">{b.userId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-stone-700">{b.tourTitle}</div>
                    <div className="text-[10px] text-stone-400">{b.travelers} Travelers • {b.totalPrice}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600">{b.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                      b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {b.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleBookingAction(b.id, 'confirmed')}
                            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                            title="Confirm Booking"
                          >
                            <Check size={14} />
                          </button>
                          <button 
                            onClick={() => handleBookingAction(b.id, 'rejected')}
                            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                            title="Reject Booking"
                          >
                            <X size={14} />
                          </button>
                        </>
                      )}
                      <button className="p-1.5 bg-stone-100 text-stone-500 rounded-lg hover:bg-stone-200 transition-all">
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedAndFilteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-stone-500 italic">
                    No bookings found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStories = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-safari-900">Story Moderation</h2>
          <p className="text-stone-500 text-sm">Review and approve traveler diaries for the public gallery.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStories.map(story => (
          <div key={story.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col">
            <div className="h-40 relative">
              <img src={story.coverImage} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-black uppercase text-safari-900">
                {story.date}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={story.authorImage} className="w-10 h-10 rounded-full border-2 border-safari-50" />
                  <div>
                    <h4 className="font-bold text-safari-900 text-sm">{story.author}</h4>
                    <p className="text-[10px] text-stone-400">{story.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < story.rating ? "text-yellow-400 fill-yellow-400" : "text-stone-200"} />
                  ))}
                </div>
              </div>
              <h3 className="font-serif font-bold text-lg text-safari-800 mb-2">{story.title}</h3>
              <p className="text-stone-500 text-xs italic mb-6 line-clamp-3">"{story.excerpt}"</p>
              
              <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                  story.status === 'approved' ? 'bg-green-50 text-green-700' :
                  story.status === 'rejected' ? 'bg-red-50 text-red-700' :
                  'bg-orange-50 text-orange-700'
                }`}>
                  {story.status}
                </span>
                
                {story.status === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStoryAction(story.id, 'approved')}
                      className="bg-safari-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-safari-700 transition-all"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleStoryAction(story.id, 'rejected')}
                      className="bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-safari-900">User Management</h2>
          <p className="text-stone-500 text-sm">Manage system administrators and registered travelers.</p>
        </div>
        <button 
          onClick={() => { setEditingUser({ role: 'user' }); setIsUserEditing(true); }}
          className="bg-safari-600 hover:bg-safari-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
        >
          <Plus size={18} /> Add New User
        </button>
      </div>

      {isUserEditing && (
        <div className="bg-white p-6 rounded-2xl border border-safari-100 shadow-xl mb-6 animate-fade-in-up">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-safari-900">Register New Team Member</h3>
             <button onClick={() => setIsUserEditing(false)}><X size={18} className="text-stone-400"/></button>
           </div>
           <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="space-y-1">
               <label className="text-xs font-bold text-stone-500 uppercase">Full Name</label>
               <input required className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none" value={editingUser.name || ''} onChange={e => setEditingUser({...editingUser, name: e.target.value})} />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-stone-500 uppercase">Email Address</label>
               <input required type="email" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none" value={editingUser.email || ''} onChange={e => setEditingUser({...editingUser, email: e.target.value})} />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-stone-500 uppercase">Role</label>
               <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value as 'admin' | 'user'})}>
                 <option value="user">Traveler (User)</option>
                 <option value="admin">Administrator</option>
               </select>
             </div>
             <div className="lg:col-span-3 flex justify-end gap-3 pt-4 border-t border-stone-50">
               <button type="button" onClick={() => setIsUserEditing(false)} className="px-4 py-2 text-stone-500 font-bold">Cancel</button>
               <button type="submit" className="bg-safari-600 text-white px-8 py-2 rounded-xl font-bold">Create Account</button>
             </div>
           </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase">Identity</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase text-center">Privileges</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredUsers.map(u => (
              <tr key={u.id} className="hover:bg-stone-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-safari-100 flex items-center justify-center text-safari-600 font-bold border border-safari-200">
                      {u.avatar ? <img src={u.avatar} className="w-full h-full rounded-full object-cover" /> : u.name.charAt(0)}
                    </div>
                    <div className="text-sm font-bold text-safari-900">{u.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-stone-500">{u.email}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                    u.role === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleToggleAdmin(u)}
                      className="p-1.5 text-stone-400 hover:text-safari-600 hover:bg-safari-50 rounded-lg transition-all"
                      title={u.role === 'admin' ? "Revoke Admin" : "Grant Admin"}
                    >
                      {u.role === 'admin' ? <ShieldAlert size={16} /> : <Shield size={16} />}
                    </button>
                    <button 
                      onClick={() => setUsers(db.deleteUser(u.id))}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Remove User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDestinations = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-safari-900">Destinations</h2>
          <p className="text-stone-500 text-sm">Manage the regions and parks available for safari booking.</p>
        </div>
        <button 
          onClick={() => { setEditingDestination({}); setIsDestinationEditorOpen(true); }}
          className="bg-safari-600 hover:bg-safari-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
        >
          <Plus size={18} /> Add Destination
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map(dest => (
          <div key={dest.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col group">
            <div className="h-48 relative overflow-hidden">
               <img src={dest.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white">
                 <h4 className="font-bold text-lg">{dest.name}</h4>
                 <p className="text-[10px] text-white/80">{dest.packageCount} Active Packages</p>
               </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <p className="text-stone-500 text-xs leading-relaxed mb-6 line-clamp-3">{dest.description}</p>
              <div className="mt-auto pt-4 border-t border-stone-50 flex justify-end gap-2">
                <button 
                  onClick={() => { setEditingDestination(dest); setIsDestinationEditorOpen(true); }}
                  className="p-1.5 text-stone-400 hover:text-safari-600 hover:bg-safari-50 rounded transition-all"
                >
                  <Edit size={16}/>
                </button>
                <button 
                  onClick={() => { if(confirm('Are you sure you want to delete this destination?')) setDestinations(db.deleteDestination(dest.id)); }}
                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                >
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* PROFESSIONAL SIDEBAR */}
      <aside className="w-72 bg-safari-950 text-white fixed h-full z-20 flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
           <div className="bg-safari-600 p-2 rounded-xl">
             <LayoutDashboard size={20} className="text-white" />
           </div>
           <div>
             <h2 className="text-lg font-serif font-bold leading-none text-white">SafariAdmin</h2>
             <p className="text-[10px] text-safari-400 uppercase tracking-widest mt-1">Management Suite</p>
           </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <SidebarLink icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarLink icon={Map} label="Safari Packages" active={activeTab === 'packages'} onClick={() => setActiveTab('packages')} />
          <SidebarLink icon={Navigation} label="Destinations" active={activeTab === 'destinations'} onClick={() => setActiveTab('destinations')} />
          <SidebarLink icon={CalendarCheck} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
          <SidebarLink icon={BookOpen} label="Moderation" active={activeTab === 'stories'} onClick={() => setActiveTab('stories')} />
          <SidebarLink icon={Users} label="System Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <button onClick={onNavigateHome} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-safari-300 hover:text-white transition-colors">
            <Eye size={16} /> Preview Site
          </button>
          <div className="bg-safari-900/50 p-4 rounded-2xl flex items-center gap-3 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-safari-800 flex items-center justify-center font-bold text-safari-400">A</div>
            <div>
              <p className="text-xs font-bold text-white">Chief Warden</p>
              <p className="text-[10px] text-safari-500">System Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-72 flex-1 min-h-screen">
        <header className="bg-white border-b border-stone-200 sticky top-0 z-10 px-10 py-4 flex justify-between items-center">
          <div className="relative w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
             <input 
               type="text" 
               placeholder={`Search in ${activeTab}...`}
               className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none transition-all text-sm"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
          <div className="flex items-center gap-6">
             <button className="text-stone-400 hover:text-safari-600 transition-colors relative">
               <Bell size={20} />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <button className="text-stone-400 hover:text-safari-600 transition-colors">
               <Settings size={20} />
             </button>
             <div className="h-6 w-px bg-stone-200"></div>
             <div className="w-10 h-10 rounded-xl bg-safari-100 flex items-center justify-center text-safari-600 font-bold">CW</div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'packages' && renderPackages()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'stories' && renderStories()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'destinations' && renderDestinations()}
        </div>
      </main>

      {/* PACKAGE EDITOR MODAL */}
      {isPackageEditorOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-safari-950/80 backdrop-blur-md" onClick={() => setIsPackageEditorOpen(false)}></div>
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <div className="flex items-center gap-3">
                <div className="bg-safari-600 p-2 rounded-xl text-white"><Map size={24} /></div>
                <h3 className="text-xl font-bold text-safari-900">{editingTour.id ? 'Edit Safari Package' : 'Design New Safari'}</h3>
              </div>
              <button onClick={() => setIsPackageEditorOpen(false)} className="text-stone-400 hover:text-stone-600 p-2"><X /></button>
            </div>

            <form onSubmit={handleSavePackage} className="flex-1 overflow-y-auto p-8 space-y-10 bg-white">
              <section className="space-y-6">
                <h5 className="text-xs font-black uppercase text-safari-500 tracking-widest flex items-center gap-2">
                  <FileText size={14} /> Basic Information
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField label="Package Title" value={editingTour.title} onChange={(v: string) => setEditingTour({...editingTour, title: v})} required placeholder="e.g. Luxury Gorilla Trek" />
                  <InputField label="Starting Price" value={editingTour.price} onChange={(v: string) => setEditingTour({...editingTour, price: v})} required placeholder="e.g. $1,200" />
                  <InputField label="Duration" value={editingTour.duration} onChange={(v: string) => setEditingTour({...editingTour, duration: v})} required placeholder="e.g. 4 Days" />
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500">Destination</label>
                    <select 
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none"
                      value={editingTour.destinationId || ''}
                      onChange={e => setEditingTour({...editingTour, destinationId: e.target.value})}
                    >
                      <option value="">Select Region</option>
                      {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500">Cover Image</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1 group">
                        <input 
                          type="text"
                          className="w-full p-3 pl-10 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none text-sm" 
                          value={editingTour.image || ''} 
                          onChange={(e) => setEditingTour({...editingTour, image: e.target.value})} 
                          placeholder="Image URL"
                        />
                        <LinkIcon className="absolute left-3 top-3 text-stone-400" size={16} />
                      </div>
                      <label className="bg-safari-50 text-safari-600 px-4 rounded-xl flex items-center justify-center cursor-pointer hover:bg-safari-100 transition-colors border border-safari-200">
                        <Upload size={18} />
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500">Short Summary</label>
                  <textarea 
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none h-20 text-sm" 
                    value={editingTour.description || ''} 
                    onChange={e => setEditingTour({...editingTour, description: e.target.value})}
                  />
                </div>
              </section>

              <section className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h5 className="text-xs font-black uppercase text-safari-500 tracking-widest flex items-center gap-2">
                      <ImageIcon size={14} /> Safari Photo Gallery
                    </h5>
                    <button type="button" onClick={addGalleryImage} className="text-safari-600 text-xs font-bold hover:underline">+ Add Slot</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(editingTour.gallery || []).map((url, idx) => (
                      <div key={idx} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 relative group">
                        <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute -top-2 -right-2 bg-white text-stone-400 hover:text-red-500 p-1 rounded-full shadow-sm border border-stone-100"><X size={14}/></button>
                        <div className="flex gap-2">
                           <div className="flex-1 relative">
                              <input 
                                className="w-full p-2.5 pl-8 bg-white border border-stone-200 rounded-xl outline-none text-xs" 
                                value={url} 
                                onChange={e => {
                                  const updated = [...(editingTour.gallery || [])];
                                  updated[idx] = e.target.value;
                                  setEditingTour({...editingTour, gallery: updated});
                                }}
                                placeholder="Image URL"
                              />
                              <LinkIcon className="absolute left-2.5 top-2.5 text-stone-400" size={14} />
                           </div>
                           <label className="bg-white text-stone-500 p-2.5 rounded-xl border border-stone-200 cursor-pointer hover:text-safari-600 transition-colors shadow-sm">
                             <Upload size={14} />
                             <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, idx)} />
                           </label>
                        </div>
                        {url && (
                          <div className="h-32 w-full rounded-xl overflow-hidden border border-stone-100">
                             <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-black uppercase text-safari-500 tracking-widest flex items-center gap-2">
                    <ListOrdered size={14} /> Professional Itinerary
                  </h5>
                  <button type="button" onClick={addItineraryDay} className="bg-safari-100 text-safari-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Plus size={14} /> Add Day
                  </button>
                </div>
                
                <div className="space-y-4">
                  {(editingTour.dailyItinerary || []).map((item, idx) => (
                    <div key={idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-100 flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-safari-600 text-white flex items-center justify-center font-bold text-sm">
                          {item.day}
                        </div>
                        <div className="w-px h-full bg-stone-200 mt-2"></div>
                      </div>
                      <div className="flex-1 space-y-4">
                         <div className="flex justify-between gap-4">
                            <input 
                              className="flex-1 p-2 bg-transparent border-b border-stone-200 font-bold text-safari-900 outline-none focus:border-safari-500" 
                              placeholder={`Day ${item.day} Heading (e.g. Arrival & Orientation)`}
                              value={item.title}
                              onChange={e => {
                                const updated = [...(editingTour.dailyItinerary || [])];
                                updated[idx].title = e.target.value;
                                setEditingTour({...editingTour, dailyItinerary: updated});
                              }}
                            />
                            <button type="button" onClick={() => removeItineraryDay(idx)} className="text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                         </div>
                         <textarea 
                           className="w-full p-3 bg-white border border-stone-100 rounded-xl outline-none text-sm h-24 shadow-sm"
                           placeholder="Describe the activities for this day..."
                           value={item.description}
                           onChange={e => {
                             const updated = [...(editingTour.dailyItinerary || [])];
                             updated[idx].description = e.target.value;
                             setEditingTour({...editingTour, dailyItinerary: updated});
                           }}
                         />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-8 border-t border-stone-100 flex justify-end gap-3 sticky bottom-0 bg-white pb-4">
                <button type="button" onClick={() => setIsPackageEditorOpen(false)} className="px-8 py-3 font-bold text-stone-500">Cancel</button>
                <button type="submit" className="bg-safari-600 text-white px-10 py-3 rounded-xl font-bold shadow-xl shadow-safari-100">
                  Save Safari Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DESTINATION EDITOR MODAL */}
      {isDestinationEditorOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-safari-950/80 backdrop-blur-md" onClick={() => setIsDestinationEditorOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <div className="flex items-center gap-3">
                <div className="bg-safari-600 p-2 rounded-xl text-white"><Navigation size={24} /></div>
                <h3 className="text-xl font-bold text-safari-900">{editingDestination.id ? 'Edit Destination' : 'Add New Destination'}</h3>
              </div>
              <button onClick={() => setIsDestinationEditorOpen(false)} className="text-stone-400 hover:text-stone-600 p-2"><X /></button>
            </div>

            <form onSubmit={handleSaveDestination} className="flex-1 overflow-y-auto p-8 space-y-6 bg-white">
              <InputField 
                label="Destination Name" 
                value={editingDestination.name} 
                onChange={(v: string) => setEditingDestination({...editingDestination, name: v})} 
                required 
                placeholder="e.g. Volcanoes National Park" 
              />

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-500">Main Image</label>
                <div className="flex gap-2">
                  <div className="relative flex-1 group">
                    <input 
                      type="text"
                      className="w-full p-3 pl-10 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-safari-500 outline-none text-sm" 
                      value={editingDestination.image || ''} 
                      onChange={(e) => setEditingDestination({...editingDestination, image: e.target.value})} 
                      placeholder="Image URL"
                    />
                    <LinkIcon className="absolute left-3 top-3 text-stone-400" size={16} />
                  </div>
                  <label className="bg-safari-50 text-safari-600 px-4 rounded-xl flex items-center justify-center cursor-pointer hover:bg-safari-100 transition-colors border border-safari-200">
                    <Upload size={18} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleDestinationFileUpload} />
                  </label>
                </div>
                {editingDestination.image && (
                  <div className="h-40 w-full rounded-xl overflow-hidden border border-stone-100 mt-2">
                     <img src={editingDestination.image} alt="Destination Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-500">Description</label>
                <textarea 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none h-32 text-sm" 
                  value={editingDestination.description || ''} 
                  onChange={e => setEditingDestination({...editingDestination, description: e.target.value})}
                  required
                  placeholder="Describe the beauty and unique features of this place..."
                />
              </div>

              <div className="pt-8 border-t border-stone-100 flex justify-end gap-3 bg-white pb-4">
                <button type="button" onClick={() => setIsDestinationEditorOpen(false)} className="px-8 py-3 font-bold text-stone-500">Cancel</button>
                <button type="submit" className="bg-safari-600 text-white px-10 py-3 rounded-xl font-bold shadow-xl shadow-safari-100">
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarLink = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-safari-800 text-white shadow-lg' : 'text-safari-300 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={18} className={active ? 'text-safari-400' : 'text-safari-500'} />
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

export default AdminDashboard;
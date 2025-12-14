import React, { useState } from 'react';
import { db } from '../services/dataService';
import { TourPackage, Booking, Story, User } from '../types';
import { 
  LayoutDashboard, Map, Users, CalendarCheck, BookOpen, 
  Plus, Edit, Trash2, Check, X, Search, DollarSign, Clock 
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'bookings' | 'stories' | 'users'>('overview');
  
  // Data State
  const [tours, setTours] = useState<TourPackage[]>(db.getTours());
  const [bookings, setBookings] = useState<Booking[]>(db.getBookings());
  const [stories, setStories] = useState<Story[]>(db.getStories());
  const [users] = useState<User[]>(db.getUsers());

  // Form State for Packages
  const [isEditing, setIsEditing] = useState(false);
  const [editingTour, setEditingTour] = useState<Partial<TourPackage>>({});

  // --- HANDLERS ---

  // Packages
  const handleDeletePackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setTours(db.deleteTour(id));
    }
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const newTour = {
      id: editingTour.id || Date.now().toString(),
      title: editingTour.title || 'New Tour',
      price: editingTour.price || '$0',
      duration: editingTour.duration || '1 Day',
      image: editingTour.image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068',
      description: editingTour.description || 'Description',
      highlights: editingTour.highlights || [],
      fullDescription: editingTour.fullDescription || '',
      dailyItinerary: [],
      inclusions: [],
      exclusions: []
    } as TourPackage;

    if (editingTour.id) {
      setTours(db.updateTour(newTour));
    } else {
      setTours(db.addTour(newTour));
    }
    setIsEditing(false);
    setEditingTour({});
  };

  // Bookings
  const handleBookingAction = (id: string, status: 'confirmed' | 'rejected') => {
    setBookings(db.updateBookingStatus(id, status));
  };

  // Stories
  const handleStoryAction = (id: string, status: 'approved' | 'rejected') => {
    setStories(db.updateStoryStatus(id, status));
  };

  // --- RENDER HELPERS ---

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-stone-500 text-sm font-bold uppercase">Total Bookings</p>
            <h3 className="text-3xl font-bold text-safari-900 mt-2">{bookings.length}</h3>
          </div>
          <div className="bg-safari-50 p-3 rounded-xl text-safari-600"><CalendarCheck /></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-stone-500 text-sm font-bold uppercase">Active Packages</p>
            <h3 className="text-3xl font-bold text-safari-900 mt-2">{tours.length}</h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Map /></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-stone-500 text-sm font-bold uppercase">Pending Stories</p>
            <h3 className="text-3xl font-bold text-safari-900 mt-2">{stories.filter(s => s.status === 'pending').length}</h3>
          </div>
          <div className="bg-purple-50 p-3 rounded-xl text-purple-600"><BookOpen /></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-stone-500 text-sm font-bold uppercase">Total Users</p>
            <h3 className="text-3xl font-bold text-safari-900 mt-2">{users.length}</h3>
          </div>
          <div className="bg-orange-50 p-3 rounded-xl text-orange-600"><Users /></div>
        </div>
      </div>
    </div>
  );

  const renderPackages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-safari-900">Manage Packages</h2>
        <button 
          onClick={() => { setEditingTour({}); setIsEditing(true); }}
          className="bg-safari-600 hover:bg-safari-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <Plus size={18} /> Add New Package
        </button>
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-lg mb-6 animate-fade-in-up">
          <h3 className="text-lg font-bold mb-4">{editingTour.id ? 'Edit Package' : 'Create Package'}</h3>
          <form onSubmit={handleSavePackage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              placeholder="Title" 
              className="border p-2 rounded" 
              value={editingTour.title || ''} 
              onChange={e => setEditingTour({...editingTour, title: e.target.value})} 
              required
            />
            <input 
              placeholder="Duration (e.g. 3 Days)" 
              className="border p-2 rounded" 
              value={editingTour.duration || ''} 
              onChange={e => setEditingTour({...editingTour, duration: e.target.value})} 
              required
            />
            <input 
              placeholder="Price (e.g. $1,500)" 
              className="border p-2 rounded" 
              value={editingTour.price || ''} 
              onChange={e => setEditingTour({...editingTour, price: e.target.value})} 
              required
            />
            <input 
              placeholder="Image URL" 
              className="border p-2 rounded" 
              value={editingTour.image || ''} 
              onChange={e => setEditingTour({...editingTour, image: e.target.value})} 
              required
            />
            <textarea 
              placeholder="Short Description" 
              className="border p-2 rounded md:col-span-2" 
              value={editingTour.description || ''} 
              onChange={e => setEditingTour({...editingTour, description: e.target.value})} 
              required
            />
             <textarea 
              placeholder="Full Description" 
              className="border p-2 rounded md:col-span-2" 
              rows={4}
              value={editingTour.fullDescription || ''} 
              onChange={e => setEditingTour({...editingTour, fullDescription: e.target.value})} 
            />
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-stone-500">Cancel</button>
              <button type="submit" className="bg-safari-600 text-white px-6 py-2 rounded font-bold">Save Package</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {tours.map(tour => (
          <div key={tour.id} className="bg-white p-4 rounded-xl border border-stone-100 flex flex-col md:flex-row gap-4 items-center shadow-sm">
            <img src={tour.image} alt={tour.title} className="w-24 h-24 rounded-lg object-cover" />
            <div className="flex-1">
              <h4 className="font-bold text-lg text-safari-900">{tour.title}</h4>
              <p className="text-sm text-stone-500 flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1"><Clock size={14}/> {tour.duration}</span>
                <span className="flex items-center gap-1"><DollarSign size={14}/> {tour.price}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setEditingTour(tour); setIsEditing(true); window.scrollTo(0,0); }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Edit size={18} />
              </button>
              <button 
                onClick={() => handleDeletePackage(tour.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-safari-900">Manage Bookings</h2>
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="p-4 text-sm font-bold text-stone-600">ID</th>
              <th className="p-4 text-sm font-bold text-stone-600">User</th>
              <th className="p-4 text-sm font-bold text-stone-600">Tour</th>
              <th className="p-4 text-sm font-bold text-stone-600">Date</th>
              <th className="p-4 text-sm font-bold text-stone-600">Status</th>
              <th className="p-4 text-sm font-bold text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="p-4 text-sm font-mono text-stone-400">#{booking.id}</td>
                <td className="p-4 text-sm">
                  <div className="font-bold text-safari-900">{booking.userName}</div>
                  <div className="text-stone-500 text-xs">{booking.userId}</div>
                </td>
                <td className="p-4 text-sm font-medium">{booking.tourTitle}</td>
                <td className="p-4 text-sm text-stone-600">{booking.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {booking.status === 'pending' && (
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleBookingAction(booking.id, 'confirmed')}
                        className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Confirm"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => handleBookingAction(booking.id, 'rejected')}
                        className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Reject"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && <div className="p-8 text-center text-stone-500">No bookings found.</div>}
      </div>
    </div>
  );

  const renderStories = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-safari-900">Moderate Stories</h2>
      <div className="grid grid-cols-1 gap-6">
        {stories.map(story => (
          <div key={story.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm relative">
             <div className="absolute top-6 right-6">
               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                 story.status === 'approved' ? 'bg-green-100 text-green-700' :
                 story.status === 'rejected' ? 'bg-red-100 text-red-700' :
                 'bg-yellow-100 text-yellow-700'
               }`}>
                 {story.status}
               </span>
             </div>
             
             <h3 className="text-xl font-bold text-safari-900 mb-2">{story.title}</h3>
             <p className="text-stone-500 text-sm mb-4">By {story.author} • {story.date}</p>
             <div className="bg-stone-50 p-4 rounded-lg mb-4 text-stone-700 italic">
               "{story.excerpt}"
             </div>
             
             {story.status === 'pending' && (
               <div className="flex gap-4">
                 <button 
                   onClick={() => handleStoryAction(story.id, 'approved')}
                   className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition-colors"
                 >
                   Approve & Publish
                 </button>
                 <button 
                   onClick={() => handleStoryAction(story.id, 'rejected')}
                   className="flex-1 bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-600 py-2 rounded-lg font-bold transition-colors"
                 >
                   Reject
                 </button>
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-safari-950 text-white fixed h-full z-20 overflow-y-auto">
        <div className="p-6 border-b border-white/10">
           <h2 className="text-xl font-serif font-bold">Admin Panel</h2>
           <p className="text-safari-400 text-xs tracking-wider uppercase mt-1">Wildlife Safaris</p>
        </div>
        <nav className="p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-safari-800 text-white' : 'text-white/60 hover:bg-white/5'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('packages')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'packages' ? 'bg-safari-800 text-white' : 'text-white/60 hover:bg-white/5'}`}>
            <Map size={20} /> Packages
          </button>
          <button onClick={() => setActiveTab('bookings')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'bookings' ? 'bg-safari-800 text-white' : 'text-white/60 hover:bg-white/5'}`}>
            <CalendarCheck size={20} /> Bookings
          </button>
          <button onClick={() => setActiveTab('stories')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'stories' ? 'bg-safari-800 text-white' : 'text-white/60 hover:bg-white/5'}`}>
            <BookOpen size={20} /> Stories
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'users' ? 'bg-safari-800 text-white' : 'text-white/60 hover:bg-white/5'}`}>
            <Users size={20} /> Users
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button onClick={onNavigateHome} className="w-full text-left px-4 py-2 text-safari-300 hover:text-white text-sm">
            &larr; Back to Website
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'packages' && renderPackages()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'stories' && renderStories()}
          {activeTab === 'users' && (
             <div>
                <h2 className="text-2xl font-bold text-safari-900 mb-6">User Management</h2>
                <div className="bg-white p-6 rounded-xl border border-stone-200">
                   <p>User management interface goes here...</p>
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
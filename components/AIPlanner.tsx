import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, Calendar, Users, Wallet, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateItinerary } from '../services/geminiService';
import { PlannerState, PlannerStatus } from '../types';

interface AIPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const INTEREST_OPTIONS = ['Gorilla Trekking', 'Cultural Villages', 'Hiking', 'Big 5 Safari', 'Lake Kivu Relaxation', 'Bird Watching', 'Kigali City Tour'];

const AIPlanner: React.FC<AIPlannerProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [plannerState, setPlannerState] = useState<PlannerState>({
    budget: 'Moderate',
    days: '7',
    interests: [],
    travelers: '2'
  });
  const [status, setStatus] = useState<PlannerStatus>(PlannerStatus.IDLE);
  const [result, setResult] = useState<string>('');

  if (!isOpen) return null;

  const handleInterestToggle = (interest: string) => {
    setPlannerState(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleGenerate = async () => {
    setStep(3); // Result view
    setStatus(PlannerStatus.LOADING);
    try {
      const itinerary = await generateItinerary(plannerState);
      setResult(itinerary);
      setStatus(PlannerStatus.SUCCESS);
    } catch (error) {
      setResult("Sorry, we encountered an error connecting to our AI service. Please try again.");
      setStatus(PlannerStatus.ERROR);
    }
  };

  const resetPlanner = () => {
    setStep(1);
    setStatus(PlannerStatus.IDLE);
    setResult('');
    setPlannerState({
      budget: 'Moderate',
      days: '7',
      interests: [],
      travelers: '2'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-safari-900 p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-safari-500 p-2 rounded-lg">
              <Sparkles className="text-white h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-white">Safari Planner AI</h2>
              <p className="text-safari-200 text-sm">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-stone-50">
          
          {/* STEP 1: PREFERENCES */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-safari-900 mb-2">Let's craft your perfect journey</h3>
                <p className="text-stone-600">Tell us a bit about your travel style.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Duration */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                  <label className="flex items-center gap-2 text-safari-800 font-semibold mb-4">
                    <Calendar size={18} /> Trip Duration (Days)
                  </label>
                  <input 
                    type="range" 
                    min="3" 
                    max="21" 
                    value={plannerState.days}
                    onChange={(e) => setPlannerState({...plannerState, days: e.target.value})}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-safari-600"
                  />
                  <div className="text-center mt-2 font-bold text-safari-600 text-xl">{plannerState.days} Days</div>
                </div>

                {/* Travelers */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                  <label className="flex items-center gap-2 text-safari-800 font-semibold mb-4">
                    <Users size={18} /> Number of Travelers
                  </label>
                  <select 
                    value={plannerState.travelers}
                    onChange={(e) => setPlannerState({...plannerState, travelers: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-safari-500 outline-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                  <label className="flex items-center gap-2 text-safari-800 font-semibold mb-4">
                    <Wallet size={18} /> Budget Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Budget', 'Moderate', 'Luxury'].map(level => (
                      <button
                        key={level}
                        onClick={() => setPlannerState({...plannerState, budget: level})}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          plannerState.budget === level 
                            ? 'bg-safari-100 text-safari-700 border-2 border-safari-500' 
                            : 'bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                <label className="block text-safari-800 font-semibold mb-4">What interests you most?</label>
                <div className="flex flex-wrap gap-3">
                  {INTEREST_OPTIONS.map(interest => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                        plannerState.interests.includes(interest)
                          ? 'bg-safari-600 text-white shadow-md transform scale-105'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {plannerState.interests.includes(interest) && <CheckCircle size={14} />}
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setStep(2)}
                  className="bg-safari-600 hover:bg-safari-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-safari-200 transition-all flex items-center gap-2"
                >
                  Review Plan <Send size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CONFIRMATION */}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center h-full space-y-8 max-w-2xl mx-auto">
              <h3 className="text-3xl font-serif font-bold text-safari-900">Ready to Generate?</h3>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-safari-100 w-full space-y-4">
                <div className="flex justify-between border-b border-stone-100 pb-3">
                  <span className="text-stone-500">Duration</span>
                  <span className="font-semibold text-safari-900">{plannerState.days} Days</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-3">
                  <span className="text-stone-500">Travelers</span>
                  <span className="font-semibold text-safari-900">{plannerState.travelers}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-3">
                  <span className="text-stone-500">Budget</span>
                  <span className="font-semibold text-safari-900">{plannerState.budget}</span>
                </div>
                <div>
                  <span className="block text-stone-500 mb-2">Interests</span>
                  <div className="flex flex-wrap gap-2">
                    {plannerState.interests.length > 0 ? (
                      plannerState.interests.map(i => (
                        <span key={i} className="bg-safari-50 text-safari-700 text-xs px-2 py-1 rounded font-medium">{i}</span>
                      ))
                    ) : (
                      <span className="text-stone-400 italic">General Sightseeing</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-xl font-semibold text-stone-600 hover:bg-stone-200 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleGenerate}
                  className="flex-1 bg-gradient-to-r from-safari-600 to-safari-500 hover:from-safari-700 hover:to-safari-600 text-white py-4 rounded-xl font-bold shadow-lg transform transition-transform hover:scale-[1.02] flex justify-center items-center gap-2"
                >
                  <Sparkles size={20} /> Generate Itinerary
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: RESULT */}
          {step === 3 && (
            <div className="h-full flex flex-col">
              {status === PlannerStatus.LOADING ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <Loader2 className="h-16 w-16 text-safari-500 animate-spin" />
                  <div className="text-center space-y-2">
                    <h4 className="text-xl font-bold text-safari-900">Consulting with Gemini AI...</h4>
                    <p className="text-stone-500">Crafting a unique Rwandan adventure just for you.</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <div className="prose prose-safari max-w-none flex-1 overflow-y-auto pr-2">
                    {/* Markdown Renderer for the Itinerary */}
                    <ReactMarkdown
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-serif font-bold text-safari-800 mb-4 pb-2 border-b border-safari-200" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-safari-700 mt-6 mb-3" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-safari-600 mt-4 mb-2" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-700" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-safari-900" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 text-stone-700 leading-relaxed" {...props} />
                      }}
                    >
                      {result}
                    </ReactMarkdown>
                  </div>
                  <div className="pt-6 mt-4 border-t border-stone-200 flex justify-between items-center bg-stone-50 sticky bottom-0">
                    <button 
                      onClick={resetPlanner}
                      className="text-stone-500 hover:text-safari-600 font-medium px-4 py-2"
                    >
                      Start Over
                    </button>
                    <div className="flex gap-3">
                      <button 
                        onClick={onClose}
                        className="bg-safari-600 hover:bg-safari-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-colors"
                      >
                        Save & Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;

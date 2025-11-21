
import React, { useState } from 'react';
import { MatchCard } from './components/MatchCard';
import { MatchList } from './components/MatchList';
import { BottomNav } from './components/BottomNav';
import { MOCK_MATCHES } from './constants';
import { User, Settings, Search } from 'lucide-react';
import { Match } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matches' | 'favorites' | 'profile'>('matches');
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);
  
  // Navigation State
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [matchDetailTab, setMatchDetailTab] = useState<'details' | 'manager' | 'standings'>('details');

  const toggleFavorite = (id: string) => {
    setMatches(prev => prev.map(match => 
      match.id === id ? { ...match, isFavorite: !match.isFavorite } : match
    ));
  };

  const handleSelectMatch = (id: string) => {
    setSelectedMatchId(id);
    setMatchDetailTab('details'); // Reset to main tab when opening a match
  };

  const favoriteMatches = matches.filter(m => m.isFavorite);
  const selectedMatch = matches.find(m => m.id === selectedMatchId);

  // Logic to render the content based on state
  const renderContent = () => {
    // 1. Detail View (Match Card)
    if (selectedMatchId && selectedMatch) {
      return (
        <MatchCard 
          match={selectedMatch} 
          onToggleFavorite={toggleFavorite} 
          onBack={() => setSelectedMatchId(null)}
          activeTab={matchDetailTab}
          onTabChange={setMatchDetailTab}
        />
      );
    }

    // 2. Profile Tab
    if (activeTab === 'profile') {
      return (
        <div className="pt-24 px-4 animate-in fade-in duration-500">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
                  <User className="w-8 h-8 text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Demo User</h3>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">PREMIUM PLAN</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="text-sm text-white/60">AI Credits</span>
                  <span className="font-mono font-bold text-emerald-400">84/100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="text-sm text-white/60">Success Rate</span>
                  <span className="font-mono font-bold text-indigo-400">76%</span>
                </div>
              </div>
            </div>
             <button className="w-full py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" /> Settings
            </button>
        </div>
      );
    }

    // 3. Favorites Tab
    if (activeTab === 'favorites') {
      return (
        <div className="pt-20 animate-in fade-in duration-500">
            {/* Reusing MatchList in Favorites Mode: No date toggle, grouped by Date & League */}
            <MatchList 
              matches={favoriteMatches} 
              onSelectMatch={handleSelectMatch} 
              onToggleFavorite={toggleFavorite}
              isFavoritesView={true}
            />
            
            {favoriteMatches.length === 0 && (
               <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                  <button 
                    onClick={() => setActiveTab('matches')}
                    className="mt-32 px-4 py-2 rounded-full bg-indigo-600/20 text-indigo-300 text-xs font-bold hover:bg-indigo-600/30 transition-colors pointer-events-auto border border-indigo-500/30"
                  >
                    Browse Matches
                  </button>
               </div>
            )}
        </div>
      );
    }

    // 4. Default: Match List (Home)
    return (
       <div className="pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <MatchList 
            matches={matches} 
            onSelectMatch={handleSelectMatch} 
            onToggleFavorite={toggleFavorite}
          />
       </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-[#F8F9FA] antialiased selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[128px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Top Header (Only visible if NOT on MatchCard Detail) */}
      {!selectedMatchId && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E27]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center shadow-lg">
          <div>
            <h1 className="text-2xl font-tech font-bold tracking-wide text-white">
              ELITE<span className="text-indigo-500">AI</span>
            </h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Live Football Intelligence</p>
          </div>
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Search className="w-5 h-5 text-white/80" />
            </button>
            <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <User className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 max-w-md mx-auto min-h-screen">
        {renderContent()}
      </main>

      {/* Bottom Navigation (Always Visible) */}
      <BottomNav activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedMatchId(null); // Reset detail view when changing tabs
      }} />
    </div>
  );
};

export default App;

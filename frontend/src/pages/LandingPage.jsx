import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Briefcase, Heart, Compass, Check, Users } from 'lucide-react';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { HERO_SAMPLE_PROFILES, INTEREST_COMMUNITIES } from '../lib/constants';
import { getProfileAvatar } from '../lib/avatars';

export default function LandingPage() {
  const { setCurrentScreen } = useApp();

  // Hover state for avatar constellation nodes
  const [hoveredNode, setHoveredNode] = useState(null);

  // Active interest in the "What's your thing?" community cloud
  const [selectedInterest, setSelectedInterest] = useState('Photography');

  // Constellation node positions & data
  const constellationData = {
    top: HERO_SAMPLE_PROFILES.find((p) => p.id === 'ananya'),
    left: HERO_SAMPLE_PROFILES.find((p) => p.id === 'rohan'),
    right: HERO_SAMPLE_PROFILES.find((p) => p.id === 'priya'),
    bottom: HERO_SAMPLE_PROFILES.find((p) => p.id === 'siddharth')
  };

  const activeCommunity = INTEREST_COMMUNITIES[selectedInterest] || INTEREST_COMMUNITIES['Photography'];

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#141416] selection:bg-[#FF5364] selection:text-white">
      
      {/* ============================================================ */}
      {/* 1. HERO SECTION WITH CONSTELLATION                            */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 max-w-6xl mx-auto">
        
        {/* Editorial Brand Tagline */}
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5364]">
            Yaario · Social Discovery
          </span>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05] text-[#121214] mb-6">
            Find your <span className="italic font-light text-[#FF5364]">people.</span>
          </h1>
          <p className="text-base sm:text-xl text-stone-600 font-normal leading-relaxed max-w-xl mx-auto">
            People around you who share your interests, your hobbies and your kind of weekend.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentScreen('onboarding')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#141416] text-[#FAF7F2] text-sm font-semibold hover:bg-stone-800 hover:gap-3 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span>Find my people</span>
              <ArrowRight className="w-4 h-4 text-[#FF5364]" />
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* INTERACTIVE AVATAR CONSTELLATION                           */}
        {/* ========================================================== */}
        <div className="relative w-full max-w-2xl mx-auto h-[380px] sm:h-[440px] flex items-center justify-center my-6">
          
          {/* Subtle SVG Constellation Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none stroke-stone-300"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          >
            {/* Center to Top */}
            <line x1="50%" y1="50%" x2="50%" y2="16%" />
            {/* Center to Left */}
            <line x1="50%" y1="50%" x2="16%" y2="50%" />
            {/* Center to Right */}
            <line x1="50%" y1="50%" x2="84%" y2="50%" />
            {/* Center to Bottom */}
            <line x1="50%" y1="50%" x2="50%" y2="84%" />
            {/* Diagonal subtle accents */}
            <line x1="16%" y1="50%" x2="50%" y2="16%" opacity="0.4" />
            <line x1="50%" y1="16%" x2="84%" y2="50%" opacity="0.4" />
            <line x1="84%" y1="50%" x2="50%" y2="84%" opacity="0.4" />
            <line x1="50%" y1="84%" x2="16%" y2="50%" opacity="0.4" />
          </svg>

          {/* Central Anchor Node: "YOU ✦" */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#141416] text-white flex flex-col items-center justify-center shadow-lg border-4 border-[#FAF7F2]">
              <span className="text-xs font-bold tracking-widest text-[#FF5364]">✦</span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest mt-0.5">YOU</span>
            </div>
            <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-white/80 px-2 py-0.5 rounded-full border border-stone-200">
              Your Vibe
            </span>
          </div>

          {/* TOP NODE: Ananya */}
          <ConstellationNode
            profile={constellationData.top}
            positionClass="top-2 sm:top-4 left-1/2 -translate-x-1/2"
            hovered={hoveredNode === 'ananya'}
            onHover={() => setHoveredNode('ananya')}
            onLeave={() => setHoveredNode(null)}
          />

          {/* LEFT NODE: Rohan */}
          <ConstellationNode
            profile={constellationData.left}
            positionClass="left-2 sm:left-4 top-1/2 -translate-y-1/2"
            hovered={hoveredNode === 'rohan'}
            onHover={() => setHoveredNode('rohan')}
            onLeave={() => setHoveredNode(null)}
          />

          {/* RIGHT NODE: Priya */}
          <ConstellationNode
            profile={constellationData.right}
            positionClass="right-2 sm:right-4 top-1/2 -translate-y-1/2"
            hovered={hoveredNode === 'priya'}
            onHover={() => setHoveredNode('priya')}
            onLeave={() => setHoveredNode(null)}
          />

          {/* BOTTOM NODE: Siddharth */}
          <ConstellationNode
            profile={constellationData.bottom}
            positionClass="bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2"
            hovered={hoveredNode === 'siddharth'}
            onHover={() => setHoveredNode('siddharth')}
            onLeave={() => setHoveredNode(null)}
          />
        </div>

        <div className="text-center">
          <p className="text-xs text-stone-400 font-medium tracking-wide">
            Hover any person in the constellation to preview their wavelength.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. "WHAT'S YOUR THING?" INTEREST DISCOVERY SECTION            */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-[#EBE6DF]">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5364] block mb-2">
              Community Radar
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#121214] font-normal tracking-tight">
              What's your thing?
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              Discover real people around your exact passions and weekend pursuits.
            </p>
          </div>

          {/* Dynamic Editorial Cloud of Interests */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 max-w-3xl mx-auto mb-12">
            {Object.keys(INTEREST_COMMUNITIES).map((interest) => {
              const isSelected = selectedInterest === interest;
              return (
                <button
                  key={interest}
                  onClick={() => setSelectedInterest(interest)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#141416] text-[#FAF7F2] shadow-md scale-105'
                      : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-[#EBE6DF]'
                  }`}
                >
                  <span>{interest}</span>
                  {isSelected && <span className="ml-1.5 text-[#FF5364]">●</span>}
                </button>
              );
            })}
          </div>

          {/* Active Interest Community Spotlight */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedInterest}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#EBE6DF] max-w-2xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-700 mb-3 shadow-2xs">
                <span>Vibe Spotlight</span>
                <span>•</span>
                <span className="text-[#FF5364]">{selectedInterest}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-normal mb-2">
                "{activeCommunity.description}"
              </h3>

              <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
                {activeCommunity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-[11px] text-stone-600 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                <span>Active buddies in your city</span>
                <span className="font-semibold text-stone-800">
                  {activeCommunity.curatedProfiles.join(', ')}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. ASYMMETRIC PROFILE COLLAGE                                */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-12 text-center sm:text-left sm:flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5364] block mb-2">
              Authentic Connections
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#121214] font-normal tracking-tight">
              People you might click with.
            </h2>
          </div>
          <button
            onClick={() => setCurrentScreen('onboarding')}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-stone-900 hover:text-[#FF5364] transition-colors cursor-pointer"
          >
            <span>Start discovering your buddies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Card 1: LARGE FEATURED CARD (Ananya) - Spans 7 cols */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-[#EBE6DF] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={getProfileAvatar('Ananya Gupta', 'Female')}
                  alt="Ananya Gupta"
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border border-stone-200 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-2xl font-normal text-stone-900">Ananya Gupta</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      23
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    UI/UX Designer · Delhi
                  </p>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold tracking-tight">
                94% Compatibility
              </span>
            </div>

            <blockquote className="font-editorial text-lg text-stone-800 leading-relaxed italic bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE6DF] mb-6">
              "Passionate about minimalist design, photography, and finding hidden aesthetic cafes around the city."
            </blockquote>

            <div className="flex flex-wrap gap-2 mb-6">
              {['Design', 'Photography', 'Art', 'Reading'].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-700"
                >
                  {interest}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Ideal Hangout: Cafe hopping & photowalks</span>
              <span className="text-[#FF5364] font-semibold cursor-pointer" onClick={() => setCurrentScreen('onboarding')}>
                Connect on Yaario →
              </span>
            </div>
          </div>

          {/* Card 2: COMPACT CARD (Rohan Verma) - Spans 5 cols */}
          <div className="md:col-span-5 bg-white rounded-3xl border border-[#EBE6DF] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={getProfileAvatar('Rohan Verma', 'Male')}
                  alt="Rohan Verma"
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shadow-2xs"
                />
                <div>
                  <h4 className="font-editorial text-xl font-normal text-stone-900">Rohan Verma</h4>
                  <p className="text-xs text-stone-500">Data Analyst · 26 · Delhi</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                88% Match
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed italic mb-4">
              "Numbers by day, indie music by night. Always down for a cricket match or live gig."
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
              {['Music', 'Cricket', 'Movies'].map((t) => (
                <span key={t} className="px-2.5 py-0.5 rounded-md bg-stone-50 text-stone-600 text-[11px] font-medium border border-stone-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: COMPACT CARD (Priya Singh) - Spans 5 cols */}
          <div className="md:col-span-5 bg-white rounded-3xl border border-[#EBE6DF] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={getProfileAvatar('Priya Singh', 'Female')}
                  alt="Priya Singh"
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shadow-2xs"
                />
                <div>
                  <h4 className="font-editorial text-xl font-normal text-stone-900">Priya Singh</h4>
                  <p className="text-xs text-stone-500">Marketing Lead · 25 · Delhi</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                91% Match
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed italic mb-4">
              "Lover of storytelling, spontaneous road trips, and exploring street food joints."
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
              {['Travel', 'Dance', 'Street Food'].map((t) => (
                <span key={t} className="px-2.5 py-0.5 rounded-md bg-stone-50 text-stone-600 text-[11px] font-medium border border-stone-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: MEDIUM CARD (Siddharth Rao) - Spans 7 cols */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-[#EBE6DF] p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={getProfileAvatar('Siddharth Rao', 'Male')}
                  alt="Siddharth Rao"
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shadow-2xs"
                />
                <div>
                  <h4 className="font-editorial text-xl font-normal text-stone-900">Siddharth Rao</h4>
                  <p className="text-xs text-stone-500">Founder · 29 · Bengaluru</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                85% Match
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic mb-4">
              "Early stage founder staying active with weekend 10k runs and casual multiplayer gaming."
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
              {['Startups', 'Fitness', 'Gaming', 'Running'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-stone-50 text-stone-700 text-xs font-medium border border-stone-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CONCISE "HOW YAARIO WORKS"                                */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 bg-white border-t border-[#EBE6DF]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5364] block mb-2">
              Human-Centric Approach
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#121214] font-normal tracking-tight">
              How YAARIO works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EBE6DF]">
              <span className="font-editorial text-2xl text-[#FF5364] font-bold block mb-2">01</span>
              <h4 className="text-sm font-bold text-stone-900 mb-1">Tell us about you</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Your hobbies, genuine interests, and what a good Saturday looks like.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EBE6DF]">
              <span className="font-editorial text-2xl text-[#FF5364] font-bold block mb-2">02</span>
              <h4 className="text-sm font-bold text-stone-900 mb-1">We find your people</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Our algorithm scores overlap in passions, activity styles, and proximity.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EBE6DF]">
              <span className="font-editorial text-2xl text-[#FF5364] font-bold block mb-2">03</span>
              <h4 className="text-sm font-bold text-stone-900 mb-1">Explore your matches</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Discover why you match with exact breakdowns of shared hobbies and vibes.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EBE6DF]">
              <span className="font-editorial text-2xl text-[#FF5364] font-bold block mb-2">04</span>
              <h4 className="text-sm font-bold text-stone-900 mb-1">Unlock connections</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Unlock direct profiles via secure test Razorpay checkout to plan meetups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. EDITORIAL FOOTER                                         */}
      {/* ============================================================ */}
      <footer className="py-12 px-4 sm:px-6 bg-[#FAF7F2] border-t border-[#EBE6DF] text-stone-500 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <img src="/logo-mark.svg" alt="yaario" className="w-5 h-5 object-contain" />
            <span className="font-editorial text-xl font-normal text-stone-900 mr-2">
              yaario<span className="text-[#FF5364]">.</span>
            </span>
            <span className="hidden sm:inline text-stone-400">•</span>
            <span>You're not browsing products. You're discovering people.</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Razorpay Sandbox Verified</span>
            <span>•</span>
            <span>MERN Internship Assessment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-component: Constellation Avatar Node with Popover Preview
function ConstellationNode({ profile, positionClass, hovered, onHover, onLeave }) {
  if (!profile) return null;

  const avatarUrl = getProfileAvatar(profile.name, profile.gender);

  return (
    <div
      className={`absolute ${positionClass} z-30 flex flex-col items-center`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Avatar Node Bubble */}
      <div className="relative group cursor-pointer transition-transform duration-200 hover:scale-110">
        <img
          src={avatarUrl}
          alt={profile.name}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#141416] text-[#FAF7F2] text-[9px] font-bold shadow-2xs">
          {profile.matchScore}%
        </div>
      </div>

      <span className="mt-1.5 text-xs font-semibold text-stone-800 tracking-tight bg-white/90 px-2 py-0.5 rounded-full border border-stone-200/90 shadow-2xs">
        {profile.name.split(' ')[0]}
      </span>

      {/* Interactive Profile Popover on Hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-16 w-56 p-3.5 rounded-2xl bg-white border border-[#EBE6DF] shadow-xl z-50 text-left pointer-events-none"
          >
            <div className="flex items-start justify-between gap-1 mb-1">
              <div>
                <h5 className="font-editorial text-sm font-bold text-stone-900 leading-tight">
                  {profile.name}
                </h5>
                <p className="text-[11px] text-stone-500">
                  {profile.profession} · {profile.city}
                </p>
              </div>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                {profile.matchScore}%
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {profile.interests.slice(0, 2).map((interest) => (
                <span
                  key={interest}
                  className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

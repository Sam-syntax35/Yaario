import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, AlertCircle, Check } from 'lucide-react';
import Button from '../components/common/Button';
import Chip from '../components/common/Chip';
import Progress from '../components/common/Progress';
import { useApp } from '../context/AppContext';
import { createProfile } from '../services/profileService';
import {
  POPULAR_CITIES,
  HOBBIES_LIST,
  INTERESTS_LIST,
  ACTIVITIES_LIST,
  GENDER_OPTIONS,
  LOOKING_FOR_OPTIONS
} from '../lib/constants';

export default function OnboardingPage() {
  const { setCurrentScreen, setProfileData, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    city: 'Delhi',
    profession: '',
    hobbies: [],
    interests: [],
    preferredActivities: [],
    bio: '',
    lookingFor: 'Anyone'
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => {
      const currentList = prev[field] || [];
      if (currentList.includes(item)) {
        return { ...prev, [field]: currentList.filter((i) => i !== item) };
      } else {
        return { ...prev, [field]: [...currentList, item] };
      }
    });
    setValidationError('');
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.name.trim()) return 'Please enter your name.';
      const ageNum = Number(formData.age);
      if (!formData.age || isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
        return 'Please enter a valid age between 18 and 120.';
      }
      if (!formData.city.trim()) return 'Please choose a city.';
    }

    if (currentStep === 2) {
      if (!formData.hobbies || formData.hobbies.length === 0) {
        return 'Please select at least one hobby that reflects what you enjoy.';
      }
    }

    if (currentStep === 3) {
      if (!formData.interests || formData.interests.length === 0) {
        return 'Please pick at least one conversational interest.';
      }
    }

    if (currentStep === 4) {
      if (!formData.profession.trim()) return 'Please enter what you do.';
      if (!formData.preferredActivities || formData.preferredActivities.length === 0) {
        return 'Please select at least one preferred hangout activity.';
      }
      if (!formData.bio.trim() || formData.bio.trim().length < 10) {
        return 'Please write a brief bio of at least 10 characters.';
      }
    }

    return null;
  };

  const handleNext = () => {
    const error = validateStep(step);
    if (error) {
      setValidationError(error);
      return;
    }
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setValidationError('');
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const error = validateStep(4);
    if (error) {
      setValidationError(error);
      return;
    }

    setIsSubmitting(true);
    setValidationError('');

    try {
      const payload = {
        name: formData.name.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        city: formData.city.trim(),
        profession: formData.profession.trim(),
        hobbies: formData.hobbies,
        interests: formData.interests,
        preferredActivities: formData.preferredActivities,
        bio: formData.bio.trim(),
        lookingFor: formData.lookingFor
      };

      const response = await createProfile(payload);

      if (response.success && response.data) {
        setProfileData(response.data);
        showToast('Profile created successfully! Finding your people...', 'success');
        setCurrentScreen('scanning');
      } else {
        throw new Error(response.message || 'Failed to create profile');
      }
    } catch (err) {
      console.error('Error creating profile:', err);
      const msg = err.data?.message || err.message || 'Could not save profile';
      setValidationError(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = {
    1: 'Basics & Location',
    2: 'Your Hobbies',
    3: 'Passions & Interests',
    4: 'Lifestyle & Bio'
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0
    })
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 sm:py-14">
      {/* Header & Progress */}
      <div className="mb-6">
        <Progress
          current={step}
          total={4}
          label={stepLabels[step]}
        />
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        {validationError && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/70 flex items-center gap-2.5 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            {/* STEP 1: Basics */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                    First, the basics.
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Tell us your name and where you are located to match locally.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your First & Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aryan Dixit"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Age
                      </label>
                      <input
                        type="number"
                        min="18"
                        max="120"
                        placeholder="24"
                        value={formData.age}
                        onChange={(e) => updateField('age', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Gender
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => updateField('gender', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-all text-sm"
                      >
                        {GENDER_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your City
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-all text-sm"
                    >
                      {POPULAR_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Matching searches authentic profiles living in this city.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Hobbies */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                      What fills your free time?
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Pick the hobbies you genuinely engage in or want to practice with friends.
                    </p>
                  </div>
                  {formData.hobbies.length > 0 && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                      {formData.hobbies.length} picked
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {HOBBIES_LIST.map((hobby) => (
                    <Chip
                      key={hobby}
                      label={hobby}
                      selected={formData.hobbies.includes(hobby)}
                      onClick={() => toggleArrayItem('hobbies', hobby)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Interests */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                      What sparks your curiosity?
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Topics and subjects you could talk about endlessly over tea or coffee.
                    </p>
                  </div>
                  {formData.interests.length > 0 && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                      {formData.interests.length} picked
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {INTERESTS_LIST.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      selected={formData.interests.includes(interest)}
                      onClick={() => toggleArrayItem('interests', interest)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Lifestyle, Preferred Hangouts, Bio */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                    Your vibe & preferences.
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Help your future buddies understand how you like hanging out.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Profession or Field of Study
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Product Designer, Software Engineer, Student"
                      value={formData.profession}
                      onChange={(e) => updateField('profession', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Ideal Weekend Hangout Style
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {ACTIVITIES_LIST.map((act) => (
                        <Chip
                          key={act}
                          label={act}
                          selected={formData.preferredActivities.includes(act)}
                          onClick={() => toggleArrayItem('preferredActivities', act)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Who do you want to meet?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {LOOKING_FOR_OPTIONS.map((opt) => (
                        <div
                          key={opt.value}
                          onClick={() => updateField('lookingFor', opt.value)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            formData.lookingFor === opt.value
                              ? 'bg-rose-50 border-rose-400 text-stone-900 shadow-2xs'
                              : 'bg-stone-50/70 border-stone-200 text-stone-600 hover:bg-stone-100'
                          }`}
                        >
                          <div className="text-xs font-bold text-stone-900">{opt.label}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Short Bio (Min 10 characters)
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Share a sentence or two about your personality, weekend routines, or what you're excited to do..."
                      value={formData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all text-sm resize-none"
                    />
                    <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                      <span>Keep it real and conversational</span>
                      <span>{formData.bio.length}/500</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Buttons Controls */}
        <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between gap-3">
          {step > 1 ? (
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={isSubmitting}
              icon={ArrowLeft}
            >
              Back
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setCurrentScreen('landing')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}

          {step < 4 ? (
            <Button
              variant="secondary"
              onClick={handleNext}
              icon={ArrowRight}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              icon={Sparkles}
            >
              Discover Buddies
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

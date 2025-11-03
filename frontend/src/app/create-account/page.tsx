'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Sun, Moon, User, Mail, Lock, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function CreateAccountPage() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Personal Info', fields: ['username', 'email'] },
    { title: 'Security', fields: ['password', 'confirmPassword'] }
  ];

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and number';
        break;
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const stepFields = steps[stepIndex].fields;
    let isValid = true;
    const newErrors: FormErrors = {};

    stepFields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    if (currentStep < steps.length - 1) {
      nextStep();
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ general: errorData.message || 'Registration failed' });
        return;
      }

      // Success - redirect or show success message
      window.location.href = '/dashboard';
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen magna-bg transition-all duration-500">
      {/* Animated Background Elements with Magna Colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 bg-magna-red blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 bg-magna-orange blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 bg-magna-red blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Dark Mode Toggle */}
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border magna-border transition-all duration-300 bg-black/20 text-magna-cream hover:bg-magna-red/20 shadow-magna-glow hover:shadow-magna-glow-lg"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md backdrop-blur-xl rounded-3xl shadow-2xl border magna-border transition-all duration-500 bg-black/20 shadow-magna-glow overflow-hidden"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center p-8 pb-6 bg-gradient-to-r from-magna-red/20 to-magna-orange/20"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-r from-magna-red to-magna-orange shadow-magna-glow"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="text-magna-cream w-8 h-8" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2 magna-text-primary">
              Create Account
            </h1>
            <p className="text-sm magna-text-primary opacity-80">
              Join us and start your journey
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div variants={itemVariants} className="px-8 py-4">
            <div className="flex items-center justify-center mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      index <= currentStep
                        ? 'bg-gradient-to-r from-magna-red to-magna-orange text-magna-cream shadow-magna-glow' 
                        : 'bg-black/30 magna-text-primary magna-border border'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index < currentStep ? <CheckCircle size={16} /> : index + 1}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                      index < currentStep
                        ? 'bg-gradient-to-r from-magna-red to-magna-orange' 
                        : 'bg-magna-red/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm magna-text-primary opacity-80">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Step 0: Personal Info */}
                {currentStep === 0 && (
                  <>
                    {/* Username Field */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2 magna-text-primary">
                        Username
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 magna-text-secondary group-focus-within:text-magna-orange" size={18} />
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          className={`magna-input w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                            errors.username
                              ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                              : ''
                          }`}
                          placeholder="Enter your username"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.username && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 text-sm text-red-400 flex items-center"
                          >
                            <AlertCircle size={16} className="mr-2" />
                            {errors.username}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2 magna-text-primary">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 magna-text-secondary group-focus-within:text-magna-orange" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          className={`magna-input w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                            errors.email
                              ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                              : ''
                          }`}
                          placeholder="Enter your email address"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 text-sm text-red-400 flex items-center"
                          >
                            <AlertCircle size={16} className="mr-2" />
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </>
                )}

                {/* Step 1: Security */}
                {currentStep === 1 && (
                  <>
                    {/* Password Field */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2 magna-text-primary">
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 magna-text-secondary group-focus-within:text-magna-orange" size={18} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          className={`magna-input w-full pl-12 pr-12 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                            errors.password
                              ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                              : ''
                          }`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 magna-text-secondary hover:text-magna-orange"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {errors.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 text-sm text-red-400 flex items-center"
                          >
                            <AlertCircle size={16} className="mr-2" />
                            {errors.password}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Confirm Password Field */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2 magna-text-primary">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 magna-text-secondary group-focus-within:text-magna-orange" size={18} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          className={`magna-input w-full pl-12 pr-12 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                            errors.confirmPassword
                              ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                              : ''
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 magna-text-secondary hover:text-magna-orange"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {errors.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 text-sm text-red-400 flex items-center"
                          >
                            <AlertCircle size={16} className="mr-2" />
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* General Error */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-400/20 rounded-xl text-red-400 text-sm flex items-center"
                >
                  <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                  {errors.general}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 0 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-200 bg-black/30 magna-text-primary magna-border border hover:bg-magna-red/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Previous
                </motion.button>
              )}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-4 px-6 rounded-xl font-medium text-magna-cream transition-all duration-200 bg-gradient-to-r from-magna-red to-magna-orange hover:from-magna-red/80 hover:to-magna-orange/80 shadow-magna-glow disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-magna-cream/30 border-t-magna-cream rounded-full animate-spin mr-2"></div>
                    Creating...
                  </div>
                ) : currentStep === steps.length - 1 ? (
                  'Create Account'
                ) : (
                  'Next'
                )}
              </motion.button>
            </div>

            {/* Sign In Link */}
            <motion.p 
              variants={itemVariants}
              className="text-center text-sm mt-6 magna-text-primary"
            >
              Already have an account?{' '}
              <a 
                href="/sign-in" 
                className="font-medium transition-colors duration-200 magna-text-accent hover:text-magna-orange"
              >
                Sign in
              </a>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
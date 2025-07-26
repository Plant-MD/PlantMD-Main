'use client';

import { useState, useRef } from 'react';
import { Star, Send, CheckCircle, Leaf, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FeedbackType {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const feedbackTypes: FeedbackType[] = [
  { id: 'suggestion', label: 'Suggestion', icon: <Leaf className="w-4 h-4" />, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'compliment', label: 'Compliment', icon: <Heart className="w-4 h-4" />, color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 'issue', label: 'Issue', icon: <MessageCircle className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
];

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ rating?: string; feedback?: string; type?: string }>({});
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
    setErrors(prev => ({ ...prev, rating: undefined }));
  };

  const handleStarHover = (starRating: number) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!rating) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!feedback.trim()) {
      newErrors.feedback = 'Please write your feedback';
    } else if (feedback.trim().length < 10) {
      newErrors.feedback = 'Please provide more detailed feedback (at least 10 characters)';
    }
    
    if (!selectedType) {
      newErrors.type = 'Please select a feedback type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0);
      setFeedback('');
      setSelectedType('');
      setErrors({});
    }, 3000);
  };

  const getRatingText = (currentRating: number) => {
    const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return texts[currentRating] || '';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">Your feedback has been submitted successfully.</p>
            <div className="flex justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">We appreciate your {getRatingText(rating).toLowerCase()} review!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">We Value Your Feedback</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Help us improve by sharing your experience. Your input shapes our future updates.
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Feedback Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900">What type of feedback is this?</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(type.id);
                        setErrors(prev => ({ ...prev, type: undefined }));
                      }}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-200 text-sm font-medium
                        flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-md
                        ${selectedType === type.id 
                          ? `${type.color} border-current shadow-md` 
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }
                      `}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
                {errors.type && (
                  <p className="text-sm text-red-600 animate-fade-in">{errors.type}</p>
                )}
              </div>

              {/* Star Rating */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900">How would you rate your experience?</Label>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => handleStarHover(star)}
                        onMouseLeave={handleStarLeave}
                        onClick={() => handleStarClick(star)}
                        className="p-1 rounded-full hover:bg-yellow-50 transition-all duration-200 transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 transition-all duration-200 ${
                            star <= (hoverRating || rating)
                              ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {(rating > 0 || hoverRating > 0) && (
                    <p className="text-sm font-medium text-gray-700 animate-fade-in">
                      {getRatingText(hoverRating || rating)}
                    </p>
                  )}
                </div>
                {errors.rating && (
                  <p className="text-sm text-red-600 text-center animate-fade-in">{errors.rating}</p>
                )}
              </div>

              {/* Feedback Text */}
              <div className="space-y-3">
                <Label htmlFor="feedback" className="text-base font-semibold text-gray-900">
                  Tell us more about your experience
                </Label>
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    id="feedback"
                    value={feedback}
                    onChange={(e) => {
                      setFeedback(e.target.value);
                      setErrors(prev => ({ ...prev, feedback: undefined }));
                    }}
                    placeholder="What did you like? What could we improve? Any specific features you'd love to see?"
                    className={`min-h-[120px] resize-none text-base leading-relaxed transition-all duration-200 ${
                      errors.feedback ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
                    }`}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {feedback.length}/500
                  </div>
                </div>
                {errors.feedback && (
                  <p className="text-sm text-red-600 animate-fade-in">{errors.feedback}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Feedback...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Feedback</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Your feedback helps us create a better experience for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
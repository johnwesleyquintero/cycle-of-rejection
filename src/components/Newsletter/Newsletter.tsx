import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, CheckCircle } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Newsletter subscription:', data);
      toast.success('Successfully subscribed to our newsletter!');
      setIsSubmitted(true);
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-metal rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-green-500/20 rounded-full">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Journey</h3>
        <p className="text-gray-300">
          Thank you for subscribing! You'll receive exclusive content, early access to new releases, 
          and behind-the-scenes insights into our musical process.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-brand-red hover:text-brand-red-light transition-colors duration-200"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-metal rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-brand-red/20 rounded-full">
            <Mail className="h-8 w-8 text-brand-red" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Join Our Inner Circle</h3>
        <p className="text-gray-300">
          Get exclusive content, early access to new releases, and insights into our creative process.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email Address *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-brand-gray-lighter/20 border border-brand-gray-lighter/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
            First Name *
          </label>
          <input
            {...register('firstName')}
            type="text"
            id="firstName"
            className="w-full px-4 py-3 bg-brand-gray-lighter/20 border border-brand-gray-lighter/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200"
            placeholder="Your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
          )}
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            What interests you most? *
          </label>
          <div className="space-y-3">
            {[
              { value: 'new-releases', label: 'New Music Releases' },
              { value: 'tour-dates', label: 'Tour Announcements' },
              { value: 'behind-scenes', label: 'Behind the Scenes Content' },
              { value: 'merchandise', label: 'Exclusive Merchandise' },
              { value: 'lore', label: 'Band Lore & Concepts' },
            ].map((interest) => (
              <label key={interest.value} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  {...register('interests')}
                  type="checkbox"
                  value={interest.value}
                  className="w-5 h-5 text-brand-red bg-brand-gray-lighter/20 border-brand-gray-lighter/30 rounded focus:ring-brand-red focus:ring-2"
                />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  {interest.label}
                </span>
              </label>
            ))}
          </div>
          {errors.interests && (
            <p className="mt-1 text-sm text-red-400">{errors.interests.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-red hover:bg-brand-red-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <Mail className="h-5 w-5" />
              <span>Subscribe Now</span>
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-4 text-center">
        We respect your privacy. Unsubscribe at any time. No spam, just quality content.
      </p>
    </div>
  );
}
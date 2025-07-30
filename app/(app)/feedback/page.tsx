// app/(app)/feedback/page.tsx
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import Image from 'next/image';


export default function FeedbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session?.user?.email || !session?.user?._id) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <FeedbackForm 
          userEmail={session.user.email} 
          userId={session.user._id} 
        />

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Your feedback helps us create a better experience for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
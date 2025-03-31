'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      router.push('/events'); // Du-l direct în aplicație
    } else {
      router.push('/landing'); // Du-l la landing
    }
  }, [router]);

  return null;
}

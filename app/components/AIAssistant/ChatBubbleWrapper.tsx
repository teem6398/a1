'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// استيراد مكون ChatBubble بشكل ديناميكي لتجنب أخطاء SSR
const ChatBubble = dynamic(() => import('./ChatBubble'), { ssr: false });

export default function ChatBubbleWrapper() {
  const [mounted, setMounted] = useState(false);

  // التأكد من أن المكون يتم تحميله فقط على جانب العميل
  useEffect(() => {
    setMounted(true);
  }, []);

  // لا تعرض أي شيء أثناء التحميل
  if (!mounted) {
    return null;
  }

  // عرض مكون المحادثة
  return <ChatBubble />;
} 
'use client';

import React from 'react';
import { AllNews } from './index';
import Footer from '../../Home/Footer/footers';

export default function NewsPage() {
  return (
    <>
      <main>
        <AllNews />
      </main>
      <Footer />
    </>
  );
}

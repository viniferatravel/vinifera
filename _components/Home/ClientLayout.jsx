'use client';

import { useState, useEffect } from "react";
import Loading from "../Loading";
import '@/app/styles/globals.css';

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {

    const hasLoadedBefore = sessionStorage.getItem('hasLoaded');

    if (!hasLoadedBefore) {

      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasLoaded', 'true');
        setFadeIn(true);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={`content ${fadeIn ? 'fade-in' : ''}`}>
          {children}
        </div>
      )}
    </>
  );
}

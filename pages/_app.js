import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { supabase } from '@/utils/supabase';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

const _app = ({ Component, pageProps }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
    <Head>
      <title>Adrenargy</title>
    </Head>
    <div className="flex justify-between flex-col min-h-screen md:h-screen bg-cover bg-[url('/img/workout.png')]">
      <Navbar session={session} />
      <Component {...pageProps} session={session} />
      <Footer />
    </div>
    </>
  );
};

export default _app;

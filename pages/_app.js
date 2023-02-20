import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

const _app = ({
    Component,
    pageProps
}) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.session());
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        });
    }, []);


    return (
        <div className='flex justify-between flex-col h-full md:h-screen'>
            <Navbar session={session} />
            <Component {...pageProps} session={session} />
            <Footer />
        </div>
    )
}

export default _app
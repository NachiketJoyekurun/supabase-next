import Welcome from '@/components/Welcome';
import WorkoutCard from '@/components/WorkoutCard';
import WorkoutList from '@/components/WorkoutList';
import { db } from '@/services/db';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Index = ({ session }) => {
  const [data, setData] = useState([]);
  const [indexData, setIndexData] = useState([]);
  const [loading, setLoading] = useState(true);
  const indexDbTable = 'workout';
  const [online, setOnline] = useState(true);

  const fetchWorkouts = async () => {
    const user = supabase.auth.user();

    if (user === null) {
      setLoading(false);
    } else {
      try {
        setLoading(true);
        user;
        const { data, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('user_id', user?.id);

        if (error) throw error;
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const restore = async () => {
    db.open();

    async function restoreItems() {
      const table = db.table(indexDbTable);
      const items = await table.toArray();

      items.forEach(async (item) => {
        const { id, ...indexData } = item;
        const { indexData: newData, error } = await supabase
          .from('workouts')
          .insert(indexData);

        setIndexData(newData);
        await table.delete(item.id);
      });
    }

    restoreItems();
  };

  const handleDelete = async (id) => {
    try {
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      fetchWorkouts();

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOnline(navigator.onLine);

    function handleOnline() {
      setOnline(true);
    }

    function handleOffline() {
      setOnline(false);
    }

    if (window.navigator.onLine == true) {
      restore();
    }

    fetchWorkouts();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }
  }, []);

  if (loading) {
    return <p className="text-center">Fetching Workouts...</p>;
  }

  return (
    <div>
      {!session?.user ? (
        <div className='mx-8'>
          <h1 className="text-2xl font-extrabold text-center sm:text-left sm:text-6xl mb-2">
            Welcome to Adrenargy,
          </h1>
          <p className='text-lg sm:text-2xl'>Kindly login to your account or sign up to continue</p>
        </div>
      ) : (
          <div className='text-center'>
            {online ?
              (
                <div>
                  <Welcome session={session.user.email.split('@')[0]} />
                  <h1 className="text-xl">Here are your workouts:</h1>
                  <WorkoutCard data={data} handleDelete={handleDelete} />
                  <Link href="/create">
                    <button className='mb-3'>Create New Workout</button>
                  </Link>
                </div>
              )
              :
              (
                <>
                  {indexData !== 0 &&
                    <div>
                      <h1 className="text-xl">Here are your workouts:</h1>
                      <WorkoutList />
                      <Link href="/create">
                        <button className='mb-3'>Create New Workout</button>
                      </Link>
                    </div>
                  }

                </>
              )}
          </div>
      )}
    </div>
  );

};

export default Index;

import Welcome from '@/components/Welcome';
import WorkoutCard from '@/components/WorkoutCard';
import WorkoutList from '@/components/WorkoutList';
import { db } from '@/services/db';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const index = ({
    session
}) => {
    const [data, setData] = useState([]);
    const [indexData, setIndexData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(true);
    const indexDbTable = 'workout';

    const fetchWorkouts = async () => {
        const user = supabase.auth.user();

        if (user === null) {
            setLoading(false);

        } else {
            try {
                setLoading(true);
                user
                const { data, error } = await supabase
                    .from("workouts")
                    .select('*')
                    .eq("user_id", user?.id);

                if (error) throw error;
                setData(data);
            }
            catch (error) {
                alert("Error: " + error.message);
            }
            finally {
                setLoading(false);
            }
        }
    }

    const getAllIndexDb = async () => {
        db.open();

        async function getAllItems() {
            const items = await db.table(indexDbTable).toArray();
            console.log('Items Lengt: ' + items.length + ', and ,' + JSON.stringify(items));

            const { indexData, error } = await supabase
                .from("workouts")
                .upsert(items, { onConflict: 'id' });

                setIndexData(indexData);

            if (error) {
                console.log('Error pushing items to Supabase:', error);
            } else {
                console.log('Items pushed to Supabase:', indexData);
            }

        }

        getAllItems();

    }

    const clearIndexedDb = async () => {
        db.open();
        console.log(db)

        async function clearTable() {
            await db.table(indexDbTable).clear();
            console.log('all items cleared');
        }
        clearTable();
    }

    const handleDelete = async (id) => {
        try {
            const user = supabase.auth.user();

            const { data, error } = await supabase
                .from("workouts")
                .delete()
                .eq("id", id)
                .eq("user_id", user?.id);

            fetchWorkouts();

            if (error) throw error;
            alert("Workout deleted successfully");

        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        fetchWorkouts();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };

    }, [])

    if (isOnline) {
        console.log("Online...");
        getAllIndexDb();
    } else {
        console.log('Offline...')
    }

    if (loading) {
        return <p className='text-center'>Fetching Workouts...</p>;
    }

    return (
        <div className='h-screen'>
            {!session?.user ?
                (
                    <h1 className='text-center'>Welcome to Adrenargy, Kindly login to your account or sign in for a demo</h1>
                ) : (
                    <div className='text-center'>
                        {data.length === 0 && indexData === 0 && isOnline ? (
                            <div className='flex flex-col justify-center items-center mt-72'>
                                <Welcome session={session.user.email.split('@')[0]} />
                                <p className='my-4'>You have no workouts yet... ╯︿╰</p>
                                <Link href="/create">
                                    <button>Create New Workout</button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {
                                    data.length !== 0 && isOnline ? (
                                        <div>
                                            <h1 className='text-xl'>Here are your workouts:</h1>
                                            <WorkoutCard data={data} handleDelete={handleDelete} />
                                            <Link href="/create">
                                                <button>Create New Workout</button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div>
                                            <WorkoutList />
                                            <Link href="/create">
                                                <button>Create New Workout</button>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        )}

                    </div>
                )}
        </div>
    )
}

export default index
import Welcome from '@/components/Welcome';
import WorkoutCard from '@/components/WorkoutCard';
import WorkoutList from '@/components/WorkoutList';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const index = ({
    session
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkouts();
    }, [])

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

    if (loading) {
        return <p className='text-center'>Fetching Workouts...</p>;
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

    return (
        <div className='h-screen'>
            {!session?.user ? (
                <h1 className='text-center'>Welcome to Adrenargy, Kindly login to your account or sign in for a demo</h1>
            ) : (
                <div className='text-center'>
                    {data.length === 0 ? (
                        <div className='flex flex-col justify-center items-center mt-72'>
                            <Welcome session={session.user.email.split('@')[0]} />
                            <p className='my-4'>You have no workouts yet... ╯︿╰</p>
                            <Link href="/create">
                                <button>Create New Workout</button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h1 className='text-xl'>Here are your workouts:</h1>
                            <WorkoutCard data={data} handleDelete={handleDelete} />

                            <hr className='mt-6 border-b-4 border-[#f35815]' />
                            <WorkoutList />

                            <Link href="/create">
                                <button>Create New Workout</button>
                            </Link>

                        </div>

                    )}
                </div>
            )}
        </div>
    )
}

export default index
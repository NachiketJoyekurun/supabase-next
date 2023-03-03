import { db } from '@/services/db';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Create = () => {
  const initialState = {
    title: '',
    loads: '',
    reps: '',
  };

  const router = useRouter();

  const [workoutData, setWorkoutData] = useState(initialState);
  const { title, loads, reps } = workoutData;

  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const createWorkout = async () => {
    const user = supabase.auth.user();
    const userUId = JSON.parse(localStorage.getItem('supabase.auth.token'))
      .currentSession.user.id;

    useEffect(async () => {
      if (window.navigator.onLine == true) {
        try {
          const { data, error } = await supabase
            .from('workouts')
            .insert([
              {
                title,
                loads,
                reps,
                user_id: user?.id,
              },
            ])
            .single();

          if (error) throw error;

          alert('Workout created successfully');

          setWorkoutData(initialState);
          router.push('/');
        } catch {
          alert('Error: ' + error.message);
        }
      } else {
        try {
          const id = await db.workout.add({
            loads,
            reps,
            title,
            user_id: userUId,
          });

          console.log(
            `A new workout ${title} was successfully added with id ${id}`
          );
          setWorkoutData(initialState);
          router.push('/');
        } catch (error) {
          alert('Error: ' + error.message);
        }
      }
    }, [])
  };

  return (
    <div className="form text-center">
      <p>Create a New Workout</p>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        className="textfield"
        placeholder="Enter a title"
      />
      <label>Load (kg):</label>
      <input
        type="text"
        name="loads"
        value={loads}
        onChange={handleChange}
        className="textfield"
        placeholder="Enter weight load"
      />
      <label>Reps:</label>
      <input
        type="text"
        name="reps"
        value={reps}
        onChange={handleChange}
        className="textfield"
        placeholder="Enter number of reps"
      />

      <button onClick={createWorkout}>Create Workout</button>
    </div>
  );
};

export default Create;

import Button from '@/components/buttons/Button';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Edit = () => {
  const [workout, setWorkout] = useState(null);
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const user = supabase.auth.user();

    const getWorkout = async () => {
      if (!id) return;

      const { data } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user?.id)
        .filter('id', 'eq', id)
        .single();

      setWorkout(data);
    };

    getWorkout();
  }, [id]);

  const handleOnChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const updateWorkout = async () => {
    const { title, loads, reps } = workout;
    const user = supabase.auth.user();

    const { data } = await supabase
      .from('workouts')
      .update({
        title,
        loads,
        reps,
      })
      .eq('id', id)
      .eq('user_id', user?.id);

    alert('Workout updated successfully');

    router.push('/');
  };

  return (
    <div className="form">
      <h1>Edit Workout</h1>
      <label> Title:</label>
      <input
        type="text"
        name="title"
        value={workout?.title}
        onChange={handleOnChange}
        className="textfield"
      />
      <label> Load (kg):</label>
      <input
        type="text"
        name="loads"
        value={workout?.loads}
        onChange={handleOnChange}
        className="textfield"
      />
      <label> Reps:</label>
      <input
        type="text"
        name="reps"
        value={workout?.reps}
        onChange={handleOnChange}
        className="textfield"
      />

      <Button onClick={updateWorkout} label="Update Workout" />
    </div>
  );
};

export default Edit;

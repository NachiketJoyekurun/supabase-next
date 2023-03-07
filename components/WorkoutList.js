import { db } from '@/services/db';
import { useLiveQuery } from 'dexie-react-hooks';
import Button from './buttons/Button';

const WorkoutList = () => {
  const workout = useLiveQuery(async () => {
    const workout = await db.workout.toArray();
    return workout;
  }, []);

  const deleteItem = async (id) => {
    try {
      const dltWorkout = await db.workout.where('id').equals(id).delete();

      return dltWorkout;
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <>
      {workout?.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 m-6">
          {workout?.map((work) => (
            <div
              key={work.id}
              className="border border-[#f35815] text-justify p-4 rounded-md"
            >
              <p className="capitalize">
                <span className="uppercase tracking-widest">Title</span>:{' '}
                {work.title}
              </p>
              <p>
                <span className="uppercase tracking-widest">Id</span>: {work.id}
              </p>
              <p>
                <span className="uppercase tracking-widest">Load-kg</span>:{' '}
                {work.loads}
              </p>
              <p>
                <span className="uppercase tracking-widest">Reps</span>:{' '}
                {work.reps}
              </p>
              <Button
                label={'Delete Workout'}
                onClick={() => deleteItem(work.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>You are offline 📶</p>
          <p className="my-4">You have no workouts yet... ╯︿╰</p>
        </div>
      )}
    </>
  );
};

export default WorkoutList;

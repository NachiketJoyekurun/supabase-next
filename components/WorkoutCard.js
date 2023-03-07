import Link from 'next/link';
import Button from './buttons/Button';

const WorkoutCard = ({ data, handleDelete }) => {
  return (
    <>
      {data.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 m-6">
          {data?.map((item) => (
            <div
              className="border border-[#f35815] text-justify p-4 rounded-md backdrop-blur-xl"
              key={item.id}
            >
              <p className="capitalize">
                <span className="uppercase tracking-widest">Title</span>:{' '}
                {item.title}
              </p>
              <p>
                <span className="uppercase tracking-widest">Load-kg</span>:{' '}
                {item.loads}
              </p>
              <p>
                <span className="uppercase tracking-widest">Reps</span>: {item.reps}
              </p>

              <div className="flex justify-around mt-3">
                <Link href={`/edit/${item.id}`}>
                  <button> Edit</button>
                </Link>

                <Button
                  label={'Delete Workout'}
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="my-4">You have no workouts yet... ╯︿╰</p>
      )}
    </>
  );
};

export default WorkoutCard;

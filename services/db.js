import Dexie from 'dexie';

export const db = new Dexie('workoutDatabase');
db.version(1).stores({ workout: '++id, user_id, title, loads, reps' });

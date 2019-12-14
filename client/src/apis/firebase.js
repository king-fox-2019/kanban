import db from '@/configs/firebase';

const Task = db.collection('tasks');

export default { Task };

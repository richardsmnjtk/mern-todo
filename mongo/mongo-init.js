db.auth('root', 'czTGg54Epu')

db = db.getSiblingDB('todos')

db.createUser({
  user: 'admin',
  pwd: 'danmerasahina',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});

db = db.getSiblingDB('todoshegi')

db.createUser({
  user: 'adminhegi',
  pwd: 'danmerasahina',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});

db = db.getSiblingDB('todosajin')

db.createUser({
  user: 'adminajin',
  pwd: 'danmerasahina',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});

db = db.getSiblingDB('todosindra')

db.createUser({
  user: 'adminindra',
  pwd: 'danmerasahina',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});

db = db.getSiblingDB('todosizam')

db.createUser({
  user: 'adminizam',
  pwd: 'danmerasahina',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});
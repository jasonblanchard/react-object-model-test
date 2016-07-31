import courses from './courseFixtures';
import topics from './topicsFixtures';
import lessons from './lessonsFixtures';

const entities = {
  'Course': courses,
  'Topic': topics,
  'Lesson': lessons,
};

export default {
  get: (entity, id) => new Promise(resolve => {
    setTimeout(() => {
      if (id) return resolve(entities[entity].find(object => object.id === id));
      return resolve(entities[entity]);
    }, 300);
  }),
};

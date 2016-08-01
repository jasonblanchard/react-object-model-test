import courses from './courseFixtures';
import topics from './topicsFixtures';
import lessons from './lessonsFixtures';

const entities = {
  Course: courses,
  Topic: topics,
  Lesson: lessons,
};

export default {
  get: (entity, id) => new Promise(resolve => {
    setTimeout(() => {
      if (id) return resolve(entities[entity].find(object => object.id === id));
      return resolve(entities[entity]);
    }, 300);
  }),

  update: (entityType, id, params) => new Promise(resolve => {
    setTimeout(() => {
      let entity = entities[entityType].find(object => object.id === id);
      const entityIndex = entities[entityType].findIndex(object => object.id === id);
      entity = Object.assign({}, entity, params);
      entities[entityType] = [
        ...entities[entityType].slice(0, entityIndex),
        ...[entity],
        ...entities[entityType].slice(entityIndex + 1, entities[entityType].length),
      ];
      return resolve(entity);
    }, 300);
  }),
};

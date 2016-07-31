export function loadModels(entities) {
  return {
    type: 'LOAD_MODELS',
    payload: entities,
  };
}

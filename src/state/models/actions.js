export function fetchModels() {
  return {
    type: 'FETCH_MODELS',
  };
}

export function receiveModels(entities) {
  return {
    type: 'RECIEVE_MODELS',
    payload: entities,
  };
}

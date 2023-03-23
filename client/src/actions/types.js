// Definimos la lista de acciones
const actions = [
    // Identificacion
    "UPDATE_TOKEN",
    "GET_TOKEN",
  ];
  
  // Las convertimos en un objeto
  const actionTypes = {};
  actions.forEach(action => {
    actionTypes[action] = action;
  });
  
  export default actionTypes;
  
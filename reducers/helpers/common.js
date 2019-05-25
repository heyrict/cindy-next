export const getSubsetActions = actionSubset => (key, actionType) => {
  const returns = {};
  Object.entries(actionSubset).forEach(([act, func]) => {
    returns[`${act}${key}`] = (...args) => ({
      type: actionType,
      payload: func(...args),
    });
  });
  return returns;
};

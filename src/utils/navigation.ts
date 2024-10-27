export const getScreenName = state => {
    const route = state.routes[state.index];
  
    if (route.state) return getScreenName(route.state);
    return route.name;
  };
  
  export const getStackName = state => {
    if (!state || typeof state.index !== 'number') {
      return 'Unknown';
    }
    const route = state.routes[state.index];
    if (route.state) {
      return getStackName(route.state);
    }
    return route.name;
  };
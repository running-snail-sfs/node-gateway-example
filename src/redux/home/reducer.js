const nameSpace = 'home';
const defaultState = {
  name: '李四',
};

const  home=(state = defaultState, action)=> {
  switch (action.type) {
    case `${nameSpace}/changeName`:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}
export default home

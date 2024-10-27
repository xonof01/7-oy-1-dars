import { useReducer, useState, useEffect } from 'react';
import { Button } from 'antd';
import { useFetch } from './hook/useFetch';
import UserItem from './components/UserItem';
import './App.css';

const initialState = {
  liked: [],
  saved: []
};

const addItemToState = (state, item, key) => {
  const isAlreadyAdded = state[key].some(existingItem => existingItem.id === item.id);
  if (isAlreadyAdded) return state;

  return {
    ...state,
    [key]: [...state[key], { ...item, [key === 'liked' ? 'isLiked' : 'isSaved']: true }]
  };
};

function reducer(state, action) {
  if (action.type === 'liked') {
    return addItemToState(state, action.payload, 'liked');
  } else if (action.type === 'saved') {
    return addItemToState(state, action.payload, 'saved');
  }
  return state;
}

function App() {
  const { users } = useFetch('/users');
  const [usersData, setUsersData] = useState([]);
  const [products, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <div className="flex items-center justify-center gap-[30px] p-5">
        <Button onClick={() => setUsersData(products.liked)} size="large">Liked {products.liked.length}</Button>
        <Button onClick={() => setUsersData(products.saved)} size="large">Saved {products.saved.length}</Button>
      </div>
      <div className="p-5 flex justify-between flex-wrap gap-[20px]">
        {usersData &&
          usersData.map(item => (
            <UserItem
              handleLikedBtnClick={() => dispatch({ type: 'liked', payload: item })}
              handleSavedBtnClick={() => dispatch({ type: 'saved', payload: item })}
              dispatch={dispatch}
              item={item}
              key={item.id}
            />
          ))}
      </div>
    </>
  );
}

export default App;

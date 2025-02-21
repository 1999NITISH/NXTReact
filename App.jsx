// App.js
import React, { useState, useEffect } from 'react';
import ListContainer from './components/ListContainer';
import Loader from './components/Loader';
import ErrorView from './components/ErrorView';
import './App.css';

const App = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/list-creation/lists');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setLists(data.lists);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  const handleSelectList = (listId) => {
    setSelectedLists((prev) => {
      if (prev.includes(listId)) {
        return prev.filter((id) => id !== listId);
      }
      return [...prev, listId];
    });
  };

  const createNewList = () => {
    if (selectedLists.length !== 2) {
      alert('You should select exactly 2 lists to create a new list');
      return;
    }
    setNewList([]);
  };

  const moveItem = (item, fromListId) => {
    if (fromListId === selectedLists[0]) {
      setNewList((prev) => [...prev, item]);
    } else {
      setNewList((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const cancelCreation = () => {
    setNewList([]);
    setSelectedLists([]);
  };

  const updateLists = () => {
    // Logic to update the lists with new items
    // This can be implemented based on specific requirements
  };

  if (loading) return <Loader />;
  if (error) return <ErrorView onRetry={() => window.location.reload()} />;

  return (
    <div className="App">
      <h1>List Creation</h1>
      <div className="list-container">
        {lists.map((list) => (
          <ListContainer
            key={list.id}
            list={list}
            onSelect={handleSelectList}
            selected={selectedLists.includes(list.id)}
            moveItem={moveItem}
          />
        ))}
      </div>
      <button onClick={createNewList}>Create a new list</button>
      {newList.length > 0 && (
        <div className="new-list-container">
          <h2>New List</h2>
          {newList.map((item) => (
            <div key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => moveItem(item, selectedLists[1])}>Move to List 2</button>
            </div>
          ))}
          <button onClick={cancelCreation}>Cancel</button>
          <button onClick={updateLists}>Update</button>
        </div>
      )}
    </div>
  );
};

export default App;
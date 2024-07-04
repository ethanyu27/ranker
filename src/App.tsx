import React from 'react';
import logo from './logo.svg';
import RankList from './RankList';
import './App.css';

export interface List {
    name: string;
    items: string[];
}

function App() {
    const [lists, setLists] = React.useState<List[]>([]);
    const [listCounter, setListCounter] = React.useState<number>(1);

    const listComponents = React.useMemo(() => {
      return lists.map(list => <div className={"App-list"}>
        <RankList list={list} handleDelete={() => handleDeleteList(list.name)} handleAddItem={() => handleAddListItem(list.name)}/>
      </div>);
    }, [lists])

    const handleAddListItem = (listName: string) => {
      setLists(lists.map(list => list.name === listName ? {name: listName, items: [...list.items, "New Item"]} : list));
    }

    const handleDeleteList = (name: string) => {
      setLists(lists.filter(item => item.name !== name));
    }

    const handleAddList = () => {
      const newName = `List ${listCounter}`;
      setListCounter(listCounter + 1);
      setLists([...lists,
        {name: newName, items: []}
      ])
    }

    return (
      <div className={"App-layout"}>
        <h1>Lists</h1>
        {listComponents}
        <div>
          <button onClick={handleAddList}>Add New List</button>
        </div>
      </div>
    );
}

export default App;

import React from 'react';
import RankList from './RankList';
import InputModal from './InputModal';
import './App.css';

export interface ListItem {
    name: string;
}
export interface List {
    name: string;
    items: ListItem[];
}

function App() {
    const [lists, setLists] = React.useState<List[]>([]);
    const [modalListName, setModalListName] = React.useState<string>('');
    const [modalHeader, setModalHeader] = React.useState<string>('');
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const listComponents = React.useMemo(() => {
      return lists.map((list, listIndex) => <div className={"App-list"}>
        <RankList 
          list={list} 
          handleDelete={() => handleDeleteList(listIndex)} 
          handleAddItem={() => handleModal(list.name, "Add to ")}
          handleDeleteItem={(ind: number) => handleDeleteListItem(list.name, ind)}
          handleSwapItems={(ind1: number, ind2: number) => swapListItems(list.name, ind1, ind2)}/>
      </div>);
    }, [lists])

    const handleModal = (listName: string, header: string) => {
      setModalHeader(header + listName);
      setModalListName(listName);
      setModalOpen(true);
    }

    const handleAddListItem = (listName: string, item: string) => {
      const newItem: ListItem = {
        name: item
      };
      setLists(lists.map(list => list.name === listName ? {name: listName, items: [...list.items, newItem]} : list));
    }

    const handleDeleteListItem = (listName: string, itemInd: number) => {
      setLists(lists.map(list => list.name !== listName ? list : {
        name: listName,
        items: list.items.filter((_, ind) => ind !== itemInd)
      }))
    }

    const swapListItems = (listName: string, ind1: number, ind2: number) => {
      setLists(lists.map(list => list.name !== listName ? list : {
        name: listName,
        items: list.items.map((item, ind) => ind === ind1 ? list.items[ind2] : ind === ind2 ? list.items[ind1] : item)
      }))
    }

    const handleDeleteList = (listInd: number) => {
      setLists(lists.filter((_,ind) => listInd !== ind));
    }

    const handleAddList = (name: string) => {
      setLists([...lists,
        {name: name, items: []}
      ])
    }

    return (
      <div className={"App-layout"}>
        <h1>Ranked Lists</h1>
        {listComponents}
        <div>
          <button onClick={() => handleModal('', "Create New List")}>Add New List</button>
        </div>
        <InputModal
          header={modalHeader}
          listName={modalListName} 
          modalOpen={modalOpen}
          handleAdd={(input) => modalListName ? handleAddListItem(modalListName, input) : handleAddList(input)}
          closeModal={() => setModalOpen(false)}
        />
      </div>
    );
}

export default App;

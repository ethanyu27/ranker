import React from 'react';
import {List} from './App';

export interface ListProps {
    list: List;
    handleAddItem: () => void;
    handleDelete: () => void;
    handleDeleteItem: (ind: number) => void;
    handleSwapItems: (ind1: number, ind2: number) => void;
}

function RankList(props: ListProps) {

    const listDisplay = React.useMemo(() => props.list.items.map((item, ind) => 
        <div className={'App-list-item'}>
            <button 
                onClick={() => props.handleDeleteItem(ind)}
                className={'App-list-item-delete'}>
            -
            </button>
            <button disabled={ind === 0} onClick={() => props.handleSwapItems(ind, ind-1)}>
            Up
            </button>
            <button disabled={ind === props.list.items.length - 1} onClick={() => props.handleSwapItems(ind, ind+1)}>
            Down
            </button>
            <label className={'App-list-item-label'}>{item.name}</label>
        </div>
    ), [props.list.items]);

    return (
        <div>
            <h3>{props.list.name}</h3>
            {listDisplay}
            <div style={{marginTop: '5px'}}>
                <button onClick={props.handleAddItem}>+</button>
                <button style={{marginLeft: "5px"}} onClick={props.handleDelete}>Delete List</button>
            </div>
        </div>
    );
}

export default RankList;
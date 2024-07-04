import React from 'react';
import {List} from './App';

export interface ListProps {
    list: List;
    handleAddItem: () => void;
    handleDelete: () => void;
}

function RankList(props: ListProps) {

    const listDisplay = React.useMemo(() => props.list.items.map(item => <div>{item}</div>), [props.list.items]);

    return (
        <div>
            <h3>{props.list.name}</h3>
            {listDisplay}
            <div>
                <button onClick={props.handleDelete}>Delte List</button>
                <button onClick={props.handleAddItem}>+</button>
            </div>
        </div>
    );
}

export default RankList;
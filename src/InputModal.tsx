import React from 'react';
import Modal from 'react-modal';

export interface InputModalProps {
    header: string;
    listName: string;
    modalOpen: boolean;
    handleAdd: (item: string) => void;
    closeModal: () => void;
}

export function InputModal(props: InputModalProps) {

    const [inputValue, setInputValue] = React.useState<string>('');

    return (
        <Modal isOpen={props.modalOpen}>
            <div>
                <h3>{props.header}</h3>
            </div>
            <div>
                <input onChange={(event) => setInputValue(event.target.value)} style={{margin: "2px"}}/>
                <button disabled={!inputValue} style={{margin: "2px"}} onClick={() => {
                    props.handleAdd(inputValue);
                    props.closeModal();
                }}>Submit</button>
                <button style={{margin: "2px"}} onClick={() => props.closeModal()}>Close</button>
            </div>
        </Modal>
    )
}

export default InputModal;
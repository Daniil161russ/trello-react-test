import Card from '../Card/Card';
import ConfirmModal from '../Common/ConfirmModal';
import { useEffect, useState, useRef } from 'react';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from "react-smooth-dnd";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/constant';
import { v4 as uuidv4 } from 'uuid';

import './Column.scss';

const Column = (props) => {

    const { column, onCardDrop, onUpdateColumn } = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const [isShowModalDelete, setShowModalDelete] = useState(false);
    const [titleColumn, setTitleColumn] = useState('');
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);
    const [valueTextArea, setValueTextArea] = useState('');

    const inputRef = useRef(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (column && column.title) {
            setTitleColumn(column.title);
        }
    }, [column])

    useEffect(() => {
        if (isShowAddNewCard === true && textAreaRef && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [isShowAddNewCard])

    const toggleModal = () => {
        setShowModalDelete(!isShowModalDelete);
    }

    const onModalAction = (type) => {
        if (type === MODAL_ACTION_CLOSE) {
            // do
        }
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true,
            }
            onUpdateColumn(newColumn);
        }

        toggleModal();
    }

    const selectAllText = (event) => {
        setIsFirstClick(false);
        if (isFirstClick) {
            event.target.select();
        } else {
            inputRef.current.setSelectionRange(titleColumn.length, titleColumn.length);
        }
    }

    const handleClickOutside = () => {
        setIsFirstClick(true);
        const newColumn = {
            ...column,
            title: titleColumn,
            _destroy: false,
        }
        onUpdateColumn(newColumn);
    };

    const handleAddNewCard = () => {
        if (!valueTextArea) {
            textAreaRef.current.focus();
            return;
        }

        const newCard = {
            id: uuidv4(),
            boardId: column.boardId,
            columnId: column.id,
            title: valueTextArea,
            image: null,
        }

        let newColumn = { ...column };
        newColumn.cards = [...newColumn.cards, newCard];
        newColumn.cardOrder = newColumn.cards.map((card) => card.id);

        onUpdateColumn(newColumn);
        setValueTextArea('');
        setIsShowAddNewCard(false);
    }

    return (
       <>
            <div className='column'>
                <header className='column__header column-drag-handle'>
                    <div className='column__title'>
                        <input 
                            type="text" 
                            className='form-control' 
                            value={titleColumn} 
                            onClick={selectAllText}
                            onChange={(event) => setTitleColumn(event.target.value)} 
                            onBlur={handleClickOutside}
                            onMouseDown={(e) => e.preventDefault()}
                            ref={inputRef}
                        />
                    </div>
                    <i className="fa fa-solid fa-trash icon-delete" onClick={toggleModal}></i>
                </header>
                <div className='card-list'>
                    <Container
                        {...column.props}
                        groupName="col"
                        onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
                        getChildPayload={index => cards[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview' 
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >

                        { cards && cards.length > 0 && cards.map((card, index) => {
                            return (
                                <Draggable key={card.id}>
                                    <Card card={card}/>
                                </Draggable>       
                            )
                        })}

                    </Container>

                    { isShowAddNewCard === true &&
                        <div className='add-new-card'>
                            <textarea 
                                type="text"
                                rows='2' 
                                className='form-control' 
                                placeholder='Enter a title for this card...'
                                ref={textAreaRef}
                                value={valueTextArea}
                                onChange={(event) => setValueTextArea(event.target.value)}
                            />
                            <div className='group-btn'>
                                <button className='btn btn-success' onClick={() => handleAddNewCard()}>Add list</button>
                                <i className='fa fa-times icon' onClick={() => setIsShowAddNewCard(false)}></i>
                            </div>
                        </div>   
                    }
                </div>
                { isShowAddNewCard === false &&
                    <footer>
                        <div className='footer__action' onClick={() => setIsShowAddNewCard(true)}>
                            <i className='fa fa-plus icon'></i> Add another card
                        </div>
                    </footer>
                }
            </div>
            <ConfirmModal 
                show={isShowModalDelete}
                title={'Remove a column'}
                content={`Are you sure to remove this column: ${column.title}`}
                onAction={onModalAction}
            />
       </> 
    )
}

export default Column;
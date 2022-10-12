import Card from '../Card/Card';
import ConfirmModal from '../Common/ConfirmModal';
import { useEffect, useState, useRef } from 'react';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from "react-smooth-dnd";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/constant';

import './Column.scss';

const Column = (props) => {

    const { column, onCardDrop, onUpdateColumn } = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const [isShowModalDelete, setShowModalDelete] = useState(false);
    const [titleColumn, setTitleColumn] = useState('');
    const [isFirstClick, setIsFirstClick] = useState(true);

    const inputRef = useRef(null);

    useEffect(() => {
        if (column && column.title) {
            setTitleColumn(column.title);
        }
    }, [column])

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
                </div>
                <footer>
                    <div className='footer__action'>
                        <i className='fa fa-plus icon'></i> Add another card
                    </div>
                </footer>
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
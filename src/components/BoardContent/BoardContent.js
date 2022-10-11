import Column from '../Column/Column';
import { data } from '../../actions/data';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from '../../utilities/dragDrop';

import './BoardContent.scss';

const BoardContent = () => {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardData = data.boards.find((item) => item.id === 'board-1');

        if (boardData) {
            setBoard(boardData);

            setColumns(mapOrder(boardData.columns, boardData.columnOrder, 'id'));
        }
    }, []);

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = {...board};
        newBoard.columnOrder = newColumns.map((column) => column.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    }

    const onCardDrop = (dropResult, columnId) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            console.log('cardDrop',  dropResult, 'with column id', columnId);

            let newColumns = [...columns];
            let currentColumn = newColumns.find((column) => column.id === columnId)
            
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);

            setColumns(newColumns);
        }
    }

    if (_.isEmpty(board)) {
        return (
            <>
                <div className='not-found'>Board not found</div>
            </>
        )
    }

    return (
       <>
            <div className='board-columns'>
                <Container
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    getChildPayload={index => columns[index]}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview'
                    }}
                >

                    {columns && columns.length && columns.map((column, index) => {
                        return (
                            <Draggable key={column.id}>
                                <Column column={column} onCardDrop={onCardDrop} />
                            </Draggable>
                        )
                    })}

                    <div className='add-new-column'>
                        <i className='fa fa-plus icon'></i> Add another column
                    </div>

                </Container>
            </div>
       </> 
    )
}

export default BoardContent;
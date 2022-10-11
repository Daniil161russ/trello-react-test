import Column from '../Column/Column';
import { data } from '../../actions/data';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from "react-smooth-dnd";

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
        console.log('dropResult', dropResult);
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
                                <Column column={column} />
                            </Draggable>
                        )
                    })}

                </Container>
            </div>
       </> 
    )
}

export default BoardContent;
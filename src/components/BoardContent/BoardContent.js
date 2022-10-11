import Column from '../Column/Column';
import { data } from '../../actions/data';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { mapOrder } from '../../utilities/sorts';

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
                {columns && columns.length && columns.map((column, index) => {
                    return (
                        <Column key={column.id} column={column} />
                    )
                })}
                
            </div>
       </> 
    )
}

export default BoardContent;
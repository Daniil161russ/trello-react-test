import Task from '../Task/Task';
import './Column.scss';

const Column = () => {
    return (
       <>
            <div className='column'>
                <header>Title</header>
                <ul className='task-list'>
                    <Task />
                    {/* <li className='task-item'>Second</li>
                    <li className='task-item'>Third</li>
                    <li className='task-item'>First</li>
                    <li className='task-item'>Second</li>
                    <li className='task-item'>Third</li>
                    <li className='task-item'>First</li>
                    <li className='task-item'>Second</li>
                    <li className='task-item'>Third</li>
                    <li className='task-item'>First</li>
                    <li className='task-item'>Second</li>
                    <li className='task-item'>Third</li>
                    <li className='task-item'>First</li> */}
                </ul>
                <footer>Add another card</footer>
            </div>
       </> 
    )
}

export default Column;
import React, { useState } from 'react';
import styles from '@/styles/Addtodo.module.scss';
const AddNewToDo  = () => {
    const [userInput, setUserInput] = useState('');
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null); 
    const updateInput = (value) => {
        setUserInput(value);
    };

    const handleAction = () => {
        if (userInput.trim() === '') return; 

        if (editIndex !== null) {
            const updatedList = list.map((item, index) =>
                index === editIndex ? { ...item, value: userInput } : item
            );
            setList(updatedList);
            setEditIndex(null); 
        } else {
            const newItem = {
                id: Math.random(), 
                value: userInput,
            };
            setList([...list, newItem]);
        }

        setUserInput(''); 
    };

    const deleteItem = (id) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
    };

    const startEdit = (index) => {
        setUserInput(list[index].value);
        setEditIndex(index); // Set the index of the item to be edited
    };

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.todoHeader}`}> TODO LIST</div>
            <div className={`${styles.todoHeaderContainer}`}>
                <input
                    placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
                    value={userInput}
                    onChange={(e) => updateInput(e.target.value)}
                />
                <button onClick={handleAction}>
                    {editIndex !== null ? 'Update' : 'ADD'}
                </button>
            </div>
            <div className={`${styles.todoListHeader}`}>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div key={item.id} className={`${styles.todoListHeaderContainer}`}>
                            <span>
                                {item.value}
                            </span>
                            <span>
                                <button
                                    className={`${styles.editBtn} ${styles.todoListBtns}`}
                                    onClick={() => startEdit(index)}>
                                    Edit
                                </button>
                                <button  
                                    className={`${styles.deleteBtn} ${styles.todoListBtns}`} 
                                    onClick={() => deleteItem(item.id)}>
                                    Delete
                                </button>
                            </span>
                        </div>
                    ))
                ) : (
                    <div
                    className={`${styles.noRecodrs}`}
                    >
                        No items in the list
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddNewToDo;

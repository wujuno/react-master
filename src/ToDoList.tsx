import { useState } from "react";

function ToDoList() {
    const [toDO, setToDO] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => { 
        setToDO(event.currentTarget.value)
    };
    const onSubmit = (event:React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        console.log(toDO);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDO} placeholder="Write a to do"/>
                <button></button>
            </form>
        </div>
    );
}

export default ToDoList;
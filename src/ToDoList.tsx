import {useForm} from "react-hook-form"


/* function ToDoList() {
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
} */

function ToDoList() {
    const {register, watch, handleSubmit, formState } = useForm();
    const onvalid = (data:any) => {
        console.log(data);
    }
    console.log(formState.errors);
    return (
        <div>
            <form onSubmit={handleSubmit(onvalid)}>
                <input {...register("Email", {required:true})} placeholder="Email"/>
                <input {...register("FirstName",{required:true})} placeholder="FirstName"/>
                <input {...register("LastName",{required:true})} placeholder="LastName"/>
                <input {...register("Username",{required:true, minLength:{
                    value:3,
                    message:"Your Username is too short"
                }})} placeholder="Username"/>
                <input {...register("Password",{required:"Your password is required", minLength:5})} placeholder="Password"/>
                <input {...register("Password2",{required:true, minLength:5})} placeholder="Password2"/>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
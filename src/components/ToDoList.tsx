import {useForm} from "react-hook-form"
import { DefaultValue, errorSelector } from "recoil";


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

interface IForm {
    Email: string;
    FirstName: string;
    LastName: string;
    Username: string;
    Password: string;
    Password2: string;
    extraError?: string,
}


function ToDoList() {
    const {register, handleSubmit, formState:{errors}, setError } = useForm<IForm>({defaultValues:{Email:"@naver.com"}});
    const onvalid = (data:IForm) => {
        if(data.Password !== data.Password2){
           return setError("Password", {message: "Password are not the same"},{shouldFocus:true});
        }
        setError("extraError", {message: "Server offline."});
    }
    return (
        <div>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onvalid)}>
                <input {...register("Email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        message: "Only naver.com emails allowed"
                    }
                })} placeholder="Email"/>
                <p>{errors?.Email?.message}</p>
                <input {...register("FirstName",{
                    required:"write here", 
                    validate: {
                        nico:(value) => value.includes("nico") ? "no nico allowed" : true,
                        nick:(value) => value.includes("nick") ? "no nick allowed" : true,
                    }
                    })
                } placeholder="FirstName"/>
                <p>{errors?.FirstName?.message}</p>
                <input {...register("LastName",{required:"write here"})} placeholder="LastName"/>
                <p>{errors?.LastName?.message}</p>
                <input {...register("Username",{required:"write here", minLength:{
                    value:3,
                    message:"Your Username is too short"
                }})} placeholder="Username"/>
                <p>{errors?.Username?.message}</p>
                <input {...register("Password",{required:"Your password is required", minLength:5})} placeholder="Password"/>
                <p>{errors?.Password?.message}</p>
                <input {...register("Password2",{required:"write here", minLength:5})} placeholder="Password2"/>
                <p>{errors?.Password2?.message}</p>
                <button>Add</button>
                <p>{errors?.extraError?.message}</p>
            </form>
        </div>
    );
}

export default ToDoList;
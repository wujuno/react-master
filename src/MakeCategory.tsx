import { useForm } from "react-hook-form";
import {useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";

interface ICForm {
	newCategory: string;
}

function MakeCategory () {
    const setToDos = useSetRecoilState(toDoState);
	const {register, handleSubmit, setValue} = useForm<ICForm>();
    const onValid = ({newCategory}:ICForm) => {
		setToDos(oldToDos => {
			return {
				...oldToDos,
				[newCategory]:[]
			}
		})
		setValue("newCategory", "")
	}
    return(
        <div>
			<form onSubmit={handleSubmit(onValid)}>
				<label htmlFor="newCategory">Make your new Category</label>
				<input {...register("newCategory", {required:"Write a category"})} 
				id="newCategory" type="text" />
				<button>Add Category</button>
			</form>
		</div>
    )

}

export default MakeCategory
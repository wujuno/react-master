import  styled  from "styled-components"
import {DragDropContext, Draggable, Droppable,DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Board"

const Wrapper = styled.div`
  display: flex;
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;




function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = ({ draggableId, destination, source }: DropResult)=> {
		if (!destination) return;
		/* setToDos((oldToDos) => {
		  const toDosCopy = [...oldToDos];
		  toDosCopy.splice(source.index, 1);
		  toDosCopy.splice(destination?.index, 0, draggableId);
		  return toDosCopy;
		}); */
	};
  return (
	<DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
			{Object.keys(toDos).map(boardId => 
          		<Board toDos={toDos[boardId]} key={boardId} boardId={boardId}/>
			)}
		  </Boards>
		</Wrapper>
	  </DragDropContext>
	);
  }

export default App;

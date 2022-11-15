import  styled  from "styled-components"
import {DragDropContext, Draggable, Droppable,DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Board"

const Wrapper = styled.div`
  display: flex;
  max-width: 780px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;




function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = (info: DropResult)=> {
		console.log(info);
		const { destination, draggableId, source } = info;
		if(!destination) return;
		if (destination?.droppableId === source.droppableId) {
		  setToDos((allBoards) => {
			const boardCopy = [...allBoards[source.droppableId]];
			boardCopy.splice(source.index, 1);
			boardCopy.splice(destination?.index, 0, draggableId);
			return {
			  ...allBoards,
			  [source.droppableId]: boardCopy,
			};
		  });
		}
		if(destination.droppableId !== source.droppableId){
			setToDos(allBoards => {
				const boardCopySource = [...allBoards[source.droppableId]];
				const boardCopyDestination = [...allBoards[destination.droppableId]];
				boardCopySource.splice(source.index, 1);
				boardCopyDestination.splice(destination.index,0,draggableId);
				return {
					...allBoards,
					[destination.droppableId]:boardCopyDestination,
					[source.droppableId]:boardCopySource
				}

			})
		}
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

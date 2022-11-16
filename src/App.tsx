import  styled  from "styled-components"
import {DragDropContext, DropResult, Droppable} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Board"

import MakeCategory from "./MakeCategory";

const Wrapper = styled.div`
  display: flex;
  max-width: 780px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
  	align-items: center;
	heigth:100vh;

`;
const TrashCan = styled.span<{isDraggingFromThis:Boolean}>`
	font-size:50px;
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
			const taskObj = boardCopy[source.index];
			boardCopy.splice(source.index, 1);
			boardCopy.splice(destination?.index, 0, taskObj);
			return {
			  ...allBoards,
			  [source.droppableId]: boardCopy,
			};
		  });
		}
		if(destination.droppableId !== source.droppableId){
			setToDos(allBoards => {
				const boardCopySource = [...allBoards[source.droppableId]];
				const taskObj = boardCopySource[source.index];
				const boardCopyDestination = [...allBoards[destination.droppableId]];
				boardCopySource.splice(source.index, 1);
				boardCopyDestination.splice(destination.index,0,taskObj);
				return {
					...allBoards,
					[destination.droppableId]:boardCopyDestination,
					[source.droppableId]:boardCopySource
				}

			})
		}
		if(destination?.droppableId === "delete"){
			setToDos(allBoards => {
				const boardCopy = [...allBoards[source.droppableId]];
				boardCopy.splice(source.index, 1)
				return {
					...allBoards,
					[source.droppableId]: boardCopy
				}
			})
		}
	};
  return (
	<Container>
		<MakeCategory></MakeCategory>
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map(boardId => 
						<Board toDos={toDos[boardId]} key={boardId} boardId={boardId}/>
					)}
				</Boards>
			</Wrapper>
			<div>
				<Droppable droppableId="delete" >
					{(magic, info) => (
						<TrashCan
						isDraggingFromThis={Boolean(info.draggingFromThisWith)} 
						ref={magic.innerRef} 
						{...magic.droppableProps}>🗑
						{magic.placeholder}
						</TrashCan>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	</Container>
	);
  }

export default App;

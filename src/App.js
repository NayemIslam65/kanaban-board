import React, {useEffect, useState} from "react";

import Board from "./Components/Board/Board";

import "./App.css";
import Editable from "./Components/Editabled/Editable";

const getData = () => {
    const _data = localStorage.getItem('kanban-board-data')
    if (_data) return JSON.parse(_data)
    else return [
        {
            id: 0,
            title: "To Do",
            cards: [{
                id: 1,
                title: 'The Project is Pending',
                labels: [],
                date: "",
                tasks: [],
            }]
        },
        {
            id: 1,
            title: "In Progress",
            cards: [{
                id: 4,
                title: 'The Project is Ongoing',
                labels: [],
                date: "",
                tasks: [],
            }]
        },
        {
            id: 3,
            title: "Done",
            cards: [{
                id: 8,
                title: 'The Project is Completed',
                labels: [],
                date: "",
                tasks: [],
            }]
        }]
}

const App = () => {
    const [boards, setBoards] = useState(getData());

    useEffect(() => {
        localStorage.setItem('kanban-board-data', JSON.stringify(boards))
    }, [boards])

    const [targetCard, setTargetCard] = useState({
        bid: "",
        cid: "",
    });

    /*const addboardHandler = (name) => {
        const tempBoards = [...boards];
        tempBoards.push([
            {
                id: 0,
                title: "To DO",
                cards: [],
            },
            {
                id: 1,
                title: "Ongoing",
                cards: [],
            },
            {
                id: 3,
                title: "Completed",
                cards: [],
            }]);
        setBoards(tempBoards);
    };*/

    const removeBoard = (id) => {
        const index = boards.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempBoards = [...boards];
        tempBoards.splice(index, 1);
        setBoards(tempBoards);
    };

    const addCardHandler = (id, title) => {
        const index = boards.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempBoards = [...boards];
        tempBoards[index].cards.push({
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            date: "",
            tasks: [],
        });
        setBoards(tempBoards);
    };

    const removeCard = (bid, cid) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        cards.splice(cardIndex, 1);
        setBoards(tempBoards);
    };

    console.log('target', targetCard)

    const dragEnded = (bid, cid) => {
        console.log(bid, cid, targetCard)
        let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
        s_boardIndex = boards.findIndex((item) => item.id === bid);
        if (s_boardIndex < 0) return;

        s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
            (item) => item.id === cid
        );
        if (s_cardIndex < 0) return;

        t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
        if (t_boardIndex < 0) return;

        t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
            (item) => item.id === targetCard.cid
        );
        // console.log('target', targetCard, t_cardIndex)
        if (t_cardIndex < 0) t_cardIndex = boards[t_boardIndex]?.cards.length;

        const tempBoards = [...boards];
        const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
        tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
        tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
        setBoards(tempBoards);

        setTargetCard({
            bid: "",
            cid: "",
        });
    };

    const dragEntered = (bid, cid) => {
        console.log('entered', bid, cid, targetCard)
        // if (targetCard.cid === cid) return;
        setTargetCard({
            bid,
            cid,
        });
    };

    const updateCard = (bid, cid, card) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].cards[cardIndex] = card;

        setBoards(tempBoards);
    };

    useEffect(() => {
        localStorage.setItem("prac-kanban", JSON.stringify(boards));
    }, [boards]);

    return (
        <div className="kanban_project">
            <div className="header">
                <h1>Kanban Board</h1>
            </div>
            <Editable
                placeholder="Enter Card Title"
                displayClass="board_add-card"
                buttonText="Add Card"
                editClass="board_add-card_edit"
                onSubmit={(value) => addCardHandler(0, value)}
            />
            <div className="app_boards_container">
                <div className="app_boards">
                    {boards.map((item) => (
                        <Board
                            key={item.id}
                            board={item}
                            addCard={addCardHandler}
                            removeBoard={() => removeBoard(item.id)}
                            removeCard={removeCard}
                            dragEnded={dragEnded}
                            dragEntered={dragEntered}
                            updateCard={updateCard}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default App;
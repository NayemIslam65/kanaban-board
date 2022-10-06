import React, {useState} from "react";
import Card from "../Card/Card";
import "./Board.css";

const Board = (props) => {
    return (
        <div className="board">
            <div className="board_header">
                <p className="board_header_title">
                    {props.board?.title}
                    <span>{props.board?.cards?.length || 0}</span>
                </p>
            </div>
            <div className="board_cards custom-scroll"
                 onDragEnter={() => {
                     props.dragEntered(props.board.id, -1)
                 }}>
                {props.board?.cards?.map((item) => (
                    <Card
                        key={item.id}
                        card={item}
                        boardId={props.board.id}
                        removeCard={props.removeCard}
                        dragEntered={props.dragEntered}
                        dragEnded={props.dragEnded}
                        updateCard={props.updateCard}
                    />
                ))}

            </div>
        </div>
    );
}

export default Board;
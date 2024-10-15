import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/Circle.png';
import cross_icon from '../Assets/Cross.png';

let data = ['', '', '', '', '', '', '', '', ''];

const TicTacToe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [title, setTitle] = useState('Tic Tac Toe Game');
    let [isTwoPlayer, setIsTwoPlayer] = useState(true); // Toggle for game mode
    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const toggle = (e, num) => {
        if (lock || data[num]) return; // Prevent move if locked or box is already filled

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}'>`;
            data[num] = 'x';
        } else {
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            data[num] = 'o';
        }
        setCount(prevCount => prevCount + 1);
        
        if (!checkWin()) { // Only allow PC to move if there's no winner
            if (!isTwoPlayer && count % 2 === 0 && !lock) {
                pcMove(); // Trigger PC's move if single-player mode and PC's turn
            }
        }
    };

    const pcMove = () => {
        let availableBoxes = data.map((val, idx) => val === '' ? idx : null).filter(idx => idx !== null);
        let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];

        setTimeout(() => {
            if (randomBox !== undefined && !lock) { // Ensure game is not locked before PC move
                box_array[randomBox].current.innerHTML = `<img src='${circle_icon}'>`;
                data[randomBox] = 'o';
                setCount(prevCount => prevCount + 1);
                checkWin(); // Check if the PC wins after its move
            }
        }, 500); // Add a delay for more natural gameplay
    };

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return true; // Return true if someone wins, locking the game
            }
        }

        if (checkDraw()) {
            setLock(true);
            titleRef.current.innerHTML = `It's a draw!`;
            return true; // Return true on draw
        }

        return false; // Return false if no winner or draw
    };

    const checkDraw = () => {
        return count === 8; // All boxes filled and no winner
    };

    const won = (winner) => {
        setLock(true); // Lock the game once someone wins
        if (winner === 'x') {
            titleRef.current.innerHTML = `Congratulations!<br/><img src=${cross_icon}/> Wins`;
        } else {
            titleRef.current.innerHTML = `Congratulations!<br/><img src=${circle_icon}/> Wins`;
        }
    };

    const reset = () => {
        setLock(false);
        data = ['', '', '', '', '', '', '', '', ''];
        titleRef.current.innerHTML = 'Tic Tac Toe Game';
        box_array.map((e) => {
            e.current.innerHTML = '';
        });
        setCount(0);
    };

    const toggleMode = () => {
        setIsTwoPlayer(!isTwoPlayer);
        reset(); 
    };

    return (
        <div className='container'>
            <h2 className="title" ref={titleRef}>
                Tic Tac Toe Game
            </h2>
           <div className="button-container">
            <button className="mode-toggle" onClick={toggleMode}>
                {isTwoPlayer ? 'Switch to Single Player (PC)' : 'Switch to Two Players'}
            </button>  
            <button className="reset" onClick={() => { reset() }}>
                Reset the game
            </button>
        </div>
            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;

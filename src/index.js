/**
 * Created by 44047535 on 2017/6/28.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Tips extends React.Component {
    render() {
        return (
            <p className="tips">提示: 先连成线的获胜</p>
        )
    }
}



class Square_back extends React.Component {

    /**
     * - step 2 :
     *
     *   add state for component
     * */
    // constructor() {
    //     super()
    //     this.state= {
    //         value : null
    //     }
    // }

    /**
     * - step 4 :
     *
     *   state is unuseful
     * */

    render() {
        return (

            /** element function **/
            // React.createElement(
            //     'button',
            //     {className : 'square'}
            // )

            /**
             * - step 1 :
             *
             *   every square add click event
             * */
            // <button className="square" onClick={ () => alert(this.props.value)}>
            //     {this.props.value}
            // </button>

            /**
             * - step 3 :
             *
             *   use state replace props , you will see component rendered
             * */
            // <button className="square" onClick={ () => this.setState({value : 'X'})}>
            //     {this.state.value}
            // </button>

            /**
             * - step 4 :
             *
             *
             * */
            <button  className="square" onClick={ () => this.props.onClick()}>
                {this.props.value}
            </button>

        )
    }
}


/**
 * - step 5 :
 *
 *   use functional component
 * */

let Square = (props) => {return (
    <button className="square" onClick={ () => props.onClick()}>
        {props.value}
    </button>
)}



class Board_back extends React.Component {

    /**
     * - step 4 :
     *
     *   lifting state up : When you want to aggregate data from multiple children or to have two
     *   child components communicate with each other,move the state upwards so that it lives in
     *   the parent component
     * */

    constructor() {
        super()
        this.state = {
            squares : new Array(9).fill(null),
            XisNext : true
        }
    }

    handleOnclick(i) {
        const squares = this.state.squares.slice()
        if (calculateWinner(squares) || squares[i]){ return }
        squares[i] = this.state.XisNext ? 'X' : 'O'
        this.setState({squares: squares,XisNext: !this.state.XisNext})
    }

    renderSquare(i) {

        /**
         * - step 1 :
         *
         *   transfer value with props
         * */
        // return (
        //     <Square value={i}/>
        // )

        /**
         * - step 5 :
         *
         *   pass two props down from Board to Square
         * */
        return (
            <Square
                value = {this.state.squares[i]}
                onClick = {() => this.handleOnclick(i)}
            />
        )
    }

    render() {
        const winner = calculateWinner(this.state.squares)
        let status
        if (winner) {
            status = 'Winner is ' + winner
        } else {
            status = 'Next player: ' + (this.state.XisNext ? 'X' : 'O')
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <Tips />
            </div>
        )
    }
}


class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value = {this.props.squares[i]}
                onClick = {() => this.props.onClick(i)}
            />
        )
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <Tips />
            </div>
        )
    }
}


class Game extends React.Component {

    constructor() {
        super()
        this.state = {
            history : [{squares: new Array(9).fill(null)}],
            XisNext : true,
            stepNum : 0
        }
    }

    handleOnclick(i) {
        const history = this.state.history.slice(0, this.state.stepNum + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice(0)
        if (calculateWinner(squares) || squares[i]){ return }
        squares[i] = this.state.XisNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{squares : squares}]),
            XisNext: !this.state.XisNext,
            stepNum: history.length
        })
    }

    goToStep(move) {
        this.setState({
            stepNum : move,
            XisNext : (move%2) ? false : true
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNum]
        const winner = calculateWinner(current.squares)
        let status
        if (winner) {
            status = 'Winner is ' + winner
        } else {
            status = 'Next player: ' + (this.state.XisNext ? 'X' : 'O')
        }

        const steps = history.map( (step, move) => {
            const desc = move ? 'Move #' + move : 'Game start'
            return (
                <li key={move}>
                    <a onClick={ () => this.goToStep(move)} href="#">{desc}</a>
                </li>
            )
        } )

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={(i) => {this.handleOnclick(i)}}
                        squares={current.squares}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{steps}</ol>
                </div>
            </div>
        )
    }
}


/**
 *  - step 6 :
 *
 *  declaring winner
 * */
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)

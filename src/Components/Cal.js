import React, { Component } from 'react'

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
const ops = ['/', '*', '-', '+', '=']

export class Cal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentNumber: '0',
            prevNumber: undefined,
            operation: undefined
        }
    }
    handleClick = e =>{
        const {currentNumber, prevNumber, operation} = this.state
        const {innerText} = e.target
        if(!Number.isNaN(Number(innerText))){
            if(currentNumber === '0') {
                this.setState({
                    currentNumber: innerText
                })
            } else {
                this.setState({
                    currentNumber: currentNumber + innerText
                })
            }
            return;
        }
        switch(innerText){
            case 'AC': {
                this.setState({
                    currentNumber: '0',
                    prevNumber: undefined,
                    operation: undefined,
                })
                break;
            }
            case '.': {
                if(!currentNumber.includes('.')) {
                    this.setState({
                        currentNumber: currentNumber + innerText
                    })
                }
                break;
            }
            default: {
                if(!operation){
                    this.setState({
                        operation: innerText,
                        prevNumber: currentNumber,
                        currentNumber: '0',
                    })
                } else if(innerText === '=') {
                    const evalued = eval(`${prevNumber} ${operation} ${currentNumber}`)
                    this.setState({
                        operation: undefined,
                        prevNumber: evalued,
                        currentNumber: evalued
                    })
                } else {
                    this.setState({
                        operation: innerText,
                    })
                }
            }
        }
    }
    render() {
        const {currentNumber, prevNumber, operation} = this.state
        return (
            <div className='calculator'>
                <div id='display' className='display'>
                    <small>{prevNumber} {operation}</small>
                    {currentNumber}
                </div>
                <div className='nums-container'>
                    <button className='light-grey ac big-h' onClick={this.handleClick}>AC</button>
                    {nums.map((num, index)=> (
                        <button onClick={this.handleClick} className={`dark-grey ${num === 0 && 'big-h'}`} key={index}>{num}</button>
                    ))}
                    <button onClick={this.handleClick} className='light-grey'>.</button>
                </div>
                <div className='ops-container'>
                    {ops.map((op, index) => (
                        <button onClick={this.handleClick} className='orange' key={index}>{op}</button>
                    ))}
                </div>
            </div>
        )
    }
}

export default Cal

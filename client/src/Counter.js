import React from 'react';
import {connect} from 'react-redux';
import { incrementAction, decrementAction, stepAction } from './actions/actionCreator';

const Counter = (props) => {
    console.log(props);

    return (
        <>
            <h1>{props.counter}</h1>
            <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button>
            <input type='number' onChange={(e) => props.stepChange(Number(e.target.value))} value={props.step} />
        </>
    );
}

const mapStateToProps = (state) => {
    return state;
}

// const mapDispatchToProps = (dispatch) => { // функціональний вигляд
//     return {
//         increment: () => dispatch(createActionIncrement()),
//         decrement: () => dispatch(createActionDecrement())
//     }
// }

const mapDispatchToProps = { // об'єктний вигляд
    increment: incrementAction,
    decrement: decrementAction,
    stepChange: stepAction
}

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default WrappedCounter;
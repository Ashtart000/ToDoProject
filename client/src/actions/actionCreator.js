import ACTION_TYPES from './actionTypes';

export const incrementAction = () => {
    return ({
        type: ACTION_TYPES.INCREMENT
    });
};

export const decrementAction = () => {
    return ({
        type: ACTION_TYPES.DECREMENT
    });
};

export const stepAction = (stepValue) => {
    return ({
        type: ACTION_TYPES.STEP,
        payload: stepValue
    })
}
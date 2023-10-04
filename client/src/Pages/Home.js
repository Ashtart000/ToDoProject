import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';

const Home = (props) => {
    const [state, setState] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const buttonHandler = () => {
        setState(state => !state);
    }

    useEffect(() => {
        if(data) {
            registerUser(data)
            .then(result => {
                props.sendUser(result);
                navigate('/tasks');
            })
            .catch(err => {
                setError(err);
            })
        }
    }, [data])

    const getData = (userData) => {
        setData(userData);
    }

    const textButton = state ? 'SignIn' : 'SignUp';

    return (
        <>
            <header><button onClick={buttonHandler}>{textButton}</button></header>
            <main>{state ? <SignUp sendData={getData} /> : <SignIn sendData={getData} /> }</main>
            {error && <div>{error}</div>}
        </>
    );
}

export default Home;
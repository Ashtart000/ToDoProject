import CONSTANTS from "../constants";
import history from '../BrowserHistory';

export const refreshSession = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken)
        const res = await fetch(`${CONSTANTS.API_BASE}/users/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({refreshToken})
    });

    console.log(res)

    if(res.status === 401) {
        return history.replace('/');
    }

    const { tokens } = await res.json();
    console.log(tokens);
    // new tokens pair -> localStorage
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    return;

    } catch (error) {
        console.error("Помилка при виклику refreshSession():", error);
    }

}

export const registerUser = async (data) => {
    const response = await fetch(`${CONSTANTS.API_BASE}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if(response.status === 400) {
        const res = await response.json();
        return Promise.reject(res.err);
    }

    return response.json();
}

export const loginUser = async (userInput) => {
    const res = await fetch(`${CONSTANTS.API_BASE}/users/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    })
    if(res.status === 400) {
        const error = await res.json();
        return Promise.reject(error);
    }

    const { data, tokens } = await res.json(); // { data: {}, tokens: {} }
    // tokens -> localStorage
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    return data;
}

export const getTasks = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`${CONSTANTS.API_BASE}/tasks/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    if(response.status === 400) {
        const error = await response.json();
        return Promise.reject(error);
    }
    if(response.status === 403) {
        await refreshSession();
        return await getTasks();
    }

    return response.json();
}

export const createTask = async (data) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${CONSTANTS.API_BASE}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
    if(response.status === 400) {
        const res = await response.json();
        return Promise.reject(res.err);
    }

    if(response.status === 403) {
        await refreshSession();
        return await createTask(data);
    }

    return response.json();
}

export const deleteTask = async (taskId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`${CONSTANTS.API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    if(response.status === 400) {
        const error = await response.json();
        return Promise.reject(error);
    }

    if(response.status === 403) {
        await refreshSession();
        return await deleteTask(taskId);
    }

    return response.json();
}

export const authUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
        const res = await fetch(`${CONSTANTS.API_BASE}/users/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    
        if(res.status === 403) {
            await refreshSession();
            return await authUser();
        } else {
            return res.json();
        }    
    } 
    else {
        history.replace('/');
    }    
}
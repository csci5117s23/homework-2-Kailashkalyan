//reference to the demo example by Professor
const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


export async function getToDoList(authToken, userId) {
    const result = await fetch(`${backend_base}/todos?userId=${userId}&completed=false`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function addToDo(authToken, toDo) {
    const result = await fetch(`${backend_base}/todos`,{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(toDo)
    })
    return result;
}

export async function addDone(authToken, toDo) {
    const result = await fetch(`${backend_base}/done`, {
        'method': 'PUT',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(toDo)
    })
    return result;
}

export async function getDone(authToken, userId) {
    const result = await fetch(`${backend_base}/todos?userId=${userId}&completed=true`,{
            'method':'GET',
            'headers': {'Authorization': 'Bearer ' + authToken}
        })
        return await result.json();
}

export async function deleteToDo(authToken, userId, toDoId) {
    const result = await fetch(`${backend_base}/todos?userId=${userId}&_id=${toDoId}`,{
        'method':'DELETE',
        'headers': {'Authorization': 'Bearer ' + authToken},
    })
    return await result.json();
}

export async function getReviews(authToken) {
    const result = await fetch(backend_base+"/pres",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getToDoItem(authToken,userId,toDoId) {
    const result = await fetch(`${backend_base}/todos?userId=${userId}&_id=${toDoId}`,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function updateToDo(authToken,userId,toDoId,text) {
    let temp = (await getToDoItem(authToken,userId,toDoId))[0];
    console.log(temp)
    temp.text = text;
    // console.log("taskData.taskDescription: " + taskData.taskDescription);
    const result = fetch(`${backend_base}/updateToDoList?userId=${userId}&_id=${toDoId}`, {
        'method': 'PUT',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(temp)
        });
    return result;
}

export async function updateToDone(authToken,userId,toDoId) {
    let temp = (await getToDoItem(authToken,userId,toDoId))[0];
    temp.completed = true;
    // console.log("taskData.taskDescription: " + taskData.taskDescription);
    const result = fetch(`${backend_base}/updateToDoList?userId=${userId}&_id=${toDoId}`, {
        'method': 'PUT',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(temp)
        });
    console.log(result)
    return await result;
}
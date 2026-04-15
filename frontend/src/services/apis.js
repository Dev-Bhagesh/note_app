export const noteCreate = async (title, content) => {

    const token = localStorage.getItem('token')
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/create`, {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
            title,content
        })
    })
    if(response.status===401){
        localStorage.removeItem('token');
        window.location.href='/';
        return;
    }
    return await response.json();
}

export const deleteNote = async (id) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/delete/${id}`, {
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return await response.json();
}

export const updateNote = async (id, title, content) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/update/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    })
    return await response.json()
}

export const getNotes = async ()=>{
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/getnotes`,{
        method:'GET',
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    if(response.status===401) {
        localStorage.clear()
        window.location.href = '/'  // ✅ redirect to login, not return a string
        return;
    }
    return await response.json();

}

export const RegisterFunction = async (username, email, password) => {
    // console.log(`${process.env.NEXT_PUBLIC_API_URL}`)
    // console.log(username, email, password)
    // console.log("data recived and preparing to send post request")
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
                email: email,
                pass: password
            }),
        });
        // console.log("request done data printing on console")
        const data = await response.json();
        // console.log("success", data)
        return {...data, status: response.status}
    } catch (error) {
        console.log(error)
    }
}

export const LoginFunction = async (email, password) => {
    try {
        // console.log(email, password, "successfully recived and preparing to send post request")
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                email:email,
                pass:password
            }),
        })
        // console.log("data sent successfully for login")
        const data = await response.json();
        // console.log("success", data)
        return data
    } catch (error) {
        console.log(error)
    }
}
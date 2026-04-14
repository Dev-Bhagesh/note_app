export const noteCreate = async (title, content) => {
    console.log('Note recived')
    console.log(title, content)

    let a = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/create`, {})
    return a
}

export const RegisterFunction = async (username, email, password) => {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}`)
    console.log(username, email, password)
    console.log("data recived and preparing to send post request")
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
        console.log("request done data printing on console")
        const data = await response.json();
        console.log("success", data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const LoginFunction = async (email, password) => {
    try {
        console.log(email, password, "successfully recived and preparing to send post request")
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
        console.log("data sent successfully for login")
        const data = await response.json();
        console.log("success", data)
        return data
    } catch (error) {
        console.log(error)
    }
}
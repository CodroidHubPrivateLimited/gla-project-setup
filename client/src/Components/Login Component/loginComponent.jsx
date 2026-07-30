import React, { useState } from "react"
import axios from "axios"
function LoginComponent(){
    const [user,setUser]=useState({
        email:"",
        password:""
    })

    function handleChange(e){
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }


    async function handleSubmit(e,res,req){
        e.preventDefault()

        try {

           const response= await axios.post("http://localhost:4000/api/loginRoute/api",user)
        
            alert(response.data.message)
            console.log(response.data.token)

            const token= response.data.token
            console.log("got token:", token)


            localStorage.setItem(
                "Token",
                token
            )

            
        } catch (error) {
            console.log(error.message)
            console.log(error)

        }
    }

    return(
        <>
        <section>
            <h1>Login </h1>

            <form onSubmit={handleSubmit}>
                <input placeholder="Enter Your Email" type="text" name="email" value={user.email} onChange={handleChange}/>
                <br />
                <input placeholder="Enter Your Password" type="text" name="password" value={user.password} onChange={handleChange}/>
                <br />
                <button type="submit">Login</button>
            </form>
        </section>
        </>
    )
}
export default LoginComponent
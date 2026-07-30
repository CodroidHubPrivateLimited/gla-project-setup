import React, { useEffect, useState } from 'react'
import styles from './registrationPage.module.css'
import Register from '../../Components/Registration Component/registrationFormComponent'
import UserRegisterdCard from '../../Components/Registration Component/user Registered Card/registerCard'
import axios from 'axios'
import UpdateRegisterCard from '../../Components/Registration Component/UseUpdationModal/editModal'
function RegistrationPage() {
 const[showModal,setShowModal]=useState(false)
 const[selectedUser,setSelectedUser]=useState(null)
//  console.log("Parent Component Selected User: ",selectedUser)


  const [userData, setUserData]=useState([])
  // console.log(userData)
 async function fetchRegisteredUser(){
    try {
      const response= await axios.get("http://localhost:4000/api/getData")
      
      setUserData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }



  async function handleDelete(id){
    try {
      const response= await axios.delete(`http://localhost:4000/api/user/delete/${id}`)
      alert("Your Data has been Deleted : ", response)
      console.log(response)
    // fetchRegisteredUser()



    } catch (error) {
      console.log(error.message)
    }
  }

  function handleEdit(user){
    setSelectedUser(user)
    setShowModal(true)
  }
  
  function handleClose(){
     setShowModal(false)
  }

  
    useEffect(()=>{
    fetchRegisteredUser()
  },[])
  return (
    <>
    <Register />  
    <br /> 
    <hr />   
    <br />

    <div className={styles.cardContainer}>
      {userData.map((user)=>(
           <div key={user._id} >
          <UserRegisterdCard id={user._id} OnDelete={handleDelete}name={user.name} email={user.email} onEdit={()=>handleEdit(user)} />
        </div>
      ))}
    </div>
        <div>

          {showModal &&(
            
            <UpdateRegisterCard user={selectedUser} onClose={handleClose} id={selectedUser} />
          )
          }

        </div>


    </>
  )
}

export default RegistrationPage
 
import  { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {useMutation} from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutation'
import { GET_CLIENTS } from '../queries/clientQuery'
const Modal = ({setShowModal}) => {
    const [formData,setFormData]= useState({name:"",email:"",phone:""})
    const {name,email,phone}  = formData
    const [addClient]=useMutation(ADD_CLIENT,{
        variables:{name,email,phone},
        update(cache,{data:{addClient}}){
            const {clients} = cache.readQuery({
                query:GET_CLIENTS,
            });
            cache.writeQuery({
                query:GET_CLIENTS,
                data:{clients:{...clients,addClient}}
            })
        }
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData)
        if(name==="" || email===""||phone===""){
            return alert('please fill in all fields')
        }
        addClient(name,email,phone)
        setFormData({name:"",email:"",phone:""})
        setShowModal(false)
    }
  return (
    <div className='w-screen h-screen flex justify-center items-center  bg-black bg-opacity-60 fixed top-0 left-0'>
        <div>
            <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col bg-blue-400 px-20 py-20 rounded-lg relative">
                <AiOutlineClose className='absolute top-4 right-4 text-3xl cursor-pointer text-white hover:text-slate-700 hover:transition-opacity hover:duration-300' onClick={()=>setShowModal(false)}/>
                <h2 className='text-2xl font-semibold pb-8 text-white  '>Add new clients </h2>
                <input type="text" placeholder='Name' value={name} onChange={(e)=>setFormData({...formData,name:e.target.value})}  className="px-3 py-2 rounded-lg my-2 w-96 outline-0"/>
                <input type="email" placeholder='Email' value={email} onChange={(e)=>setFormData({...formData,email:e.target.value})} className="px-3 py-2 rounded-lg my-2 w-96 outline-0"/>
                <input type="text" placeholder='Phone' value={phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} className="px-3 py-2 rounded-lg my-2 w-96 outline-0"/>
                <button type='submit' className='border-white border-2 mt-4 hover:border-slate-600 hover:duration-300 rounded-lg px-40 text-white py-1 text-xl font-semibold '>Sumbit</button>
            </form>
        </div>
    </div>
  )
}

export default Modal
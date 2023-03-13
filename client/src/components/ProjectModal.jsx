import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { GET_CLIENTS } from '../queries/clientQuery'
import { ADD_PROJECT } from '../mutations/projectMutation'
import { GET_PROJECTS } from '../queries/projectQuery'
const ProjectModal = ({setShowModalProject}) => {
    const [formData,setFormData]=useState({
        name:"",
        description:"",
        status:"new",
        clientId:""
    })
    const {name,description,status,clientId} = formData;
    const [addProject]=useMutation(ADD_PROJECT,{
        variables:{name,description,status,clientId},
        update(cache,{data:{addProject}}){
            const {projects} = cache.readQuery({query:GET_PROJECTS})
            cache.writeQuery({query:GET_PROJECTS,data:{projects:[...projects,addProject]}})
        }
    })
    
    const handleSubmit = (e)=>{
       e.preventDefault()

      addProject(name,description,status,clientId)
       setFormData({
        name:"",
        description:"",
        status:"new",
        clientId:""

       })

       setShowModalProject(false)
    }
  
    const {loading,error,data}= useQuery(GET_CLIENTS)
    if(loading) return null
    if(error) return <p>some thing went wrong</p>
    console.log(formData)
  return (
    <>

    {
        !loading && !error && (


    
    <div className='w-screen h-screen flex justify-center items-center  bg-black bg-opacity-60 fixed top-0 left-0' >

        <form className='flex space-y-3  items-start justify-center flex-col  bg-blue-400 rounded-lg p-20 w-[550px] relative' onSubmit={handleSubmit}>
            <AiOutlineClose className='top-4 right-4 absolute text-2xl text-white cursor-pointer' onClick={()=>setShowModalProject(false)}/>
            <h2 className='text-2xl font-semibold text-white mb-2 self-center '>Add Project</h2>
            <input type="text" placeholder='Name' className='px-2 py-2   w-full text-[14px] font-semibold text-gray-700  outline-none rounded-lg' onChange={(e)=>setFormData({...formData,name:e.target.value})} value={name}/>
            <input type="text" placeholder='description' className='px-2 py-2 w-full text-[14px] font-semibold text-gray-700  outline-none rounded-lg' onChange={(e)=>setFormData({...formData,description:e.target.value})} value={description}/>
            <select name="" id="status" className='w-full py-2  px-2 text-[14px] font-semibold text-gray-600  outline-none selection:bg-blue-300 selection:text-black rounded-lg' onChange={(e)=>setFormData({...formData,status:e.target.value})} value={status}>
                <option value="new" className='bg-blue-600 text-white font-semibold ' >Not Started</option>
                <option value="progress" className='bg-blue-600 text-white font-semibold'>Progress</option>
                
                <option value="completed" className='bg-blue-600 text-white font-semibold'>Completed</option>
            </select>
            <select id="clientId" className='w-full py-2 px-2 text-[14px] font-semibold text-gray-600 outline-none rounded-lg' value={clientId}  onChange={(e)=>setFormData({...formData,clientId:e.target.value})}>
                <option value="">Select</option>
               {
                data.clients.map((client)=>(

                     <option value={client.id} key={client.id}>{client.name}</option>
                ))
               }
            </select>
            <button className='px-3 font-semibold self-center py-1 bg-white rounded-lg text-blue-600' type='submit'>Submit</button>
        </form>
    </div>
            )
    }
    </>
  )
}

export default ProjectModal
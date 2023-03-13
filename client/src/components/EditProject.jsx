import { useMutation } from "@apollo/client"
import { useState } from "react"
import { UPDATE_PROJECT } from "../mutations/projectMutation"
import { GET_PROJECT } from "../queries/projectQuery"
const EditProject = ({project}) => {

    const [name,setName]=useState(project.name)
    const [description,setDescription]=useState(project.description)
    const [status,setStatus]=useState('')
    // if(project.status === 'Not Started'){
    //     setStatus('new')
    // }else if(project.status === 'In Progress'){
    //     setStatus('progress')
    // }else if (project.status === 'Completed'){
    //     setStatus('completed')
    // }
    const [updateProject]=useMutation(UPDATE_PROJECT,{
        variables:{id:project.id,name,description,status},
        refetchQueries:[{query:GET_PROJECT}]
    })
    const handleSubmit = (e)=>{
     e.preventDefault()
     if(name==="" || description==="" || status===""){
        return alert("Please fill in all forms")
     }
      updateProject(name,description,status)
    }
    console.log(name,description,status)
  return (
    <div className="flex flex-col p-4 ">
        <h1 className="text-2xl font-semibold my-2 overflow-y-hidden">Update Project details</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>

        <input type="text" placeholder="Name" className="outline-none border-2 border-gray-400 rounded-lg px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text"  placeholder="Description" className="outline-none border-2 border-gray-400 rounded-lg px-3 py-2" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <select  id="status" className="outline-none border-2 border-gray-400 rounded-lg px-3 py-2" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="new">Not Started</option>
            <option value="progress">Progress</option>
            <option value="completed">Completed</option>
        </select>
        <button type="submit" className="self-start bg-blue-400 px-2 py-1 font-semibold text-lg text-white rounded-lg outline-none">Submit</button>
        </form>
    </div>
  )
}

export default EditProject
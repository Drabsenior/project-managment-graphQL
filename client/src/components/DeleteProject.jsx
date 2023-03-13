import { useMutation } from "@apollo/client"
import { DELETE_PROJECT } from "../mutations/projectMutation"
import { useNavigate } from "react-router-dom"
import { GET_PROJECTS } from "../queries/projectQuery"
import {BsTrash} from 'react-icons/bs'
const DeleteProject = ({projectId}) => {
    const navigate = useNavigate()
    const [deleteProject] = useMutation(DELETE_PROJECT,{
        variables:{id:projectId},
        onCompleted:()=>navigate('/'),
        refetchQueries:[{query:GET_PROJECTS}]

    })

    const handleDelete = ()=>{
      deleteProject(projectId)
    }
  return (
    <button className="self-end my-3 bg-red-600 rounded-lg text-white font-semibold px-6 py-1 flex items-center text-lg text-center" onClick={handleDelete}><BsTrash className="mr-1  text-sm "/>Delete</button>
  )
}

export default DeleteProject
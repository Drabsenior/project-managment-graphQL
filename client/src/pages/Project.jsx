import { useQuery } from "@apollo/client"
import {Link,useParams} from 'react-router-dom'
import DeleteProject from "../components/DeleteProject"
import EditProject from "../components/EditProject"
import ProjectInfo from "../components/ProjectInfo"
import Spinner from "../components/Spinner"
import { GET_PROJECT } from "../queries/projectQuery"
const Project = () => {

const {id} = useParams()
const {loading,error,data} = useQuery(GET_PROJECT,{
    variables:{id}
})
if(loading) return <Spinner/>
if(error) return <p>Something went wrong</p>

 return<div className="flex justify-center items-center flex-col">
 {
    !loading && !error && (
        
        <div className=" w-96 border-2 border-gray-200 px-8 py-4 my-6 rounded-lg lg:max-w-6xl lg:w-screen lg:py-20 flex flex-col" >
            <div className="flex justify-between">
            <div>
            <h1 className="text-3xl font-semibold pt-3 overflow-hidden">{data.project.name}</h1>
            <p className=" text-gray-600 pb-3 pt-1">{data.project.description}</p>
            <h2 className="font-bold mt-3">Project Status</h2>
            <span className="text-lg">{data.project.status}</span>
            </div>
       <Link to="/" className="bg-gray-100 text-gray-600 border-2 border-gray-200 flex items-start px-3 h-8 pt-1  justify-center rounded-sm">Back</Link>
       </div>
       <ProjectInfo project={data.project.client}/>
        <EditProject project={data.project}/>
              
        <DeleteProject projectId={data.project.id}/>
        </div>
        
    ) 
 }
 </div>
}

export default Project
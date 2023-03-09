import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQuery"
import ProjectCard from "./ProjectCard"
import Spinner from "./Spinner"


const Projects = () => {
   const {loading,error,data}= useQuery(GET_PROJECTS)

    if(loading) return <Spinner/>
    if(error) return <p>something went wrongs</p>
  return <>
    <h1 className=" my-4 text-2xl font-semibold max-w-6xl mx-auto px-4">Projects</h1>
    <div className="flex justify-center items-center flex-row">

  {
      data.projects.length > 0 ? ( data.projects.map((project)=>(
          
          <>
          <ProjectCard key={project.id} project={project}/>
          
          </>
          ))
          
          ):(
              <p>No Projects</p>
              )
            }
            </div>
  </>
}

export default Projects
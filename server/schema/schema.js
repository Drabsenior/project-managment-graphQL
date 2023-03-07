const {projects,clients} = require('../sampledata.js')

const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLList,GraphQLNonNull,
    GraphQLID,GraphQLSchema,
    GraphQLString,
    GraphQLEnumType
} =require("graphql")
const Project = require('../models/Project')
const Client = require('../models/Client')

const ClientType = new GraphQLObjectType({
    name:"Client",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
        
    })
})

const ProjectType = new GraphQLObjectType({
    name:"Project",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return Client.findById(parent.clientId)
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        projects:{
            type:GraphQLList(ProjectType),
            resolve (parent,args){
                return Project.find()
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Project.findById(args.id)
            }
        },
        clients:{
            type:GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find()
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Client.findById(args.id)
            }
        }
    }
})
//Mutation

const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        //Add client
        addClient:{
            type:ClientType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                email:{type:GraphQLNonNull(GraphQLString)},
                phone:{type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                const client = new Client({
                    name:args.name,
                    email:args.email,
                    phone:args.phone
                })
                return client.save()
            }
        },
        //delete cleint
        deleteClient:{
            type:ClientType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)}
            },
            resolve(paretn,args){
                return Client.findByIdAndDelete(args.id)
            }
        },
        //add project
        addProject:{
            type:ProjectType,
            args:{
                name:{type:GraphQLString},
                description:{type:GraphQLString},
                status:{type: new GraphQLEnumType({
                    name:"ProgressType",
                    values:{
                        new:{value:"Not Started"},
                        progress:{value:"In Progress"},
                        completed:{value:"Completed"}

                    }
                }),
                defaultValue:"Not Started"
            
            },
            clientId:{type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                const project = new Project({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    clientId:args.clientId
                })
                return project.save()
            }
        },
        //delete project
        deleteProject:{
            type:ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                return Project.findByIdAndDelete(args.id)
            }
        },
        //update project
        updateProject:{
            type:ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                name:{type:GraphQLString},
                description:{type:GraphQLString},
                status:{
                    type: new GraphQLEnumType({
                        name:"ProjectStatusUpdate",
                       values:{
                        new:{value:"Not Started"},
                        progress:{value:"In Progress"},
                        completed:{value:"Completed"}
                       }

                    })
                },
            },
                resolve(parent,args){
                    return Project.findByIdAndUpdate(args.id,
                        {
                            $set:{
                                name:args.name,
                                description:args.description,
                                status:args.status
                            }
                        },{new:true}
                        )
                }
        }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})
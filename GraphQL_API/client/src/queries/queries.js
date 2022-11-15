import {gql} from 'apollo-boost';
const getProjectsQuery = gql `{
    projects{
        id
        title
    }

  }`

const getTasksQuery = gql `{
    tasks{
        id
        title
    }

  }`

const addTaskMutation = gql `
    mutation(
        $title: String!
        $weight: Int!
        $description: String!
        $projectId: ID!){
            addTask(
                title: $title
                weight: $weight
                description: $description
                projectId: $projectId){
                    title
                    id
            }

    }`

const addProjectMutation = gql `
    mutation(
        $title: String!
        $weight: Int!
        $description: String!){
            addProject(
                title: $title
                weight: $weight
                description: $description){
                    title
                    id
            }

    }`

const getTaskDetailQuery = gql `
    query($id: ID){
        task(id: $id){
            id
            title
            weight
            description
            project {
                id
                title
                weight
                description
                tasks {
                    id
                    title
                    weight
                }
            }
        }
    }

`
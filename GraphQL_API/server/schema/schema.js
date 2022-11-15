const graphql = require('graphql');
const _ = require('lodash');
const Project = require('../models/project');
const Task = require('../models/task');


const data = [
    {
        id: '1',
        projectId: '1',
        title: 'Advanced HTML',
        weight: 1,
        description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!'
    },
    {
        id: '2',
        projectId: '1',
        title: 'Bootstrap',
        weight: 1,
        description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.'
    }

]



const TaskType = new graphql.GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: graphql.GraphQLID},
        title: { type: graphql.GraphQLString},
        weight: {type: graphql.GraphQLInt},
        description: {type: graphql.GraphQLString},
        project:{
            type: TaskType,
            resolve(parentValue){
                return Project.find({id: parentValue.projectId})
            }
        },
    }),
});

const ProjectType = new graphql.GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: graphql.GraphQLID},
        title: { type: graphql.GraphQLString},
        weight: {type: graphql.GraphQLInt},
        description: {type: graphql.GraphQLString},
        tasks:{
            type: new graphql.GraphQLList(TaskType),
            resolve(parentValue){
                return Task.find({projectId: parentValue.id})
            }
        },
    }),
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        task:{
            type: TaskType,
            args: {id:{type:graphql.GraphQLID}},
            resolve(parentValue, args){
                return Task.find({id: args.id})
            }
        },
        project:{
            type: ProjectType,
            args: {id:{type:graphql.GraphQLID}},
            resolve(parentValue, args){
                return Project.find({id: args.id})
            }
        },


        tasks:{
            type: new graphql.GraphQLList(TaskType),
            resolve(){
                return Task.find()
            }
        },
        projects:{
            type: new graphql.GraphQLList(ProjectType),
            resolve(){
                return Project.find()
            }
        },

    })

});

const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addProject:{
            type: ProjectType,
            args: {
                title:{type:graphql.GraphQLString},
                weight:{type:graphql.GraphQLInt},
                description:{type:graphql.GraphQLString}


            },
            resolve(parentValue, args){
                const project = new Project({
                    title: args.title,
                    weight: args.weight,
                    description: args.description,
                });
                project.save();
                return project;

            }
        },

        addTask:{
            type: TaskType,
            args: {
                title:{type:graphql.GraphQLString},
                weight:{type:graphql.GraphQLInt},
                description:{type:graphql.GraphQLString},
                projectId:{type: graphql.GraphQLID}

            },
            resolve(parentValue, args){
                const task = new Task({
                    title: args.title,
                    weight: args.weight,
                    description: args.description,
                    projectId: args.projectId,

                });
                task.save();
                return task;

            }
        },

    }),
});


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
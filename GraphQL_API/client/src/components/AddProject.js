import {
  useState,
  //useEffect
} from "react";
import { getProjectsQuery, addProjectMutation } from "../queries/queries";
import { flowRight as compose } from "lodash";


function AddProject(props) {

  const [inputsProject, setInputsProject] = useState({
    title: '',
    weight: 1,
    description: ''

  });

  const handleChange = (e) => {
    const newInputsProject = {
      ...inputsProject
    };
    if (e.target.name === "weight") newInputsProject[e.target.name] = parseInt(e.target.value)
    else newInputsProject[e.target.name] = e.target.value
    setInputsProject(newInputsProject)
  }

  const submitForm1 = (e) => {
    e.preventDefault();
    props.addProjectMutation( {
              variables: {
                title: inputs.title,
                weight: inputs.weight,
                description: inputs.description,
                },
                refetchQueries: [{query: getProjectsQuery}]
              });
            
  }
  return (
    <form class = "project"
    id = "add-project"
    onSubmit = {submitForm1}>
    <div className = "field" >
    <label > Project title: 
    </label>
    <input type = "text"
    name = "title"
    onChange = {
      handleChange
    }
    value = {
      inputsProject.title
    }
    />
    </div>
    <div className = "field" >
    <label > Weight: </label>
    <input type = "number"
    name = "weight"
    onChange = {
      handleChange
    }
    value = {
      inputsProject.weight
    }
    />
    </div>
    <div className = "field" >
    <label > description: </label> <
    textarea name = "description"
    onChange = {
      handleChange
    }
    value = {
      inputsProject.description
    }
    />
    </div>
    <button> + </button> </form>
  );
}

export default compose(
  graphql(getProjectsQuery, {name: 'getProjects'}),
  graphql(addTaskMutation, {name: 'addTask'}),

)(AddTask);
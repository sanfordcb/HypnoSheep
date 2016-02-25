import React from 'react';
import { link } from 'react-router';

export default ({ project, deleteProject }) => (
  <div>
    <a href={`/links/${project._id}`}>{project.name}</a>
    <button onClick={deleteProject}>delete</button>
  </div>
);



// var Project = React.createClass({
//   render() {
//     //returns a div that when clicked on will navigate to the links page for that specific project.
//     //this.props.project is passed in from ProjectList by saying project={project} where {project}
//     //refers to an individual project passed as a parameter to the map function
//     //i.e. {project} = {name: "My Project", id: 1234}
//     return (
//       <div className="project">
//         <Link to={`/links/${this.props.project._id}`}>{this.props.project.name}</Link>
//       </div>
//     );
//   }
// });
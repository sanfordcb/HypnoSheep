import ReactDOM from 'react-dom';
import React from 'react';
import request from 'superagent/lib/client';

class App extends React.Component {
  componentDidMount() {
    request
      .get('/api/projects')
      .set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NmM3ZTI0N2U2OWJiNmY4OWUxYmJkYWMiLCJleHAiOjE0NTY0Mjc2MjMzMjF9.5ZnD3XnGBvC-DJ0tLV111Y4GCOWv989XkeaVAw2oBIU')
      .end(function(err, res) {
        if (err) {
          console.log(err)
        }
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        Hello world
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

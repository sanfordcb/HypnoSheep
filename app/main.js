import ReactDOM from 'react-dom';
import React from 'react';
import request from 'superagent/lib/client';

class App extends React.Component {
  componentDidMount() {
    request
      .get('/api/projects')
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

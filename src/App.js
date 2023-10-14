import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import ListOfCelebrities from './UI/ListOfCelebrities';

function App() {
  return (
    <Router>
      <div>
        <div className="container">
          <Switch>
            <Route path="/" component={ListOfCelebrities} exact={true}/>
          </Switch>
          {/* <QuizPage /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;

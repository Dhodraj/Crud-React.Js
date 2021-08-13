import React from 'react'
import "./App.css"
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom'
import AddUser from './component/AddUser/AddUser'
import Lists from './component/Lists/Lists'
import PersonAddIcon from '@material-ui/icons/PersonAdd';


export default function App() {


  return (
  
    <Router>
      <Switch>
    <div className="container">
        
        <div className="addButton">
          <Route exact path="/" >
            <Link to="/create">
           <button className="addButton"><PersonAddIcon/></button> 
            </Link>
            </Route>
        </div>
          
        <div>
          <Route exact path="/create" component={AddUser} />
        </div>

        <div>
          <Route exact path="/" component={Lists} />
        </div>



    </div>
    </Switch>
    </Router>
    
  )
}


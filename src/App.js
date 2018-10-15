import React, {Component} from 'react';
import Chart from './components/Chart'
import Navbar from './components/Navbar'

class App extends Component {
    constructor(props){
      super(props);
    }
    
    render(){
        return (
            <div>
                <Navbar/>
                <Chart/>
            </div>
        );
    }
}

export default App;

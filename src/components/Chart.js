import React, {Component} from 'react';
import { LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import TeamButton from './Teambutton'
import moment from 'moment'

const colorArray = ["#ff0000", "#008000","#000000"]

class SimpleLineChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchKey : '',
            originalData:[],
            data:[],
            teams:[],
            importedData : null,
            searchTeam : [],
            input: "",
        };
        this.position = "Home/Neutral"
        this.searchTeam = [];
    }

    componentWillMount() {
        var csvFilePath = require("../nba.csv");
        var Papa = require("papaparse/papaparse.min.js");
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.updateData
        });  
    }

    getImportData = () =>{
        let csvString = this.state.importedData;
        var Papa = require("papaparse/papaparse.min.js");
        let parsedData = Papa.parse(csvString);
        let jsonData = [];
        jsonData = parsedData.data.map((data) => {
            return {"Date": data[0],"Visitor/Neutral": data[2], "PTS" : data[3],"Home/Neutral":data[4]}
        })
        this.updateData({data:jsonData});
    }

    setPosition = (e) => {
        let position = e.target.value;
        let newSearchTeam = [];
        if(position == 'both'){
            this.searchTeam.forEach((team) => {
                newSearchTeam.push({name: team.name,position:"Home/Neutral"});
                newSearchTeam.push({name: team.name,position:"Visitor/Neutral"});
            })
        
        } else {
            this.searchTeam.forEach((team, index) => {
                if(index === 0 || JSON.stringify(team.name) != JSON.stringify(this.searchTeam[index - 1].name)){
                    newSearchTeam.push({name: team.name, position:position});
                } 
            })
            
        }
        this.searchTeam = newSearchTeam;
        this.position = position;
        this.renderGraph(newSearchTeam);
    }

    handleChange(event) {
        this.setState({importedData: event.target.value})
    }  

    chooseTeam = (searchKey) => {
        let position = this.position;
        let searchTeam = this.searchTeam;
        if(position == 'both'){
            searchTeam.push({name: searchKey, position:"Home/Neutral"});
            searchTeam.push({name: searchKey, position:"Visitor/Neutral"});
        } else {
            searchTeam.push({name: searchKey, position:position});
        }
        this.renderGraph(searchTeam);
    }

    renderGraph = (searchTeam) => {
        let displayData = [];
        searchTeam.forEach((team) => {
            let position = team.position;
            let name = team.name;
            let dataForOneTeam = this.state.originalData.filter((a) => a[position]== name);
            displayData.push({name: name + ' as ' +position, data: dataForOneTeam})
            
        })
        this.setState({data: displayData})
    }

    removeTeam = (searchKey) => {
        this.searchTeam = this.searchTeam.filter((team) => (
            JSON.stringify(team.name) != JSON.stringify(searchKey)
        ))
        this.renderGraph(this.searchTeam);
    }

    updateData =(result) => {
        const data = result.data;
        let allTeams = new Set();
        data.forEach((a) => {
            let oneTeam = a["Home/Neutral"];
            if(!allTeams.has(oneTeam)){
                allTeams.add(oneTeam);
            }
            let time = new Date(a.Date).getTime();
            a.Date = time;
        });
        let teams = [];
        allTeams.forEach((team) => {
            teams.push({"value":team, "label": team});
        });
    
        this.setState({originalData: data, teams: teams}); 
    }

    render () {
        const {teams} = this.state;
        const {data} = this.state;
        let teamGroup = teams.map((team) => <TeamButton team = {team.value} chooseTeam = {this.chooseTeam} removeTeam = {this.removeTeam}/>);

        return (
        <div>
            <div class="jumbotron" >
                {teamGroup}
            </div>
            
            <div className = "container">
                <h4>Data comparision between different NBA teams</h4>
                <div className = "controlRadio">
                    <input type="radio" name="position" value="Home/Neutral" onChange = {this.setPosition} checked ={this.position == "Home/Neutral"}/><label for = "position">Home</label>
                    <input type="radio" name="position" value="Visitor/Neutral" onChange = {this.setPosition}/> <label for = "position">Visitor</label>
                    <input type="radio" name="position" value="both" onChange = {this.setPosition}/> <label for = "position">Both</label>
                </div>

                <LineChart width={900} height={400} 
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="Date"  domain={['dataMin', 'dataMax']} type = 'number' tickFormatter = {(unixTime) => moment(unixTime).format("MMM Do YY")} />
                    <YAxis dataKey = "PTS" domain={[60, 150]} tickCount={10}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    {/* <Tooltip content={<CustomTooltip/>}/> */}
                    <Legend />
                    {data.map((s,index) => (
                        <Line stroke={colorArray[index]} dataKey="PTS" data={s.data} name={s.name} key={s.name}/>
                    ))}
                </LineChart>
            </div>

            <div className = "jumbotron dataImporter">
                <textarea rows="10" cols="50" onBlur = {this.handleChange.bind(this)}></textarea>
                <div>
                    <button onClick = {this.getImportData}>Import Data</button>
                </div>
            </div>
        </div>
        );
    }
}

export default SimpleLineChart;
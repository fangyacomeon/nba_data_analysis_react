import React, {Component} from 'react';

export default class TeamButton extends Component{
    constructor(props){
        super(props);
        this.state = {chosen: false};
    }

    clickTeam = () => {
        if(this.state.chosen){
            this.props.removeTeam(this.props.team);
        } else {
            this.props.chooseTeam(this.props.team);
        }
        this.setState({chosen : !this.state.chosen});
    }

    render(){
        let style = null;
        if(!this.state.chosen){
            style = "btn btn-outline-dark teamButton";
        } else {
            style = "btn btn-dark teamButton"
        }
        return(
            <button type="button" className={style} onClick = {this.clickTeam}>{this.props.team}</button>
        )
    }
}
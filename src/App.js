
import './App.css';

import React, { Component, startTransition } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pagesize=72;
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        height='3'
        color='red'
        progress={this.state.progress}
        
      />
          <NavBar/>
          <Switch>
          <Route exact path="/"><News  setProgress={this.setProgress} apiKey={this.apiKey} key="general" pagesize={this.pagesize} country="in" category='general'/></Route>
          <Route exact path="/science"><News  setProgress={this.setProgress} apiKey={this.apiKey} key="science" pagesize={this.pagesize} country="in" category='science'/></Route>
          <Route exact path="/business"><News  setProgress={this.setProgress} apiKey={this.apiKey} key="business" pagesize={this.pagesize} country="in" category='business'/></Route>
          <Route exact path="/entertainment"><News  setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pagesize={this.pagesize} country="in" category='entertainment'/></Route>
          <Route exact path="/health"><News  setProgress={this.setProgress} apiKey={this.apiKey} key="health" pagesize={this.pagesize} country="in" category='health'/></Route>
          <Route exact path="/general"><News  setProgress={this.setProgress} apiKey={this.apiKey} key="general" pagesize={this.pagesize} country="in" category='general'/></Route>
          <Route exact path="/sports"><News  setProgress={this.setProgress} apiKey={this.apiKey}  key="sport" pagesize={this.pagesize} country="in" category='sports'/></Route>
          <Route exact path="/technology"><News  setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pagesize={this.pagesize} country="in" category='technology'/></Route>
          
        </Switch>
          </Router>
      </div>
    )
  }
}

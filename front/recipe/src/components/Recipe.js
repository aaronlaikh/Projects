import React, { Component } from 'react';

class Recipe extends Component {
  constructor(){
    super();
/*    this.state = {
      name: "Garlic Potatoes",
      items: [{
        name: "Potato"
      }, {
        name: "garlic"
      }]
    };*/
  }

  parseItems(){
    return (
      <ul>
      {
        this.props.value.items.map(function(object, index){
          return <li key={index}>{object.name}</li>;
        })
      }
      </ul>
    );
  }

  render() {
    /*return (
      <div className="panel panel-default">
        <div className="panel-heading" data-toggle="collapse" href="collapseBody" id="headingOne">
          <a role="button" className="panel-title" aria-expanded="true" aria-controls="collapseBody">{this.state.name}</a>
        </div>
        <div id="collapseBody" className = "panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
        <div className="panel-body">
          <ul>
            {this.parseItems()}
          </ul>
        </div>
        </div>
      </div>
    );*/
    console.log(this.props.value);
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.value.name}
        </div>
        <div className="panel-body">
          {this.parseItems()}
        </div>
      </div>
      );
      }
    }

export default Recipe;

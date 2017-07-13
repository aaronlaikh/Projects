import React, { Component } from 'react';
import Recipe from './Recipe';
import ModalConductor from './ModalConductor';

class List extends Component {
  constructor(){
    super();
    this.state = {
      items: [{
        name: "Garlic Potato",
        items: [{
          name: "garlic"
        }, {
          name: "potato"
        }]
      },{
        name: "Garlic Cheese",
        items: [{
          name: "garlic"
        }, {
          name: "Cheese"
        }]
      }]
    };
  }

  handleAdd(){
    this.state.items.push();
  }

  handleAddModal(){
    this.setState({
      modalState: "add"
    });
    return <ModalConductor value={this.state.modalState}/>
  }

  render() {
    var list = [];
    for (var i = 0; i < this.state.items.length; i++)
    {
      list.push(<Recipe key={i} value={this.state.items[i]}/>);
    }
    return (
      <div>
        <div>
          {list}
        </div>
        <div>
          <button onClick={this.handleAddModal.bind(this)}>Add</button>
        </div>
      </div>
      );
  }
}

export default List;

import React, { Component } from 'react';
import OrderItem from '../OrderItem';

class OrderList extends Component {
  constructor(props){
    // console.log(props)
    super(props);
    this.state ={
      data: []
    }
  }

  componentDidMount(){
    fetch('/mock/orders.json').then(res =>{
      // console.log(res)
      if(res.ok) {
        res.json().then(data => {
          // console.log(data)
          this.setState({
            data
          })
        })
      }
    })
  }


  render() {
    return (
      <div>
        {
          this.state.data.map(item => {
            return <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit}></OrderItem>
          })
        }
        
      </div>
    );
  }

  // commentSubmit methods is on father Component
  handleSubmit = (id, comment, stars) => {
    // ...
    //  submit to backen后台
    const newData = this.state.data.map(item =>{
      return  item.id === id ?
      {
        ...item, comment, stars, ifCommented: true
      }: item
    })
    this.setState({
      data: newData
    })
  }
}

export default OrderList;
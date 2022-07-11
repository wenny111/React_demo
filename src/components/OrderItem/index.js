import React, { Component } from 'react';
import './style.css'

class OrderItem extends Component {
  // stars state
  constructor(props) {
    super(props);
    this.state = {
      stars: props.data.stars || 0, //初始值
      editing: false,
      comment: props.data.comment || ""
    }
  }

  render() {
    const { product, shop, price, picture,ifCommented } = this.props.data
    return (
      <div className='orderItem'>
        <div>
          <div className='orderItem__picContainer'>
            <img className='orderItem__pic' src={picture}></img>
          </div>
          <div className='orderItem__content'>
            <div className='orderItem__product'>{product}</div>
            <div className='orderItem__shop'>{shop}</div>
            <div className='orderItem__detail'>
              <div className='orderItem__price'>{price}</div>
              <div className='orderItem__btnContainer'>
                <button className= { 
                  ifCommented ?  
                  'orderItem__btn orderItem__btn--grey':'orderItem__btn orderItem__btn--red'}
                  onClick = {!ifCommented ? this.handleOpenArea: null}
                  >{ifCommented ? '已评价': '评价'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.state.editing ? this.renderCommentArea() : null}
        </div>
      </div>
    );
  }

  renderCommentArea(){
    return(
      <div className='orderItem__commentContainer'>
        <textarea className='orderItem__comment'
        value={this.state.comment}
        onChange={this.handleCommentChange}
        ></textarea>
        <div>
        {this.renderStars()}
        </div>
        <div>
          <button className='orderItem__btn orderItem__btn--red' onClick={this.handleSubmitComment}>提交</button>
          <button className='orderItem__btn orderItem__btn--grey' onClick={this.handleCancelComment}>取消</button>
        </div>
      </div>
    )
  }

  renderStars(){
      const { stars } = this.state;
      return (
        // paint stars
        <div>        
         {
          [1, 2, 3, 4, 5].map((item, index) => {
          // how to display 5 stars actively
          const lightClass = stars >= item ? "orderItem__stars--light" : "orderItem__btn--grey"
          return (
            <span className={"orderItem__star " + lightClass} 
            key={index} 
            onClick={this.handleClickStars.bind(this, item)}>★</span>
          )
        })} 
        </div>
      )
  }

  handleOpenArea = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleCommentChange = (e) => {
    // console.log(e)
    this.setState({
      comment: e.target.value
    })

  }

  handleClickStars = (stars) => {
    console.log(stars)
    this.setState({
      stars: stars
    })
  }

  handleCancelComment = () => {
    this.setState({
      stars: this.props.data.stars || 0, //初始值
      editing: false,
      comment: this.props.data.comment || ""
    })
  }

  // commentSubmit methods is on father Component
  handleSubmitComment = () => {
    const { id } = this.props.data;
    const { comment, stars } = this.state;
    this.setState({
      editing: false
    })
    this.props.onSubmit(id, comment, stars)
  }
}

export default OrderItem;
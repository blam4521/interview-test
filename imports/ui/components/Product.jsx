// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import {Bert} from 'meteor/themeteorchef:bert';

// Components
import Button from "../components/Button.jsx";
import Counter from "../components/Counter.jsx";

// Collections
import { Orders } from "/imports/api/orders/collection";


class Product extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      selectedProduct: {},
      isAdded: false
    }
  // Binding to make 'this' work in the call back
  this.handleBuyProduct=this.handleBuyProduct.bind(this)
  
  }

  handleBuyProduct = (info, quantity) => {
    console.log(info)

    // Inserting into the database
    Orders.insert({
      user: Meteor.userId(),
      quantity: quantity,
      products:info,
      
    });

    // Adding the state of Product
    this.setState({ 
        selectedProduct: info 
    }, function() {
      this.props.addedToCart(this.state.selectedProduct);
    })

    this.setState(prevState => ({
      addedToCart: !prevState.addedToCart
    }));
    
    Bert.alert(`${info[1].value} added to cart!`,
      'success', 'growl-bottom-right');
  
  }

  render() {
    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price }
    ];

    let quantity = this.props.productQuantity;

    return (
      <div className="product">
        <img alt={name} src={image} />
        <div className="details">
          <div className="info">
            {info.map(({ label, value }) =>
              <div className="info-row" key={`${name}-${label}-${value}`}>
                <div className="label">
                  {label}:
                </div>
                <div className="value">
                  {value}
                </div>
              </div>
            )}
          </div>
          <Button onClick={() => this.handleBuyProduct(info, quantity)}>
            Buy {name}
          </Button>

          <Counter productQuantity={quantity} updateQuantity={this.props.updateQuantity} resetQuantity={this.resetQuantity}/>
          
        </div>
      </div>
    );
  }
}

export default Product;

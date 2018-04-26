// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { createContainer } from 'meteor/react-meteor-data'

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

// Collection
import { Merchants } from "/imports/api/merchants/collection";

const PER_PAGE = 1;

class Shop extends PureComponent {
  
  constructor(props) {
    super(props);
    // console.log(this.props.merchants)
    this.state = {
      merchants: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: '',
      brand:'',
      cartBounce:false,
      quantity:1,
      error: null
    };
  
  // Binding functions
  // this.handleSearch = this.handleSearch.bind(this);
  // this.handleBrand = this.handleBrand.bind(this);
  
  this.handleAddToCart = this.handleAddToCart.bind(this);
  this.sumTotalItems = this.sumTotalItems.bind(this);
  this.sumTotalAmount = this.sumTotalAmount.bind(this)
  // this.checkProduct = this.checkProduct.bind(this);
	this.updateQuantity = this.updateQuantity.bind(this);
	// this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }

  // componentDidMount() {
    
  // //   // Meteor.call("merchants.getMerchants", (error, response) => {
  // // //     if (error) {
  // // //       this.setState(() => ({ error: error }));
  // // //     } else {
  // //       this.setState(() => ({ merchants: this.props.merchants }));
  // // //     }
  // // //   });
  //   console.log(this.state.merchants)  
  // }

  componentWillMount() {
    console.log('inside will mount')
    this.page = 1
  }

  handleShowMore() {
    console.log('button clicked', this.page)
    sub1 = Meteor.subscribe("merchants", PER_PAGE * ( this.page + 1))
    console.log('sub1', sub1)
    this.page += 1
  }

  componentWillReceiveProps(nextProps) {
    // console.log("what is this?",nextProps.postings)
    this.setState(() => ({ merchants: nextProps.postings }));
  }

  goBack = () => this.props.history.push("/");

  // Add to Cart
	handleAddToCart(selectedProducts){
    
    let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
    
    if(this.checkProduct(productID)){
			console.log('hi', productID);
			let index = cartItem.findIndex((x => x.id == productID));
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart : cartItem,
			cartBounce: true,
		});
		 
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
  }
  
  sumTotalItems(){
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    })
  }
    
  sumTotalAmount(){
    let total = 0;
    let cart = this.state.cart;
    for (var i=0; i<cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
    this.setState({
      totalAmount: total
    })
  }

  //Reset Quantity
	updateQuantity(qty){
		console.log("quantity added...")
		this.setState({
				quantity: qty
		})
  }
  
  checkProduct(productID){
		let cart = this.state.cart;
		return cart.some(function(item) {
			return item.id === productID;
		}); 
	}

  render() {
    const { merchants, error } = this.state;
    
    // These functions filter the data
    const getProductsFromMerchant = ({ products, brands }) =>
      
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));
    
    
    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );
     

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} 
                      key={id} 
                      searchTerm={this.state.term}
					            addedToCart={this.handleAddToCart}
					            productQuantity={this.state.quantity}
					            updateQuantity={this.updateQuantity}/>
          )}
          

          <button onClick={this.handleShowMore.bind(this)}
            className="btn btn-primary">
            Load More Products..
          </button>
        </div>
      </Page>
    );
  }
}

export default createContainer( (props) => {
  // set up subscription
  const sub1 = Meteor.subscribe("merchants", PER_PAGE);
    // console.log('props is ', props)
  const loading = !sub1.ready()
  const postings = Merchants.find({}).fetch() 
  
  // console.log(postings)
  return {
      loading,  
      postings
    }; }
  ,Shop);



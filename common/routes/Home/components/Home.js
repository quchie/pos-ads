import React from 'react'

import { StyleSheet, css } from 'aphrodite'
import data from '../data'

// This is a static page. It uses an array to hold data about the resources
// and maintain DRY
const Home = React.createClass({

     classicPrice: 269.99,
     standoutPrice: 322.99,
     premiumPrice: 394.99,
     getInitialState: function() {
         return {
             value: 'select',
             cart: [],
             price: 0.00,
             standardCount: 0,
             standardCountTotalPrice: 0,
             premiumCount: 1,
             premiumCountTotalPrice: 0
         }
     },
     change: function(event){
        this.setState({
          value: event.target.value
        });
     },
     addClassic: function(event){
        let currCart = this.state.cart
        let price = this.state.price + this.classicPrice
        let standardCount = this.state.standardCount + 1
        let standardCountTotalPrice = this.state.standardCountTotalPrice + this.classicPrice
        let self = this
        for(let client of data){
          if(client.name === this.state.value){
            client.pricingRules.forEach(function(rule, i) {
              //Rules for 3 for 2 deal
              if(rule.type === 'Reduction_Deal' && rule.plan === 'classic'){
                if(rule.buyingBase === standardCount){
                  let factorToPay = rule.reductionBase
                  price = price - standardCountTotalPrice
                  price = price + (factorToPay * self.classicPrice)
                  //Reset price count
                  standardCount = 0
                  standardCountTotalPrice = 0
                }
              }
            })
          }
        }
        this.state.cart.unshift(event.target.value)
        this.setState({
          value: this.state.value,
          cart: this.state.cart,
          price: price,
          standardCount: standardCount,
          standardCountTotalPrice: standardCountTotalPrice
        })

     },
     addStandout: function(event){
        let price = this.state.price + this.standoutPrice
        let self = this
        for(let client of data){
          if(client.name === this.state.value){
            client.pricingRules.forEach(function(rule, i) {
              //Rules for Price reduction
              if(rule.type === 'Standard_Reduced_Price' && rule.plan === 'standout'){
                price = self.state.price + rule.price 
              }else{
                price = self.state.price + self.standoutPrice
              }
            })
          }
        }
         
        this.state.cart.unshift(event.target.value)
        this.setState({
          value: this.state.value,
          cart: this.state.cart,
          price: price
        })
     },
     addPremium: function(event){
        let currCart = this.state.cart
        let price = this.state.price + this.premiumPrice
        let premiumCount = this.state.premiumCount
        let premiumCountTotalPrice = this.state.premiumCountTotalPrice
        let self = this
        for(let client of data){
          if(client.name === this.state.value){
            client.pricingRules.forEach(function(rule, i) {
              //Rules for premium set after reaching target
              if(rule.type === 'Reduced_Price_Bulk' && rule.plan === 'premium'){
                if(premiumCount >= rule.buyingBase){
                  
                  //Set the price to 0
                  price = 0
                  //Use new price to culculate new total
                  if(premiumCount != 0){
                    //Only once!
                    price = premiumCount * rule.price
                  }else{
                    //Set new price moving forward
                    price = self.state.price + rule.price
                  }

                  //Reset
                  premiumCount = 0
                  premiumCountTotalPrice = 0

                }else{
                  price = self.state.price + self.premiumPrice
                  premiumCount = self.state.premiumCount + 1
                  premiumCountTotalPrice = self.state.premiumCountTotalPrice + self.premiumPrice
                }
              }
            })
          }
        }
        this.state.cart.unshift(event.target.value)
        this.setState({
          value: this.state.value,
          cart: this.state.cart,
          price: price,
          premiumCount: premiumCount,
          premiumCountTotalPrice: premiumCountTotalPrice
        })
     },
     render: function(){

        return(
          <div>
            <h2 className={css(styles.header)}>Select Client</h2>
            Selected Client: {this.state.value} 
            <br/>
            <select id="lang" onChange={this.change} value={this.state.value}>
              <option value="select">Select</option>
              {data.map((item, i) => (
              <option value={item.name}>{item.name}</option>
              ))}
            </select>

            {this.state.value != 'select' &&
            <div>
             <h2 className={css(styles.header)}>Select Product</h2>
            <button onClick={this.addClassic} value="classic"> Classic Ad </button>
            <button onClick={this.addStandout} value="standout"> Standout Ad​ </button>
            <button onClick={this.addPremium} value="premium"> Premium Ad​ </button>
            <ul>
              {this.state.cart.map((item, i) => (
                <li>{item}</li>
              ))}
            </ul>
            <br/>
            <h2>Total Price: ${this.state.price}</h2>
            </div>
            }
          </div>
        )
      }
    })

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    lineHeight: '1.2',
    margin: '0 0 1.5rem'
  },
  lead: {
    fontSize: 18,
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  },
  list: {
    fontSize: '1rem',
    listStyle: 'none',
    padding: 0
  },
  link: {
    display: 'block',
    fontSize: '1.25rem',
    margin: '0 0 .5rem',
    lineHeight: '1.5',
    fontWeight: 'bold',
    color: '#08c',
    opacity: 1,
    transition: '.2s opacity ease',
    textDecoration: 'none',
    ':hover': {
      opacity: 0.5,
      textDecoration: 'none'
    }
  }
})

export default Home

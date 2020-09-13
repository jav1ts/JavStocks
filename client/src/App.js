import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import './App.css'
import LoginWrapper from './components/LoginWrapper/LoginWrapper'
import MenuNav from './components/MenuNav/MenuNav'
import Portfolio from './components/Portfolio/Portfolio'
import Transactions from './components/Transactions/Transactions'
import { loginUser, createUser, symbolGetter, updateBalance, addStock } from './services/api'

export default class App extends Component {

  state = {
    userId: null,
    username: null,
    email: null,
    balance: 0,
    password: null,
    isLoggedIn: false,
    activeItem: 'Login',
    symbol: "",
    currentPrice: null,
    symbolData: {},
    qty: "",
    qtyPurchased: "",
    purchaseStatus: '',
    symbolPresent: false,
    visible: false,
    isOpen: false
  }

  onFormChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  hideSymbol = (event) => this.setState({ symbolPresent: false })

  onLoginSubmit = async (event) => {
    event.preventDefault();
    const user = await loginUser({
      email: this.state.email,
      password: this.state.password
    })

    if (user.data.username) {
      this.setState({
        userId: user.data.id,
        username: user.data.username,
        email: user.data.email,
        balance: user.data.balance,
        isLoggedIn: true,
        activeItem: 'portfolio'
      })
    } else {
      this.handleOpen()
    }

  }

  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, 2500)
  }

  onRegisterSubmit = async (event) => {

    const { username, email, password } = this.state;

    event.preventDefault();

    if (username && email && password) {
      const user = await createUser({
        username: username,
        email: email,
        password: password,
        balance: 10000
      })
      console.log(user);
      this.setState({
        userId: user.data.id,
        username: user.data.username,
        email: user.data.email,
        balance: user.data.balance,
        isLoggedIn: true,
        activeItem: 'portfolio'
      })
    } else {
      this.handleOpen()
    }
  }

  onSymbolSubmit = async (event) => {
    event.preventDefault();
    const data = await symbolGetter(this.state.symbol.toUpperCase())
    if (data.data !== "FAILED") {
      this.setState({
        symbol: '',
        symbolData: data.data,
        symbolPresent: true,
        currentPrice: data.data.latestPrice
      })
    } else {
      this.handleOpen()
    }

  }

  onBuySubmit = async (event) => {
    event.preventDefault();
    const { balance, qty, currentPrice, userId, symbolData } = this.state
    const newBal = balance - (currentPrice * qty)

    if (newBal >= 0) {
      await addStock({ companyName: symbolData.companyName, ticker: symbolData.symbol, qty: qty, userId: userId })
      await this.setState({ balance: newBal, qty: "", purchaseStatus: 'good', visible: true, qtyPurchased: qty, symbolPresent: false })
      updateBalance(userId, { balance: `${newBal}` })
      setTimeout(() => this.setState({ visible: false }), 3000)
    }

    if (newBal < 0) {
      this.setState({ visible: true, purchaseStatus: 'nogood', qty: "" })
      setTimeout(() => this.setState({ visible: false }), 3000)
    }
  }

  render() {

    const {
      userId,
      username,
      isLoggedIn,
      activeItem,
      balance,
      qty,
      qtyPurchased,
      symbol,
      symbolData,
      symbolPresent,
      currentPrice,
      purchaseStatus,
      visible,
      isOpen,
      handleOpen
    } = this.state;

    return (
      <main className="ui container fixed-margin">
        {
          !isLoggedIn ?
            <Route exact path="/" render={() =>
              <LoginWrapper
                isOpen={isOpen}
                handleOpen={handleOpen}
                activeItem={activeItem}
                handleItemClick={this.handleItemClick}
                onFormChange={this.onFormChange}
                onLoginSubmit={this.onLoginSubmit}
                onRegisterSubmit={this.onRegisterSubmit}
              />}
            />
            :
            <>
              <MenuNav
                username={username}
                activeItem={activeItem}
                handleItemClick={this.handleItemClick}
                balance={balance}
              />
              <Redirect to="/portfolio" />
              <Route path="/portfolio" render={() =>
                <Portfolio
                  userId={userId}
                  onFormChange={this.onFormChange}
                  balance={balance}
                  qty={qty}
                  qtyPurchased={qtyPurchased}
                  symbol={symbol}
                  symbolData={symbolData}
                  symbolPresent={symbolPresent}
                  onSymbolSubmit={this.onSymbolSubmit}
                  onBuySubmit={this.onBuySubmit}
                  currentPrice={currentPrice}
                  hideSymbol={this.hideSymbol}
                  purchaseStatus={purchaseStatus}
                  visible={visible}
                  isOpen={isOpen}
                  handleOpen={handleOpen}
                />}
              />
              <Route path="/transactions" render={() =>
                <Transactions
                  userId={userId}
                  symbolData={symbolData}
                />}
              />
            </>
        }
      </main>
    )
  }
}
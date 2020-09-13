import React, { Component } from 'react'
import { Grid, List, Header, Form, Input, Message, Popup } from 'semantic-ui-react'
import TickerInfo from '../TickerInfo/TickerInfo';
import Stock from '../Stock/Stock';
import { getAllStocks } from '../../services/api'

export default class Portfolio extends Component {
  state = {
    stocks: []
  }

  async componentWillMount() {
    const data = await getAllStocks(this.props.userId)
    this.setState({ stocks: data.data })
  }

  async componentDidUpdate() {
    const data = await getAllStocks(this.props.userId)
    this.setState({ stocks: data.data })
  }

  render() {

    const {
      userId,
      balance,
      qty,
      qtyPurchased,
      onFormChange,
      onBuySubmit,
      symbolData,
      symbolPresent,
      onSymbolSubmit,
      symbol,
      currentPrice,
      hideSymbol,
      purchaseStatus,
      visible,
      isOpen,
      handleOpen
    } = this.props;

    const { stocks } = this.state;

    const stocksDisplay = (arr) => {
      let obj = {};
      let answer = []

      arr.forEach(e => {
        if (obj[e.ticker] !== e.ticker) {
          obj[e.ticker] = { qty: 0, ticker: e.ticker, companyName: e.companyName }
        }
      })

      for (let i of Object.values(obj)) {
        answer.push(i)
      }

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < answer.length; j++) {
          if (arr[i].ticker === answer[j].ticker) {
            answer[j].qty += arr[i].qty
          }
        }
      }

      return answer
    }

    const formattedStocks = stocksDisplay(stocks)

    return (
      <>

        <Grid stackable columns={2}>
          <Grid.Column>
            <Header size="huge">Portfolio</Header>
            <List >
              {
                formattedStocks.map(stock =>
                  <Stock
                    key={stock.ticker}
                    companyName={stock.companyName}
                    symbol={stock.ticker}
                    qty={stock.qty}
                  />)
              }
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header size="huge">Search For Stocks</Header>
            <Form onSubmit={onSymbolSubmit}>
              <Popup
                trigger={<Input
                  fluid
                  name="symbol"
                  value={symbol}
                  className='icon'
                  icon='search'
                  placeholder='Search Symbol...'
                  onChange={onFormChange}
                />}
                content={`Invalid Symbol`}
                on='click'
                open={isOpen}
                onOpen={handleOpen}
                position='bottom center'
              />

            </Form>
            {symbolPresent ?
              <TickerInfo
                userId={userId}
                onBuySubmit={onBuySubmit}
                onFormChange={onFormChange}
                qty={qty}
                balance={balance}
                symbolData={symbolData}
                currentPrice={currentPrice}
                hideSymbol={hideSymbol}
              />
              : null
            }{
              purchaseStatus === 'good' && visible ?
                <Message
                  positive
                  header="Success!"
                  content={`You have successfully bought ${qtyPurchased} shares of ${this.props.symbolData.symbol}`}
                />
                : purchaseStatus === 'nogood' && visible ?
                  <Message
                    negative
                    header="Error!"
                    content="There was an error handling your purchase."
                  /> : null
            }
          </Grid.Column>
        </Grid>
      </>
    )
  }
}

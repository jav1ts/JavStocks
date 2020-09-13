import React, { Component } from 'react'
import { List, Message } from 'semantic-ui-react'
import { symbolGetter } from '../../services/api'


export default class Stock extends Component {

  state = {
    price: 0,
    change: 0,
    positive: false,
    negative: false
  }

  statusChecker = async (change) => {
    if (change < 0) {
      await this.setState({ negative: true, positive: false })
    }
    if (change > 0) {
      await this.setState({ negative: false, positive: true })
    }
  }

  async componentWillMount() {
    const price = await symbolGetter(this.props.symbol)
    await this.setState({ price: price.data.latestPrice, change: price.data.change })
    await this.statusChecker(this.state.change)
  }


  render() {
    const { positive, negative } = this.state
    const { symbol, companyName, qty } = this.props;
    const currentPrice = this.state.price.toFixed(2);
    const total = currentPrice * qty



    return (
      <List.Item >
        <Message positive={positive} negative={negative}>
          <Message.Header>{companyName} ( {symbol} )</Message.Header>
          <p>{qty} Shares @ ${currentPrice}<span style={{ float: "right" }}>Total Value: ${total.toFixed(2)}</span></p>
        </Message>
      </List.Item>
    )
  }
}

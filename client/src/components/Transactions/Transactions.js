import React, { Component } from 'react'
import { Header, Table } from 'semantic-ui-react'
import Transaction from '../Transaction/Transaction';
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

    const { stocks } = this.state

    const transactions = stocks.map(stock =>
      <Transaction
        key={stock.id}
        ticker={stock.ticker}
        name={stock.companyName}
        qty={stock.qty}
        createdAt={stock.createdAt}
      />)
      .reverse()

    return (
      <>
        <Header size="huge">Transactions</Header>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Company</Table.HeaderCell>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {transactions}
          </Table.Body>
        </Table>
      </>
    )
  }
}

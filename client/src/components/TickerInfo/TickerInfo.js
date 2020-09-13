import React, { Component } from 'react'
import { Card, Input, Form } from 'semantic-ui-react'

export default class TickerInfo extends Component {
  render() {
    const { symbolData, onBuySubmit, onFormChange, qty, hideSymbol } = this.props



    return (
      <Card fluid>

        <Card.Content>
          <i style={{ float: "right", cursor: "pointer" }} className="close icon" onClick={hideSymbol}></i>
          <Card.Header>{symbolData.companyName}</Card.Header>
          <Card.Header style={{ float: "right" }}>Current Price: ${symbolData.latestPrice}</Card.Header>
          <Card.Meta>{symbolData.symbol}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Form onSubmit={onBuySubmit}>
            <Input
              fluid
              action='Buy'
              value={qty}
              name="qty"
              type="number"
              min="0"
              placeholder="Enter Quantity..."
              onChange={onFormChange}
            />
          </Form>
        </Card.Content>
      </Card>
    )
  }
}

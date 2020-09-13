import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuNav extends Component {

  render() {
    const { activeItem, handleItemClick, balance, username } = this.props

    return (
      <Menu size='massive'>
        <Menu.Item header>{username}</Menu.Item>
        <Menu.Item header>Available Cash: ${balance.toFixed(2)}</Menu.Item>
        <Menu.Menu position="right">
          <Link to="/portfolio"><Menu.Item position='right' as="p" name='portfolio' active={activeItem === 'portfolio'} onClick={handleItemClick} /></Link>
          <Link to="/transactions"><Menu.Item position='right' as="p" name='transactions' active={activeItem === 'transactions'} onClick={handleItemClick} /></Link>
        </Menu.Menu>
      </Menu>
    )
  }
}

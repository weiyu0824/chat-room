import React from 'react'
import { Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components'
import { useAuthStore } from '../store/AuthStore'

const Brand = styled.span`
  color: white;
`
const Name = styled.span`
  color: white;
`

const MyNav: React.FC = () => {

  const username = useAuthStore((state) => state.username)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  return (
    <Navbar color="black">
      <Brand>brand</Brand>


      {isLoggedIn ? <Name> {username} </Name> : <Link to='/signin'><Button>log in </Button></Link>}


    </Navbar>
  )
}

export default MyNav

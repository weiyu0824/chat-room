import React, { useState } from 'react'
import styled from 'styled-components'
import { IconContext } from "react-icons"
import { RxAvatar } from 'react-icons/rx'
import { Color } from '../../../utils/color'
import { AvatarImgs } from '../../../utils/avatar'

const ContactBox = styled.div`
  display: flex;
  flex-direction: row;
  color: ${Color.lgrey};
  border-radius: 0.2rem;
  padding: 0.2rem;
  /* border-radius: 0.1rem; */

  &:hover{
    background-color: ${Color.grey};
    cursor: pointer;
  }

  .avatarBox {
    flex-shrink:0;
    height: 2rem;
    width: 2rem;
    margin: 0px 15px 0px 0px;

    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  .fullName {
    margin: auto 0;
  }

`
interface IContact {
  contactId: string
  name: string
  username: string
  avatar: string
}
const Contact: React.FC<IContact> = (props) => {
  return (
    <ContactBox>
      <div className='avatarBox'>
        <img className='avatar' src={AvatarImgs[props.avatar]} alt="Image"/>
      </div>
      <span className='fullName'> {props.name} </span>
      
    </ContactBox>
  )
}

export default Contact
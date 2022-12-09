import React from 'react'
import styled from 'styled-components'
import { IconContext } from "react-icons"
import { RxAvatar } from 'react-icons/rx'
import {color} from '../../utils/color'
const C = new color()
interface Props {
  sentences: string[]
}
const SentencePanal = styled.div`
  height: 200px;
  overflow-y: scroll;
`
const Sentence = styled.div`
  background-color: ${C.blue};
  color: ${C.white};
  margin: 5px 0px;
  text-align: left;
`

const OriginalSentences: React.FC<Props> = (props: Props) => {

  const sentences = props.sentences.map((value, index) => {
    return (
      <Sentence key={index}>
        <IconContext.Provider value={{}}>
          <RxAvatar />
        </ IconContext.Provider>
        {" "}{value}
      </Sentence>
    )
  })
  return (
    <SentencePanal>
      {sentences}
    </SentencePanal>
  )
}

export default OriginalSentences
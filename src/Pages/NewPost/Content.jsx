import React from 'react'

const Content = ({block}) => {
  const content = block.data.text
  return (
    <div dangerouslySetInnerHTML={{__html: content}} />
  )
}

export default Content
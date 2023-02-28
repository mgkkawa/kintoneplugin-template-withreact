import React from 'react'
import manifest from '../../../../../plugin/manifest.json'

type Props = {
  text: string
}

const TitleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 'bold',
}

const titleText = manifest.name.ja

export const Title: React.FC = () => {
  return <h1 style={TitleStyle}>{titleText}</h1>
}

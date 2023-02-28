import React from 'react'

type Props = {
  text: string
}

const DescriptionStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#888',
}

const descriptionText = '各種設定'

export function Description() {
  return <div style={DescriptionStyle}>{descriptionText}</div>
}

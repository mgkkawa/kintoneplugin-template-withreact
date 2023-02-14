import React from 'react'
import ReactDOM from 'react-dom/client'
import { triggers } from '../types'

const { index } = triggers

kintone.events.on(index, async event => {
  const { record } = event

  return event
})

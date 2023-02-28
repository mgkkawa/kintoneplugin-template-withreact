import React from 'react'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'

const SelecterStyle: React.CSSProperties = {
  minWidth: 165,
}
const TEST_VALUES = [
  { label: 'abc', value: 'abc' },
  { label: 'def', value: 'def' },
  { label: 'ghi', value: 'ghi' },
  { label: 'jkl', value: 'jkl' },
]

const Selecter = ({ values = TEST_VALUES }) => {
  return (
    <FormControl style={SelecterStyle}>
      <InputLabel>編集不可フィールド</InputLabel>
      <Select>
        {values.map(val => (
          <MenuItem value={val.value}>{val.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export const Disableds = ({ values = TEST_VALUES }) => {
  return (
    <FormControl style={SelecterStyle}>
      <InputLabel>編集不可フィールド</InputLabel>
      <Select>
        {values.map(val => (
          <MenuItem value={val.value}>{val.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

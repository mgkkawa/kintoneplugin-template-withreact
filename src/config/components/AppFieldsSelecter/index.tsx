import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

type FieldProps = {
  type: string
  code: string
  label: string
}
type SelecterProps = {
  label: string
  fields: FieldProps[]
  value?: string
  deleted?: string
}

export const AppFieldsSelecter = ({ label, fields, value = '', deleted }: SelecterProps) => {
  return (
    <FormControl>
      <InputLabel id={label + 'id'}>{label}</InputLabel>
      <Select labelId={label + 'id'} defaultValue={value}>
        {fields.map(field =>
          field.code != deleted ? (
            <MenuItem key={field.code} value={field.code}>
              {field.label}
            </MenuItem>
          ) : (
            <></>
          ),
        )}
      </Select>
      {/* <MenuItem></MenuItem> */}
    </FormControl>
  )
}

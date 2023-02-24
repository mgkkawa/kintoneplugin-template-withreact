import React, { useContext } from 'react'
import { AppFieldsSelecter } from '..'
import { ConfigContext } from '../../App'

export const DisableFieldsSetting = () => {
  const config = useContext(ConfigContext)
  console.log(config)
  return (
    <div>
      <AppFieldsSelecter label='非活性フィールド' fields={config.fields} />
    </div>
  )
}

import { Button } from '@mui/material'
import React, { createContext, useContext, useMemo } from 'react'
import { getAllFields, getConfig } from '../modules'
import {
  ChangeEventsSetting,
  DisableFieldsSetting,
  HiddenFieldsSetting,
  PluginTitle,
  ResetFieldsSetting,
} from './components'
import { PageTab, TabItem } from './components/PageTabs'

const Elements = [
  { element: <DisableFieldsSetting />, title: '非活性設定' },
  { element: <HiddenFieldsSetting />, title: '非表示設定' },
  { element: <ResetFieldsSetting />, title: 'リセット設定' },
  { element: <ChangeEventsSetting />, title: '変更イベント設定' },
]

console.log(kintone.$PLUGIN_ID)
const config = getConfig()
const setFields = async () => {
  const fields = await getAllFields()
  config.fields = fields
}
export const ConfigContext = createContext(config)

export const App = () => {
  if (!config.fields) setFields()
  Promise.all(config.fields)
  console.log(config)

  return (
    <ConfigContext.Provider value={config}>
      <form>
        <PluginTitle />
        <PageTab defaultKey={0}>
          <br />
          {Elements.map(({ element, title }, index) => (
            <TabItem tabKey={index} children={element} title={title} key={index}></TabItem>
          ))}
        </PageTab>
        <br />
        <Button variant='outlined'>キャンセル</Button>
        <Button variant='contained'>保存</Button>
      </form>
    </ConfigContext.Provider>
  )
}

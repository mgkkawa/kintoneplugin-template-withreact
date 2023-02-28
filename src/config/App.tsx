import React, { createContext, useContext, useMemo, useState } from 'react'
import { getConfig } from '../modules'
import { Title, Description, FormEndRow, Disableds } from './components'
import { PageTab, TabItem } from './components/PageTabs'

const TestElement = () => {
  return <div />
}

const Elements = [
  { element: <Disableds />, title: '非活性設定' },
  { element: <TestElement />, title: '非表示設定' },
  { element: <TestElement />, title: 'リセット設定' },
  { element: <TestElement />, title: '変更イベント設定' },
  { element: <TestElement />, title: '変更イベント設定' },
]

export const ConfigContext = createContext(getConfig())

export const App = () => {
  const [config, setconfig] = useState(useContext(ConfigContext))
  return (
    <ConfigContext.Provider value={config}>
      <Title />
      <Description />
      <br />
      <PageTab defaultKey={0}>
        <br />
        <hr />
        {Elements.map((elem, key) => (
          <TabItem key={key} tabKey={key} title={elem.title}>
            {elem.element}
          </TabItem>
        ))}
      </PageTab>
      <br />
      <FormEndRow />
    </ConfigContext.Provider>
  )
}

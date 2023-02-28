import Button from '@mui/material/Button'
import React, { FC } from 'react'
import {
  createContext,
  memo,
  PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

type TabState = {
  activeKey: number
  addItem: (title: string, key: number) => void
}

type TabValue = {
  title: string
  key: number
}

const TabContext = createContext<TabState>({
  activeKey: 0,
  addItem: () => {},
})

type TabProps = {
  defaultKey?: number
}

const wrapStyle: React.CSSProperties = {
  display: 'flex',
}

const itemStyle: React.CSSProperties = {
  display: 'inline-block',
}

export const PageTab: FC<PropsWithChildren<TabProps>> = ({ defaultKey = 0, children }) => {
  const [activeKey, setActiveKey] = useState(defaultKey)
  const [tabs, setTabs] = useState<TabValue[]>([])
  const addTab = useCallback((title: string, key: number) => {
    setTabs(tabs => {
      if (tabs.findIndex(item => item.key === key) >= 0) {
        return tabs
      } else {
        return [...tabs, { title, key }]
      }
    })
  }, [])

  const state = useMemo<TabState>(
    () => ({
      activeKey,
      addItem: addTab,
    }),
    [activeKey, tabs],
  )

  return (
    <TabContext.Provider value={state}>
      <div className='tab-wrap' style={wrapStyle}>
        {tabs.map(({ title, key }) => (
          <Button
            variant={key === activeKey ? 'contained' : 'outlined'}
            key={key}
            style={itemStyle}
            className={`tab-item ${activeKey === key ? 'active' : 0}`}
            onClick={() => setActiveKey(key)}>
            {title}
          </Button>
        ))}
      </div>
      {children}
    </TabContext.Provider>
  )
}

type TabItemProps = {
  tabKey: number
  title: string
}

export const TabItem: FC<PropsWithChildren<TabItemProps>> = ({ title, tabKey, children }) => {
  const { activeKey, addItem } = useContext(TabContext)

  useLayoutEffect(() => {
    addItem(title, tabKey)
  }, [])

  return tabKey === activeKey ? <>{children}</> : null
}

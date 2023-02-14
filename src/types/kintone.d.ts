declare namespace kintone {
  type Event = {
    appId: number
    record: RECORD
    type: string
  }
  type ChangeEvent = Event & { changes: Changes }
  type Field = StringField | UserField | ArrayField
  type Changes = {
    field: { type: string; value: any }
    row: null
  }
}

type FieldError = {
  error?: string | null
}

type FieldDisabled = {
  disabled?: boolean
}

type FieldNoRequired = FieldError & FieldDisabled

type CustomFieldType =
  | 'UPDATED_TIME'
  | 'SINGLE_LINE_TEXT'
  | 'MULTI_LINE_TEXT'
  | 'RICH_TEXT'
  | 'NUMBER'
  | 'CALC'
  | 'RADIO_BUTTON'
  | 'DROP_DOWN'
  | 'DATE'
  | 'TIME'
  | 'DATETIME'
  | 'LINK'

type StringField = {
  type:
    | 'UPDATED_TIME'
    | 'SINGLE_LINE_TEXT'
    | 'MULTI_LINE_TEXT'
    | 'RICH_TEXT'
    | 'NUMBER'
    | 'CALC'
    | 'RADIO_BUTTON'
    | 'DROP_DOWN'
    | 'DATE'
    | 'TIME'
    | 'DATETIME'
    | 'LINK'
  value: string
} & FieldNoRequired

type UserField = {
  type: 'USER_SELECT' | 'ORGANIZATION_SELECT' | 'GROUP_SELECT'
  value: kintone.LoginUser[]
} & FieldNoRequired

type ArrayField = {
  type: 'CHECK_BOX' | 'MULTI_SELECT'
  value: string[]
} & FieldNoRequired

type SubTable = {
  type: 'SUBTABLE'
  value: SubTableValue[]
}

type SubTableValue = {
  id: string
  value: StringField | UserField | ArrayField
}

type RECORD_NUMBER = {
  type: 'RECORD_NUMBER'
  value: string
}

type __ID__ = {
  type: '__ID__'
  value: string
}

type __REVISION__ = {
  type: '__REVISION__'
  value: string
}

type CREATED_TIME = {
  type: 'CREATED_TIME'
  value: string
}

type CREATOR = {
  type: 'CREATOR'
  value: kintone.LoginUser
}

type UPDATED_TIME = {
  type: 'UPDATED_TIME'
  value: string
}

type MODIFIER = {
  type: 'MODIFIER'
  value: kintone.LoginUser
}

type CATEGORY = {
  type: 'CATEGORY'
  value: string[]
}

type STATUS = {
  type: 'STATUS'
  value: string
}

type STATUS_ASSIGNEE = {
  type: 'STATUS_ASSIGNEE'
  value: kintone.LoginUser[]
}

type RECORD = {
  $id: __ID__
  $revision: __REVISION__
  作成日時: CREATED_TIME
  作成者: CREATOR
  更新日時: UPDATED_TIME
  更新者: MODIFIER
  カテゴリー?: CATEGORY
  ステータス?: STATUS
  作業者?: STATUS_ASSIGNEE
  レコード番号: RECORD_NUMBER
} & Record<CustomFieldType, any>

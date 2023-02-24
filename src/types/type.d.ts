declare type PluginConfig = {
  hiddens?: HiddenField[]
  resets?: ResetField[]
  changes?: ChangeEventProps[]
  disableds?: DisableField[]
}

declare type Terms = {
  target: string
  operand: number
  arg: string | string[]
}

declare type HiddenField = {
  fieldCd: string
  isDetail: boolean
  terms?: Terms
}

declare type ResetField = {
  fieldCd: string
  value: string | string[] | kintone.LoginUser[]
  terms?: Terms
}

declare type DisableField = {
  fieldCd: string
  terms?: Terms
}

declare type ChangeEventProps = {
  fieldCd: string
  terms: Tems
  setValue?: string | string[]
  hiddens?: HiddenField[]
  resets?: ResetField[]
  disableds?: DisableField[]
}

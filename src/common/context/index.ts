import { Network } from 'aptos'
import { createContext, Dispatch, SetStateAction } from 'react'

type StateContext<T> = [T, StateDispatch<T>]
export type StateDispatch<T> = Dispatch<SetStateAction<T>>

export const NetworkContext = createContext<{
  networkContext: StateContext<Network>
}>(null as any)

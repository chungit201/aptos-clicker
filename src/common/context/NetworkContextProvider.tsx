'use client'
import { Network } from 'aptos'
import { PropsWithChildren, useState } from 'react'

import { getData } from '@/common/hooks/useLocalstorage'

import { NetworkContext } from '.'

const NetworkContextProvider = ({ children }: PropsWithChildren) => {
  const networkContext = useState<Network>((getData('network') as Network) ?? Network.MAINNET)

  return <NetworkContext.Provider value={{ networkContext }}>{children}</NetworkContext.Provider>
}

export default NetworkContextProvider

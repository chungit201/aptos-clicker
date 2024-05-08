import React, { ReactNode } from 'react'

import { HeaderPage } from '@/common/components/Header'

export const LayoutPage: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <HeaderPage />
      {children}
    </>
  )
}

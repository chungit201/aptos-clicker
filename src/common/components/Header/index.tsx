import { Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
const { Header } = Layout
import { default as classNames, default as cx } from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { routes } from '@/common/components/Header/routers'

import styles from './Header.module.scss'

export const HeaderPage: React.FunctionComponent = () => {
  const [pageName, setPageName] = useState('')
  const router = useRouter()

  useEffect(() => {
    setPageName(router.pathname.replace('/', ''))
  }, [router])

  return (
    <Header className="z-20 w-full flex items-center pb-0 bg-transparent h-[60px]  sm:h-[75px] px-0 mobile:py-2 ">
      <div className="md:container max-w-[1536px] md:mx-auto w-full px-4 lg:px-8">
        <div className="mx-auto h-full w-full top-0 left-0 flex items-center justify-between relative">
          <div className={classNames('left-0 top-0 flex items-center relative')}>
            <Link href="" target="_blank" className={classNames('h-full flex items-center justify-center')}>
              <div className="flex items-center gap-2 relative">
                <Image
                  className="w-[60px] h-auto hidden sm:block"
                  src={require('@/common/assets/images/logo.png')}
                  alt=""
                />
              </div>
            </Link>
          </div>
          <div className="grow items-center justify-start h-full hidden sm:block pl-16">
            <Menu
              theme="light"
              className={cx(
                styles.menu,
                ' justify-start h-[75px] items-center min-w-[200px] w-full !bg-transparent hidden sm:flex',
              )}
            >
              <Menu
                theme="light"
                className={cx(
                  styles.menu,
                  ' justify-start h-[75px] items-center min-w-[200px] w-full !bg-transparent hidden sm:flex',
                )}
              >
                {routes.map(({ name, path }) => {
                  return (
                    <Menu.Item className={`${pageName === path && 'menu-active'} h-full mx-2 pr-2`} key={name}>
                      <Link
                        href={`/${path}` || '/'}
                        className="h6 font-medium text-[#fff] relative flex items-center h-full"
                        style={{ fontSize: '16px' }}
                      >
                        {name}
                      </Link>
                    </Menu.Item>
                  )
                })}
              </Menu>
            </Menu>
          </div>
          <div className=" h-full w-fit flex items-center gap-x-2"></div>
        </div>
      </div>
    </Header>
  )
}

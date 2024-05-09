import { useQuery } from '@tanstack/react-query'
import { notification, Progress, Typography } from 'antd'
import { AptosAccount, HexString } from 'aptos'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'

import { CLICKER_RESOURCE_ACCOUNT } from '@/common/consts'
import useClient from '@/common/hooks/useClient'
import useContract from '@/common/hooks/useContract'
import { getData } from '@/common/hooks/useLocalstorage'

const maxFoodAmount = 500

const Page: React.FunctionComponent = () => {
  const [sequenceNumber, setSequenceNumber] = useState('')
  const [totalPlays, setTotalPlays] = useState(0)
  const [totalFood, setTotalFood] = useState(0)
  const { view } = useContract()
  const { aptosClient } = useClient()
  const secretKey = useMemo(() => (getData('secretKey') ? JSON.parse(getData('secretKey') ?? '') : ''), [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (totalFood > 0) {
        setTotalFood(totalFood - 1)
      }
    }, 1000)

    //Clearing the interval
    return () => clearInterval(interval)
  }, [totalFood])

  useEffect(() => {
    ;(async () => {
      const account = new AptosAccount(new HexString(secretKey).toUint8Array())
      const genesisAccount = await aptosClient.getAccount(account.address())
      setSequenceNumber(genesisAccount.sequence_number)
    })()
  }, [])

  const { data: isRegister = false } = useQuery({
    queryKey: ['isRegister'],
    queryFn: async () => {
      const account = new AptosAccount(new HexString(secretKey).toUint8Array())
      const payload = {
        function: `${CLICKER_RESOURCE_ACCOUNT}::clickr::is_registered`,
        type_arguments: [],
        arguments: [account.address().toString()],
      }
      const res = await view(payload)
      return res[0]
    },
  })

  const {
    data: current_plays = 0,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['currentPlays'],
    queryFn: async () => {
      const account = new AptosAccount(new HexString(secretKey).toUint8Array())
      const payload = {
        function: `${CLICKER_RESOURCE_ACCOUNT}::clickr::current_plays`,
        type_arguments: [],
        arguments: [account.address().toString()],
      }
      const res = await view(payload)
      return Number(res[0])
    },
  })

  useEffect(() => {
    setTotalPlays(current_plays)
  }, [current_plays])

  const simulateTransaction = async (account: AptosAccount, rawTxn: any) => {
    const userTransactions = await aptosClient.simulateTransaction(account, rawTxn, {
      estimateGasUnitPrice: true,
      estimateMaxGasAmount: true,
      estimatePrioritizedGasUnitPrice: true,
    })
    const userTransaction = userTransactions[0]
    if (!userTransaction.success) {
      return false
    } else {
      return true
    }
  }

  const handleRegister = async () => {
    try {
      const account = new AptosAccount(new HexString(secretKey).toUint8Array())
      const rawTxn = await aptosClient.generateTransaction(account.address(), {
        function: `${CLICKER_RESOURCE_ACCOUNT}::clickr::register`,
        type_arguments: [],
        arguments: [],
      })
      const simulate = await simulateTransaction(account, rawTxn)
      if (!simulate) {
        return
      }
      const pendingTxn: any = await aptosClient.signAndSubmitTransaction(account, rawTxn)
      console.log('pendingTxn', pendingTxn)
      const rs: any = await aptosClient.waitForTransactionWithResult(pendingTxn)
      if (rs.success) {
        return true
      } else {
        return false
      }
    } catch (e: any) {
      throw e
    }
  }

  function pop(e: any) {
    const amount = 1
    if (e.clientX === 0 && e.clientY === 0) {
      const bbox = e.target.getBoundingClientRect()
      const x = bbox.left + bbox.width / 2
      const y = bbox.top + bbox.height / 2
      for (let i = 0; i < 30; i++) {
        createParticle(x, y, e.target.dataset.type)
      }
    } else {
      for (let i = 0; i < amount; i++) {
        createParticle(e.clientX, e.clientY + window.scrollY, 'mario')
      }
    }
  }

  function createParticle(x: number, y: number, type: string) {
    const particle = document.createElement('particle')
    document.body.appendChild(particle)
    const width = 30
    const height = width
    const destinationY = -300
    const rotation = 0
    const delay = 100
    const arr = ['/apple.png', '/banana.png', '/peach.png', '/watermelon.png', '/strawberry.png']
    const image = arr[Math.floor(Math.random() * arr.length)]
    particle.style.backgroundImage = `url(${image})`
    particle.style.width = `${width}px`
    particle.style.height = `${height}px`
    const animation = particle.animate(
      [
        {
          transform: `translateY(50%) translate(${x}px, ${y}px) rotate(0deg)`,
          opacity: 1,
        },
        {
          transform: `translateY(50%) translate(${x}px, ${y + destinationY}px) rotate(${rotation}deg)`,
          opacity: 0.5,
        },
      ],
      {
        duration: 500,
        easing: 'cubic-bezier(0, 1, .57, 1)',
        delay,
      },
    )
    animation.onfinish = removeParticle
  }

  function removeParticle(e: any) {
    e.srcElement.effect.target.remove()
  }

  const handleClick = async (e: any) => {
    setSequenceNumber(String(Number(sequenceNumber) + 1))
    try {
      if (!isRegister) {
        await handleRegister()
      }
      const account = new AptosAccount(new HexString(secretKey).toUint8Array())
      setTotalPlays(totalPlays + 1)
      setTotalFood(totalFood + 1)
      pop(e)
      const rawTxn = await aptosClient.generateTransaction(
        account.address(),
        {
          function: `${CLICKER_RESOURCE_ACCOUNT}::clickr::play`,
          type_arguments: [],
          arguments: [],
        },
        {
          sequence_number: sequenceNumber,
        },
      )
      const pendingTxn = await aptosClient.signAndSubmitTransaction(account, rawTxn)
      if (pendingTxn) {
        console.log('ok')
      }
    } catch (e: any) {
      console.log(e.message)
      notification.error({ message: <div className="max-h-[70px] overflow-y-auto"> {e.message}</div> })
    }
  }

  return (
    <div className="game-layout flex items-center justify-center">
      <div className="min-w-[350px] space-y-20 md:space-y-32">
        <div className="flex justify-center items-center gap-3">
          <div>
            <Image className="w-[25px]" src={require('@/common/assets/images/coin.png')} alt="" />
          </div>
          <Typography className="font-bold text-4xl text-[#fff] font-pacifico">{totalPlays}</Typography>
        </div>
        <div className="flex justify-center mt-10">
          <Image
            onClick={handleClick}
            id="monkey"
            className="w-[180px] cursor-pointer "
            src={require('@/common/assets/images/monkey.png')}
            alt=""
          />
        </div>
        <div className="flex items-center gap-2 mt-10">
          <span className="text-yellow-300 text-lg">{totalFood}</span>
          <Progress
            className=""
            percent={(totalFood / maxFoodAmount) * 100}
            trailColor="#101119"
            showInfo={false}
            status="active"
            strokeColor={{
              '0%': '#00ff2e',
              '100%': '#fcfc07',
            }}
            strokeWidth={14}
          />
        </div>
        <span className="preloader"></span>
      </div>
    </div>
  )
}
export default Page

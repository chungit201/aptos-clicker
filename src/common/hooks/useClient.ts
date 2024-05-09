import { AptosClient, CoinClient, FungibleAssetClient, IndexerClient, Network, Provider } from 'aptos'
import { useMemo } from 'react'

import { ENV, envNane } from '@/common/consts'
import {
  // DEVNET_NODE_URL,
  MAINNET_INDEXER_URL,
  MAINNET_NODE_URL,
  TESTNET_INDEXER_URL,
  TESTNET_NODE_URL,
} from '@/config/aptosConstants'

const useClient = () => {
  const { aptosClient } = useMemo(() => {
    return {
      aptosClient: ENV === envNane.TESTNET ? new AptosClient(TESTNET_NODE_URL) : new AptosClient(MAINNET_NODE_URL),
    }
  }, [])

  const provider = new Provider(ENV === envNane.TESTNET ? Network.TESTNET : Network.MAINNET)
  const coinClient = new CoinClient(provider)
  const fungibleAsset = new FungibleAssetClient(provider)
  const indexerClient = new IndexerClient(ENV === envNane.TESTNET ? TESTNET_INDEXER_URL : MAINNET_INDEXER_URL)
  return { coinClient, aptosClient, fungibleAsset, provider, indexerClient }
}

export default useClient

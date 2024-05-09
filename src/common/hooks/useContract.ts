import useClient from '@/common/hooks/useClient'

interface ViewRequests {
  function: string
  type_arguments: any[]
  arguments: any[]
}

const useContract = () => {
  const { provider } = useClient()

  const view = async (payload: ViewRequests) => {
    return await provider.view(payload)
  }

  return { view }
}

export default useContract

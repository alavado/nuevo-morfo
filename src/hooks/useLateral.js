import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { mostrarNavegacion } from '../redux/actions'

function useLateral() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mostrarNavegacion())
  }, [dispatch])

}

export default useLateral
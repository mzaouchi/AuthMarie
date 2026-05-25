import {useSelector} from "react-redux"
import Alert from 'react-bootstrap/Alert';

const DisplayErrors = () => {

    const errorsDisplay = useSelector(state=> state.ErrorsReducer)
  return (
    <div>
        {
            errorsDisplay.map((el,i,t)=>
             <Alert variant='danger'>
                {el.msg}
        </Alert>
            )
        }
    </div>
  )
}

export default DisplayErrors
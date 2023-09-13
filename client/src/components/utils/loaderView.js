
import { CubeSpinner,FireworkSpinner} from "react-spinners-kit";

const LoaderView=()=>{
    return(<div className="loadingcontainer" style={{height:`${window.innerHeight}px`}}>
  <FireworkSpinner size={30} color="blue"/>

    </div>)
}


export default LoaderView
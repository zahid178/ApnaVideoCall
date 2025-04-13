import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
   const AutoComponent = (props) => {
    const router = useNavigate();

    const isAuthenticated = () => {
        if(localStorage.getItem("token")) {
            return true;
        }
        return false;
    }
    useEffect(() => {
        if(!isAuthenticated()) {
            router("/auth")
        }
    }, [])
    return <WrappedComponent {...props} />
   }
   return AutoComponent;
}

export default withAuth;
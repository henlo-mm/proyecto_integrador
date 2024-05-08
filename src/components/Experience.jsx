import RoutesDeadGame from "./routes/RoutesDeadGame";
import { AvatarProvider } from "./context/AvatarContext";
import { AuthProvider } from "./context/AuthContext";


const Experience = () => {

    return (
        <>  <AuthProvider>
                 <AvatarProvider>
                      <RoutesDeadGame />
                </AvatarProvider>
            </AuthProvider>
        </>

    )
}

export default Experience;
import RoutesDeadGame from "./routes/RoutesDeadGame";
import { AvatarProvider } from "./context/AvatarContext";


const Experience = () => {

    return (
        <>
            <AvatarProvider>
                <RoutesDeadGame />
            </AvatarProvider>
        </>

    )
}

export default Experience;
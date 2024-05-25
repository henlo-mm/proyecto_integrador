import "../../styles/login.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import introSong from '../../sounds/deadpool_game_sound.mp3';
import Music from "../../music/Music";
import MusicControls from "../../music/MusicControls";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();

    const onHandleButtonLogin = async () => {
        await auth.loginWithGoogle()
            .then((res) => navigate('/profile'))
            .catch((error) => console.error(error));
    };

    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const handleMuteToggle = () => setIsMuted(!isMuted);
    const handleVolumeChange = (e) => setVolume(e.target.value);

    return (
        <div className="login-container">
            <div className="title-dead-game">
                DevPool y Codeverine: En Busca de la Regeneración Perdida
            </div>
            <h1 className="login-title">Haz clic en el siguiente botón para iniciar sesión</h1>
            <div onClick={onHandleButtonLogin}>
                <button className="login-button">INGRESAR</button>
            </div>
            <Music
                track={introSong}
                volume={volume}
                isMuted={isMuted}
                autoPlay={true}
                onPlay={() => setIsPlaying(true)} 
                onStop={() => setIsPlaying(false)} 
            />
            <MusicControls
                onMuteToggle={handleMuteToggle}
                volume={volume}
                onVolumeChange={handleVolumeChange}
                isMuted={isMuted}
                isPlaying={isPlaying}
            />
        </div>
    );
}

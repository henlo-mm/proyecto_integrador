import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import "../styles/control.css";

function MusicControls({ onMuteToggle, volume, onVolumeChange, isMuted, isPlaying }) {
    return (
        <div className="controls">
            <button onClick={onMuteToggle} className="mute-button">
                {isPlaying ? (isMuted ? <FaVolumeMute /> : <FaVolumeUp />) : <FaVolumeMute />}
            </button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={onVolumeChange}
                disabled={isMuted}
            />
        </div>
    );
}

export default MusicControls;

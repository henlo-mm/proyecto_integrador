import { useEffect, useState } from 'react';
import { AudioLoader, AudioListener, Audio } from 'three';

function Music({ track, volume, isMuted, autoPlay, onPlay, onStop }) {
    const [listener] = useState(() => new AudioListener());
    const [audio] = useState(() => new Audio(listener));
    const [buffer, setBuffer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loader = new AudioLoader();
        loader.load(
            track,
            (loadedBuffer) => {
                setBuffer(loadedBuffer);
                if (autoPlay && !isMuted) {
                    audio.setBuffer(loadedBuffer);
                    audio.setLoop(true);
                    audio.setVolume(volume);
                    try {
                        audio.play();
                        onPlay && onPlay();
                        console.log('Audio started successfully.');
                    } catch (err) {
                        console.error("Error trying to play audio automatically:", err);
                    }
                }
            },
            undefined,
            (err) => {
                setError(`Error loading audio file: ${err.message}`);
            }
        );

        return () => {
            if (audio.isPlaying) {
                audio.stop();
                onStop && onStop();
                console.log('Audio stopped.');
            }
        };
    }, [track, autoPlay, isMuted, audio, volume, onPlay, onStop]);

    useEffect(() => {
        if (buffer) {
            audio.setBuffer(buffer);
            audio.setLoop(true);

            if (!isMuted) {
                audio.setVolume(volume);
                try {
                    audio.play();
                    onPlay && onPlay();
                    console.log('Audio started successfully.');
                } catch (err) {
                    console.error("Error trying to play audio automatically:", err);
                }
            } else {
                audio.stop();
                onStop && onStop();
            }
        }
    }, [buffer, audio, volume, isMuted, onPlay, onStop]);

    return error ? <div>{error}</div> : null;
}

export default Music;

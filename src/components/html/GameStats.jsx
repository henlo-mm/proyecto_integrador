

import '../styles/gameHud.css';

export default function GameStats() {

  return (
    <div className="hud">
      <div className="bottomLeft">
        <div>
          <h3 className="score__title">JUGADOR: </h3>
          <h3 className="score__title">NIVEL: </h3>
          <h3 className="score__title">PUNTUACIÓN: </h3>
          <h3 className="score__title">VIDAS: </h3>
        </div>
      </div>
    </div>
  ) 
}
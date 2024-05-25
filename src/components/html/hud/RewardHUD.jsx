import '../../styles/rewardHud.css';
export function RewardHUD({ healthCount}) {
    const rewardIcon = "/assets/icons/estrella.png";

    return (
        <div className="reward-hud">
            <img src={rewardIcon} alt="Reward Icon" className="reward-icon" />
            <div className="reward-count">
                <span className="count-label">x</span>
                <span className="count-value">{healthCount}</span>
            </div>
        </div>
    );
}

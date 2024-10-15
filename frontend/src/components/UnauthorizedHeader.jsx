import '../assets/CSS/Header.css';

const UnauthorizedHeader = () => {
    return (
        <div className="header">
            <div className="left-section">
                <img
                    src="https://cdn2.iconfinder.com/data/icons/smarthome-filloutline/64/bin-smarthome-home-electronics-electronics-wifi-512.png"
                    alt="Logo"
                    className="logo"
                />
                <h1 className="header-title">Welcome to Smart Bin</h1> {/* Added heading */}
            </div>
        </div>
    );
};

export default UnauthorizedHeader;

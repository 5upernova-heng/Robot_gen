function TopBar() {
    return (
        <div className="d-flex border-bottom justify-content-between align-items-center px-3"
             style={{height: "5rem"}}
        >
            <div className="d-flex justify-content-evenly align-items-center gap-3">
                <img
                    style={{
                        width: "3rem",
                        height: "3rem",
                    }}
                    src="public/electron-vite.animate.svg"
                    alt="Logo"
                    className="d-inline-block"
                />
                <p className="fw-bold fs-2 mb-0">Robot Generator</p>
            </div>
        </div>
    )
}

export default TopBar;

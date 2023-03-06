export const CircularLoader = ({ size }) => {
    const strokeWidth = 5; // set the width of the stroke for the progress bar
    const radius = (size - strokeWidth) / 2; // calculate the radius of the progress bar
    const circumference = 2 * Math.PI * radius; // calculate the circumference of the progress bar

    return (
        <div style={{ position: 'relative', width: size, height: size, margin: "0px auto" }}>
            <svg viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    stroke="#fff"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    stroke="#00ff2288"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={circumference}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from={circumference}
                        to="0"
                        dur="2s"
                        fill="freeze"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    );
}
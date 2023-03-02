export const InputWithLabel = ({ label, type = "text", fullwidth = false, children }) => {
    return (
        <div className={`inputWithLabel ${fullwidth && "fullwidth"}`}>
            <label htmlFor={`${label}Value ${fullwidth && "fullwidth"}`}>{label}</label>
            <input className={`outlinedInput ${fullwidth && " fullwidth"}`} id={`${label}Value`} type={type} />
            {children}
        </div>
    )
}
export const InputWithLabel = ({ label, type = "text", fullwidth = false, children, value, setValue }) => {
    return (
        <div className={`inputWithLabel ${fullwidth && "fullwidth"}`}>
            <label htmlFor={`${label}Value ${fullwidth && "fullwidth"}`}>{label}</label>
            <input className={`outlinedInput ${fullwidth && " fullwidth"}`} id={`${label}Value`} type={type} value={value} onChange={e => setValue(e.target.value)} />
            {children}
        </div>
    )
}
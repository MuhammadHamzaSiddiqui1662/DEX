export const InputWithLabel = ({ label, type = "text", fullwidth = false, children, value, setValue, placeholder }) => {
    return (
        <div className={`inputWithLabel ${fullwidth && "fullwidth"}`}>
            <label htmlFor={`${label}Value ${fullwidth && "fullwidth"}`}>{label}</label>
            <input
                id={`${label}Value`}
                className={`outlinedInput ${fullwidth && " fullwidth"}`}
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
            />
            {children}
        </div>
    )
}
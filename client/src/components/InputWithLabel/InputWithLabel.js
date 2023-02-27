export const InputWithLabel = ({ label, type = "text" }) => {
    return (
        <div className="inputWithLabel">
            <label htmlFor={`${label}Value`}>{label}</label>
            <input className="outlinedInput" id={`${label}Value`} type={type} />
        </div>
    )
}
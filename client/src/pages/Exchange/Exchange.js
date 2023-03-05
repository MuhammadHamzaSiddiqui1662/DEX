import { ExchangeCard } from "../../components/ExchangeCard/ExchangeCard"
import { Market } from "../../components/Market/Market"

export const Exchange = () => {
    return (
        <div className="exchange">
            <ExchangeCard />
            <Market />
        </div>
    )
}
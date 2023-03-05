import { ExchangeCard } from "../../components/ExchangeCard/ExchangeCard"
import { Market } from "../../components/Market/Market"
import './Exchange.css';

export const Exchange = () => {
    return (
        <div className="exchange">
            <ExchangeCard />
            <Market />
        </div>
    )
}
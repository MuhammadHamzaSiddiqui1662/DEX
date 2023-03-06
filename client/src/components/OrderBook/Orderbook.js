import { useOrderBook } from '../../hooks/useOrders'
import './OrderBook.css'
export const OrdersBook = () => {
    useOrderBook();
    return (
        <div className="ordersBook"></div>
    )
}
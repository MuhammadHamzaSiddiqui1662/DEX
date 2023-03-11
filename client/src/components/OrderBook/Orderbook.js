import { useOrderBook } from '../../hooks/useOrders'
import { SelectToken } from '../SelectToken/SelectToken';
import './OrderBook.css';
export const OrderBook = () => {
    const { buyOrders, TOKENS, selectedToken, handleTokenChange } = useOrderBook();
    return (
        <div className="ordersBook">
            <div className='bookHeader'>
                <div className='titleSection'>
                    <h1>{selectedToken.symbol}<span className='fullname'>({selectedToken.name})</span></h1>
                    <div>
                        <span>Change Token </span>
                        <SelectToken tokens={TOKENS} selectedToken={selectedToken} handleTokenChange={handleTokenChange} />
                    </div>
                </div>
                <p className='tokenAddress'>{selectedToken.address}</p>
            </div>
        </div>
    )
}
import { useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, Label, XAxis, YAxis, Tooltip } from 'recharts';
import { useMarket } from '../../hooks/useMarket';
import './Market.css';

const data = [
    { timeStamp: '10:12:23', price: 7, pv: 2400, amt: 2400 },
    { timeStamp: '11:32:33', price: 10, pv: 2400, amt: 2400 },
    { timeStamp: '12:12:23', price: 8, pv: 2400, amt: 2400 },
    { timeStamp: '18:12:23', price: 9, pv: 2400, amt: 2400 },
    { timeStamp: '19:12:23', price: 3, pv: 2400, amt: 2400 },
    { timeStamp: '22:12:23', price: 10, pv: 2400, amt: 2400 },
    { timeStamp: '10:12:23', price: 7, pv: 2400, amt: 2400 },
    { timeStamp: '11:32:33', price: 10, pv: 2400, amt: 2400 },
    { timeStamp: '12:12:23', price: 2, pv: 2400, amt: 2400 },
    { timeStamp: '18:12:23', price: 9, pv: 2400, amt: 2400 },
    { timeStamp: '19:12:23', price: 6, pv: 2400, amt: 2400 },
    { timeStamp: '22:12:23', price: 10, pv: 2400, amt: 2400 },
    { timeStamp: '10:12:23', price: 7, pv: 2400, amt: 2400 },
    { timeStamp: '11:32:33', price: 12, pv: 2400, amt: 2400 },
    { timeStamp: '12:12:23', price: 8, pv: 2400, amt: 2400 },
    { timeStamp: '18:12:23', price: 9, pv: 2400, amt: 2400 },
    { timeStamp: '19:12:23', price: 6, pv: 2400, amt: 2400 },
    { timeStamp: '22:12:23', price: 10, pv: 2400, amt: 2400 },
];

const contentStyle = {
    backgroundColor: "#121",
    borderColor: "#00ff2233"
}

export const Market = ({ tokens, selectedToken }) => {
    const { buyOrders, sellOrders, isLoading } = useMarket(tokens);
    useEffect(() => {
        console.log(buyOrders[selectedToken.symbol]);
    }, [selectedToken])
    return (
        <div className="market">
            <div className='mainChart'>
                <ResponsiveContainer width={"100%"} height={380}>
                    <LineChart data={buyOrders[selectedToken.symbol]}>
                        <Line type="monotone" dataKey="price" stroke="#00ff22" />
                        <XAxis dataKey="date">
                            <Label value="Pages of my website" position="insideBottom" offset={0} />
                        </XAxis>
                        <YAxis>
                            <Label value="Pages of my website" angle={-90} offset={10} position="insideBottomLeft" />
                        </YAxis>
                        <Tooltip contentStyle={contentStyle} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='otherCharts'>
                <ResponsiveContainer width={"45%"} height={300}>
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="price" stroke="#00ff22" />
                        <XAxis dataKey="timeStamp">
                            <Label value="Pages of my website" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis>
                            <Label value="Pages of my website" angle={-90} offset={10} position="insideBottomLeft" />
                        </YAxis>
                        <Tooltip contentStyle={contentStyle} />
                    </LineChart>
                </ResponsiveContainer>
                <ResponsiveContainer width={"45%"} height={300}>
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="price" stroke="#00ff22" />
                        <XAxis dataKey="timeStamp">
                            <Label value="Pages of my website" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis>
                            <Label value="Pages of my website" angle={-90} offset={10} position="insideBottomLeft" />
                        </YAxis>
                        <Tooltip contentStyle={contentStyle} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
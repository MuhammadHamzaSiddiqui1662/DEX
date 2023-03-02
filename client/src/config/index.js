import { BAT_ADDRESS, DAI_ADDRESS, DEX_ADDRESS, REP_ADDRESS, ZRX_ADDRESS } from "./constants"
import { batAbi, daiAbi, dexAbi, repAbi, zrxAbi } from "../assets/abi";

export const DexContractConfig = {
    address: DEX_ADDRESS,
    abi: dexAbi,
}
export const DaiContractConfig = {
    address: DAI_ADDRESS,
    abi: daiAbi,
}
export const BatContractConfig = {
    address: BAT_ADDRESS,
    abi: batAbi,
}
export const RepContractConfig = {
    address: REP_ADDRESS,
    abi: repAbi,
}
export const ZrxContractConfig = {
    address: ZRX_ADDRESS,
    abi: zrxAbi,
}
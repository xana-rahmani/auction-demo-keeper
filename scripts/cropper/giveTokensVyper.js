import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey = "0xXXX";

let wallet = new ethers.Wallet(privateKey)
let walletSigner = wallet.connect(provider)

const steCrvAddr = "0x06325440D014e39736583c165C2963BA99fAf14E"
const steCrvAbi = [{"name":"Transfer","inputs":[{"type":"address","name":"_from","indexed":true},{"type":"address","name":"_to","indexed":true},{"type":"uint256","name":"_value","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"type":"address","name":"_owner","indexed":true},{"type":"address","name":"_spender","indexed":true},{"type":"uint256","name":"_value","indexed":false}],"anonymous":false,"type":"event"},{"outputs":[],"inputs":[{"type":"string","name":"_name"},{"type":"string","name":"_symbol"}],"stateMutability":"nonpayable","type":"constructor"},{"name":"decimals","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":261},{"name":"transfer","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"_to"},{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":74713},{"name":"transferFrom","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"_from"},{"type":"address","name":"_to"},{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":111355},{"name":"approve","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"_spender"},{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":37794},{"name":"increaseAllowance","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"_spender"},{"type":"uint256","name":"_added_value"}],"stateMutability":"nonpayable","type":"function","gas":39038},{"name":"decreaseAllowance","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"_spender"},{"type":"uint256","name":"_subtracted_value"}],"stateMutability":"nonpayable","type":"function","gas":39062},{"name":"mint","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"_to"},{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":75652},{"name":"burnFrom","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"_to"},{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":75670},{"name":"set_minter","outputs":[],"inputs":[{"type":"address","name":"_minter"}],"stateMutability":"nonpayable","type":"function","gas":36458},{"name":"set_name","outputs":[],"inputs":[{"type":"string","name":"_name"},{"type":"string","name":"_symbol"}],"stateMutability":"nonpayable","type":"function","gas":178219},{"name":"name","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":7763},{"name":"symbol","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":6816},{"name":"balanceOf","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":1636},{"name":"allowance","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"},{"type":"address","name":"arg1"}],"stateMutability":"view","type":"function","gas":1881},{"name":"totalSupply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1481},{"name":"minter","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1511}]
const steCrv = new ethers.Contract(steCrvAddr, steCrvAbi, walletSigner);

const giveTokensVyper = async (amount, to) => {

    const slot = ethers.utils.solidityKeccak256(
        ["uint256", "uint256"],
        [2, to] // slot, key
    )
    const amountBytes32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(amount), 32)
    await provider.send("hardhat_setStorageAt", [steCrvAddr, slot, amountBytes32]);
};

const amount = ethers.utils.parseEther("25")
const to = "0xda0c0de01d90a5933692edf03c7ce946c7c50445"
giveTokensVyper(amount, to)


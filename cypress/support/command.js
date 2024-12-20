const cypress = require("cypress");
const { ethers } = require("hardhat")


Cypress.Commands.add('connectWallet', () => {
    return Cypress.Promise.resolve().then(async () => {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return true;
        } else {
            throw new Error('Metamask is not installed');
        }
    });
});

Cypress.Commands.add('deployContract', (contractABI, contractByteCode) => {
    return Cypress.Promise.resolve().then(async () => {
        const [signer] = await ethers.getSigners();
        const factory = new ethers.ContractFactory(contractABI, contractByteCode, signer);
        const contract = await factory.deploy();
        await contract.deployed();
        return contract;
    });
});

Cypress.Commands.add('callContractFunction', (contractAddress, contractABI, functionName, ...args) => {
    console.log('Custom command called with:', { contractAddress, contractABI, functionName, args });
    return Cypress.Promise.resolve().then(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract[functionName](...args);
        await tx.wait();
        return tx;
    });
});
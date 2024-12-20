describe('Test MyContract Smart Contract', () => {
    const contractABI = [
        {
            "input": [],
            "name": "greet",
            "outputs": [{ "internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "pure",
            "type": "function"
        },
    ];
    // const contractBytecode = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // before(() => {
    //     cy.connectWallet();

    //     cy.deployContract(contractABI, contractBytecode).then((contract) => {
    //         contractAddress = contract.address;
    //     });
    // });

    it('should return "Hello, World!" from greet function', () => {
        cy.callContractFunction(contractAddress, contractABI, 'greet')
        .then((result) => {
            expect(result).to.equal('Hello, World!');
        });
    });
});
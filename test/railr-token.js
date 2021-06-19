const RailrToken = artifacts.require("RailrToken");

contract("RailrToken", (accounts) => {
    it("should have the symbol RAILR", async () => {
        const instance = await RailrToken.deployed();

        const symbol = await instance.symbol();

        assert.equal(symbol, "RAILR5", "token symbol");
    });

    it("should have the Railroad Token name", async () => {
        const instance = await RailrToken.deployed();

        const name = await instance.name();

        assert.equal(name, "Railroad Token", "name");
    });

    it("should have an initial total supply of 10B tokens", async () => {
        const instance = await RailrToken.deployed();

        const totalSupply = await instance.totalSupply();

        assert.equal(
            totalSupply.toString(),
            "10000000000" + "000000000",
            "total supply",
        );
    });
});

const RailrToken = artifacts.require("RailrToken");

contract("RailrToken", (accounts) => {
    it("should have the token symbol RAILR", async () => {
        const instance = await RailrToken.deployed();

        const symbol = await instance.symbol();

        assert.equal(symbol, "RAILR5", "token symbol");
    });

    it("should have the Railroad Token name", async () => {
        const instance = await RailrToken.deployed();

        const name = await instance.name();

        assert.equal(name, "Railroad Token", "token name");
    });
});

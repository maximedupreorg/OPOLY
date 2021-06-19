const RailrToken = artifacts.require("RailrToken");

contract("RailrToken", (accounts) => {
    it("should have the Railroad Token name", async () => {
        const instance = await RailrToken.deployed();

        const name = await instance.name();

        assert.equal(name, "Railroad Token", "token name");
    });
});

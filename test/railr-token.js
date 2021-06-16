const RailrToken = artifacts.require("RailrToken");

contract("RailrToken", (accounts) => {
    it("should have the RailrToken name", async () => {
        const instance = await RailrToken.deployed();

        const name = await instance.name();

        assert.equal(name, "Railr Token", "token name");
    });
});

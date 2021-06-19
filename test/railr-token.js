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

    it("should have an initial 10% liquidity fee", async () => {
        const instance = await RailrToken.deployed();

        const liquidityFee = await instance._liquidityFee();

        assert.equal(liquidityFee.toString(), "10", "liquidity fee");
    });

    it("should have an initial 10% tax fee", async () => {
        const instance = await RailrToken.deployed();

        const taxFee = await instance._taxFee();

        assert.equal(taxFee.toString(), "10", "tax fee");
    });

    it("should exclude the contract address from fee by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            instance.address,
        );

        assert.equal(isExcludedFromFee, true);
    });

    it("should exclude the owner (deployment) address from fee by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(accounts[0]);

        assert.equal(isExcludedFromFee, true);
    });

    it("should exclude the treasury address from fee by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            process.env.TREASURY_WALLET,
        );

        assert.equal(isExcludedFromFee, true);
    });

    it("should exclude the distribution address from fee by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            process.env.DISTRIBUTION_WALLET,
        );

        assert.equal(isExcludedFromFee, true);
    });

    it("should exclude the team address from fee by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            process.env.TEAM_WALLET,
        );

        assert.equal(isExcludedFromFee, true);
    });
});

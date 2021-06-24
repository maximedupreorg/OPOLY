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

    it("should exclude ETH unicrypt address from fee by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            "0xDba68f07d1b7Ca219f78ae8582C213d975c25cAf",
        );

        assert.equal(isExcludedFromFee, true);
    });

    it("should exclude the contract address from rewards by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            instance.address,
        );

        assert.equal(isExcludedFromFee, true);
    });

    it("should exclude the owner (deployment) address from rewards by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromReward = await instance.isExcludedFromReward(
            accounts[0],
        );

        assert.equal(isExcludedFromReward, true);
    });

    it("should exclude the treasury address from rewards by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromReward = await instance.isExcludedFromReward(
            process.env.TREASURY_WALLET,
        );

        assert.equal(isExcludedFromReward, true);
    });

    it("should exclude the distribution address from rewards by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromReward = await instance.isExcludedFromReward(
            process.env.DISTRIBUTION_WALLET,
        );

        assert.equal(isExcludedFromReward, true);
    });

    it("should exclude the team address from rewards by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromReward = await instance.isExcludedFromReward(
            process.env.TEAM_WALLET,
        );

        assert.equal(isExcludedFromReward, true);
    });

    it("should exclude ETH unicrypt address from rewards by default", async () => {
        const instance = await RailrToken.deployed();

        const isExcludedFromReward = await instance.isExcludedFromReward(
            "0xDba68f07d1b7Ca219f78ae8582C213d975c25cAf",
        );

        assert.equal(isExcludedFromReward, true);
    });

    it("should not be able to set a max transaction percentage equal to 0", async () => {
        let failed = false;

        const instance = await RailrToken.deployed();

        try {
            await instance.setMaxTxPercent(0);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it("should not be able to set a max transaction percentage to -1", async () => {
        let failed = false;

        const instance = await RailrToken.deployed();

        try {
            await instance.setMaxTxPercent(-1);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it("should not be able to set a tax fee greater than 10", async () => {
        let failed = false;

        const instance = await RailrToken.deployed();

        try {
            await instance.setTaxFeePercent(11);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it("should not be able to set a liquidity fee greater than 10", async () => {
        let failed = false;

        const instance = await RailrToken.deployed();

        try {
            await instance.setLiquidityFeePercent(11);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it("should transfer the fees to the treasury wallet on transfers between 2 holders", async () => {
        const instance = await RailrToken.deployed();

        const oneBillion = "1000000000000000000";
        const fiveHundredMillions = "500000000000000000";

        await instance.transfer(accounts[1], oneBillion);

        await instance.transfer(accounts[2], fiveHundredMillions, {
            from: accounts[1],
        });

        const firstAccountBalance = await instance.balanceOf(accounts[0]);

        const secondAccountBalance = await instance.balanceOf(accounts[1]);

        const thirdAccountBalance = await instance.balanceOf(accounts[2]);

        const treasuryAccountBalance = await instance.balanceOf(
            process.env.TREASURY_WALLET,
        );

        const nineBillions = "9000000000000000000";
        const fourHundredMillions = "400000000000000000";
        const fiftyMillions = "50000000000000000";

        assert.equal(
            firstAccountBalance.toString(),
            nineBillions,
            "first account balance",
        );

        assert.equal(
            secondAccountBalance.toString(),
            fiveHundredMillions,
            "second account balance",
        );

        assert.equal(
            thirdAccountBalance.toString(),
            fourHundredMillions,
            "third account balance",
        );

        assert.equal(
            treasuryAccountBalance.toString(),
            fiftyMillions,
            "treasury account balance",
        );
    });

    it("should be able to do a reflective airdrop to all non excluded wallets");
    it(
        "should not have a non reflective fee on transfers (transfers should not affect non-participants)",
    );
});

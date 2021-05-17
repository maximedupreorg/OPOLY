const RailrToken = artifacts.require('RailrToken');

contract('RailrToken', (accounts) => {
    it('should have the RAILR symbol', async () => {
        const instance = await RailrToken.new();

        const symbol = await instance.symbol();

        assert.equal(symbol, 'RAILR', 'token symbol');
    });

    it('should have the RailrToken name', async () => {
        const instance = await RailrToken.new();

        const name = await instance.name();

        assert.equal(name, 'RailrToken', 'token name');
    });
});

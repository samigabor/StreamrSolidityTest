import { expect, use } from 'chai'
import { deployContract, MockProvider, solidity } from 'ethereum-waffle'
import { Contract } from 'ethers'

import PermissionRegistry from '../build/PermissionRegistry.json'

use(solidity)

describe('PermissionRegistry', (): void => { 
    //10 test wallets
    const wallets = new MockProvider().getWallets()
    let registry: Contract

    beforeEach(async (): Promise<void> => {
        registry = await deployContract(wallets[0], PermissionRegistry)
    })

    it('createItem()', async (): Promise<void> => {
        // createItem() by wallet 0
        await registry.createItem('item1', 'desc item1');

        // grantPermissions()
        // wallet 0 grants view/edit permission for wallet 1
        await registry.grantPermissions('item1', wallets[1], [1,1,0]);

        // editItem()
        // wallet 0 edits item description
        await registry.editItem('item1', 'desc item1 modified by wallet 1');

        // hasPermission()
        // wallet 1 has permission 0 - view
        expect(await registry.hasPermission('item1', wallets[1], 0)).to.equal(true);
        // wallet 1 has permission 1 - edit
        expect(await registry.hasPermission('item1', wallets[1], 1)).to.equal(true);
        // wallet 1 has permission 2 - grant
        expect(await registry.hasPermission('item1', wallets[1], 2)).to.equal(false);

        // getPermissions()
        // wallet 0 has permissions view/edit/grant 
        expect(await registry.getPermissions('item1', wallets[0])).to.equal([1,1,1]);
        // wallet 1 has view/edit permissions
        expect(await registry.getPermissions('item1', wallets[1])).to.equal([1,1,0]);
    });
})

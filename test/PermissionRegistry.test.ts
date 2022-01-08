import { expect, use } from 'chai'
import { deployContract, MockProvider, solidity } from 'ethereum-waffle'
 
import PermissionRegistry from '../build/PermissionRegistry.json'
 
use(solidity)
 
describe('PermissionRegistry', (): void => {
    //10 test wallets
    const wallets = new MockProvider().getWallets()
    const registryPromise = deployContract(wallets[0], PermissionRegistry)
 
    describe('createItem()', (): void => {
        it('adds item with id and description', async (): Promise<void> => {
            const registry = await registryPromise;
            await registry.createItem('item1', 'desc item1');
            expect(await registry.getItemDescription('item1')).to.equal('desc item1');
        });
 
        it('adds all permissions for newly created items', async (): Promise<void> => {
            const registry = await registryPromise;
            await registry.createItem('item2', 'desc item2');
            expect(await registry.getPermissions('item2', wallets[0].address)).to.eql([true, true, true]);
        });
    });
 
    describe('hasPermission()', (): void => {
        it('updates item description', async (): Promise<void> => {
            const registry = await registryPromise;
            await registry.createItem('item5', 'desc item5');
            expect(await registry.hasPermission('item5', wallets[0].address, 0)).to.equal(true);
        });
    });
 
    describe('getPermissions()', (): void => {
        it('returns item permissions', async (): Promise<void> => {
            const registry = await registryPromise;
            await registry.createItem('item6', 'desc item6');
            expect(await registry.getPermissions('item6', wallets[0].address)).to.eql([true, true, true]);
        });
    });
 
    describe('editItem()', (): void => {
        it('updates item description', async (): Promise<void> => {
            const registry = await registryPromise;
            await registry.createItem('item4', 'desc item4');
            expect(await registry.getItemDescription('item4')).to.equal('desc item4');
            console.log('before update')
            await registry.editItem('item4', 'desc item4 updated');
            expect(await registry.getItemDescription('item4')).to.equal('desc item4 updated');
            console.log('after update', await registry.getItemDescription('item4'))
        });
    });
 
    describe('grantPermissions()', (): void => {
        it('updates "view" permission to true', async (): Promise<void> => {
            const registry = await registryPromise;
            await registry.createItem('item3', 'desc item3');
            await registry.grantPermissions('item3', wallets[1].address, [true, true, false]);
        });
    });
})
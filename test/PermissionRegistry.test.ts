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

    //TODO add tests below:
    it('some test', async (): Promise<void> => {
    })
})

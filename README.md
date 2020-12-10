# Solidity puzzle: PermissionRegistry

## Getting started

* [Install Node.js](https://nodejs.org/en/download/), perhaps [via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
  * `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`
  * `nvm install 14`
* Clone this repository
  * `git clone git@github.com:streamr-dev/puzzle-registry.git`
* Install dependencies
  * `npm ci`
* Run tests to see that the setup works
  * `npm run test`
  
## Problem statement

Implement the smart contract specified here and a test for it

### PermissionRegistry

The PermissionRegistry is a smart contract for keeping track of Items, and Permissions associated with each Item. A Permission applies to a particular address, and grants the address the permission to perform a particular action.

Permissions include:
* view
* edit
* grant

The modeled Items have two properties:
* id (a unique string that identifies the item)
* description (a string)

Users are identified by address.

### Methods needed

#### createItem(id, description)
* Creates as new Item with the specified id and grants msg.sender all permissions to it

#### grantPermissions(id, user, [what permissions to grant])
* Requires msg.sender to have the grant permission
* Grants the given permissions on the Item specified by id to the given user. What permissions to grant should be passed as argument (how those permissions are passed is up to you)

#### editItem(id, description)
* Requires msg.sender to have the edit permission on the Item specified by id
* Sets the description of the Item specified by id to the given description

#### hasPermission(id, user, [a permission])
* Read-only
* Returns true if the given user has the given permission on the Item specified by id

#### getPermissions(id, user)
* Read-only
* Returns the set of permissions that the given user has to id



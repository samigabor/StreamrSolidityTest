// SPDX-License-Identifier: MIT

pragma solidity 0.6.2;

struct Permissions {
    bool toView;
    bool toEdit;
    bool toGrant;
}

contract PermissionRegistry {
    modifier canEdit(string memory _id) {
        require(
            itemPermissions[_id][msg.sender].toEdit,
            "Must have 'Edit' permission."
        );
        _;
    }

    modifier canGrant(string memory _id) {
        require(
            itemPermissions[_id][msg.sender].toGrant,
            "Must have 'Grant' permission."
        );
        _;
    }

    mapping(string => string) private items;

    mapping(string => mapping(address => Permissions)) private itemPermissions;

    function createItem(string calldata _id, string calldata _description)
        external
    {
        items[_id] = _description;

        itemPermissions[_id][msg.sender].toView = true;
        itemPermissions[_id][msg.sender].toEdit = true;
        itemPermissions[_id][msg.sender].toGrant = true;
    }

    function grantPermissions(
        string calldata _id,
        address _for,
        bool[3] calldata permissions
    ) external canGrant(_id) {
        itemPermissions[_id][_for].toView = permissions[0];
        itemPermissions[_id][_for].toEdit = permissions[1];
        itemPermissions[_id][_for].toGrant = permissions[2];
    }

    function editItem(string calldata _id, string calldata _description)
        external
        canEdit(_id)
    {
        items[_id] = _description;
    }

    function hasPermission(
        string calldata _id,
        address _for,
        uint8 permission
    ) external view returns (bool) {
        if (permission == 0) {
            return itemPermissions[_id][_for].toView;
        }

        if (permission == 1) {
            return itemPermissions[_id][_for].toEdit;
        }

        if (permission == 2) {
            return itemPermissions[_id][_for].toGrant;
        }
    }

    function getPermissions(string calldata _id, address _for)
        external
        view
        returns (bool[3] memory)
    {
        bool[3] memory permissions;
        permissions[0] = itemPermissions[_id][_for].toView;
        permissions[1] = itemPermissions[_id][_for].toEdit;
        permissions[2] = itemPermissions[_id][_for].toGrant;
        return permissions;
    }
}

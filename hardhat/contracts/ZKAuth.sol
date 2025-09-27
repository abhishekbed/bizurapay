// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ZKAuth {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    struct BusinessProfile {
        address walletAddress;
        bool isVerify;
        string publicProof;
        bool isBlock;
    }

    mapping(address => BusinessProfile) private profiles;

    event DataStored(address indexed wallet, string proof);
    event Verified(address indexed wallet);
    event Blocked(address indexed wallet);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    function setData(string memory _publicProof) external {
        require(!profiles[msg.sender].isBlock, "Address is blocked");

        profiles[msg.sender] = BusinessProfile({
            walletAddress: msg.sender,
            isVerify: false,
            publicProof: _publicProof,
            isBlock: false
        });

        emit DataStored(msg.sender, _publicProof);
    }

    function setVerifyData(address _wallet) external onlyAdmin {
        require(!profiles[_wallet].isBlock, "Address is blocked");
        profiles[_wallet].isVerify = true;

        emit Verified(_wallet);
    }

    function getData(
        address _wallet
    )
        external
        view
        returns (
            address walletAddress,
            bool isVerify,
            string memory publicProof,
            bool isBlock
        )
    {
        BusinessProfile memory profile = profiles[_wallet];
        return (
            profile.walletAddress,
            profile.isVerify,
            profile.publicProof,
            profile.isBlock
        );
    }

    function addBlockAddress(address _wallet) external onlyAdmin {
        profiles[_wallet].isBlock = true;

        emit Blocked(_wallet);
    }

    function changeAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "Invalid new admin");
        address oldAdmin = admin;
        admin = _newAdmin;

        emit AdminChanged(oldAdmin, _newAdmin);
    }
}

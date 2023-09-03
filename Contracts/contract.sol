 SPDX-License-Identifier MIT
pragma solidity ^0.8.0;

contract DigitalAssetMarketplace {
    struct DigitalAsset {
        uint256 id;
        address owner;
        string name;
        string description;
        uint256 price;
        bool isAvailable;
    }

    DigitalAsset[] public digitalAssets;
    mapping(uint256 = address) public assetIdToSeller;
    mapping(address = uint256[]) public userToAssets;
    mapping(uint256 = uint256) public assetIdToIndex;

    event AssetListed(uint256 indexed assetId, address indexed seller, string name, uint256 price);
    event AssetSold(uint256 indexed assetId, address indexed seller, address indexed buyer, uint256 price);

    uint256 public nextAssetId = 1;

    function listAsset(string memory _name, string memory _description, uint256 _price) external {
        require(_price  0, Price must be greater than 0);
        DigitalAsset memory newAsset = DigitalAsset({
            id nextAssetId,
            owner msg.sender,
            name _name,
            description _description,
            price _price,
            isAvailable true
        });

        digitalAssets.push(newAsset);
        assetIdToSeller[nextAssetId] = msg.sender;
        userToAssets[msg.sender].push(nextAssetId);
        assetIdToIndex[nextAssetId] = digitalAssets.length - 1;
        nextAssetId++;

        emit AssetListed(newAsset.id, newAsset.owner, newAsset.name, newAsset.price);
    }

    function buyAsset(uint256 _assetId) external payable {
        require(_assetId  0 && _assetId  nextAssetId, Invalid asset ID);
        DigitalAsset storage asset = digitalAssets[assetIdToIndex[_assetId]];
        require(asset.isAvailable, Asset is not available);
        require(msg.value == asset.price, Incorrect payment amount);

        address payable seller = payable(asset.owner);
        seller.transfer(msg.value);

        asset.isAvailable = false;
        userToAssets[msg.sender].push(_assetId);

        emit AssetSold(asset.id, seller, msg.sender, asset.price);
    }

    function getAssetCount() external view returns (uint256) {
        return digitalAssets.length;
    }

    function getUserAssets() external view returns (uint256[] memory) {
        return userToAssets[msg.sender];
    }
}
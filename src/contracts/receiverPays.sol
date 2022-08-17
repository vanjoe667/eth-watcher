// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract ReceiverPays {
    address owner = msg.sender;

    mapping(uint256 => bool) usedNonces;

    constructor() payable {}

    function claimPayment(uint256 amount, uint256 nonce, bytes memory signature) public {
        require(!usedNonces[nonce]);
        usedNonces[nonce] = true;

        // this recreates the message that was signed on the client
        bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, amount, nonce, this)));

        require(recoverSigner(message, signature) == owner);

        payable(msg.sender).transfer(amount);
    }

    /// destroy the contract and reclaim the leftover funds.
    function shutdown() public {
        require(msg.sender == owner);
        selfdestruct(payable(msg.sender));
    }

    /// signature methods.
    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}

///////////////////////////////


// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract MetaCoin is ERC20 {

//   string public name = "MetaCoin";
//   string public symbol = "MC";
//   uint8 public decimals = 0;

  uint256 totalSupply_;
  mapping(address => uint256) balances;
  mapping (address => uint256) public replayNonce;

  constructor(uint256 total) payable ERC20("MetaCoin","MC") {
      totalSupply_ = total;
      balances[msg.sender] = totalSupply_;
  }


  function metaTransfer(bytes memory signature, address to, uint256 value, uint256 nonce) public returns (bool) {
    bytes32 metaHash = metaTransferHash(to,value,nonce);
    address signer = getSigner(metaHash,signature);
    //make sure signer doesn't come back as 0x0
    require(signer!=address(0));
    require(nonce == replayNonce[signer]);
    replayNonce[signer]++;
    _transfer(signer, to, value);
    
    return true;
  }
  function metaTransferHash(address to, uint256 value, uint256 nonce) public view returns(bytes32){
    return keccak256(abi.encodePacked(address(this),"metaTransfer", to, value, nonce));
  }


  function getSigner(bytes32 _hash, bytes memory _signature) internal pure returns (address){
    bytes32 r;
    bytes32 s;
    uint8 v;
    if (_signature.length != 65) {
      return address(0);
    }
    assembly {
      r := mload(add(_signature, 32))
      s := mload(add(_signature, 64))
      v := byte(0, mload(add(_signature, 96)))
    }
    if (v < 27) {
      v += 27;
    }
    if (v != 27 && v != 28) {
      return address(0);
    } else {
      return ecrecover(keccak256(
        abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash)
      ), v, r, s);
    }
  }

}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20, BaseRelayRecipient {
    address public deployer;
  
    constructor(address forwarder) ERC20("ScalexToken", "STX") {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        trustedForwarder = forwarder;
        deployer = msgSender;
        _mint(msg.sender, 100 * 10**uint(decimals()));
    }
    
    function getTrustedForwarder() public override view returns(address) {
        return trustedForwarder;
    }

    function setTrustedForwarder(address forwarder) public {
        require(_msgSender() == deployer, "Only deployer can update it");

        trustedForwarder = forwarder;
    }
}


////////////////////////////////////


// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol";

contract MyToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10**uint(decimals()));
    }
}




// // pragma solidity >=0.7.0 <0.9.0;
// pragma solidity ^0.6.2;

// // import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
// // import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/IERC20Metadata.sol";
// // import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
// // import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Context.sol";

// import "https://github.com/opengsn/forwarder/blob/master/contracts/BaseRelayRecipient.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/ERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/GSN/Context.sol";

// contract MyToken is ERC20 {
//     address public deployer;
  
//     constructor(address forwarder) ERC20("ScalexToken", "STX") {
//         // Mint 100 tokens to msg.sender
//         // Similar to how
//         // 1 dollar = 100 cents
//         // 1 token = 1 * (10 ** decimals)
//         trustedForwarder = forwarder;
//         deployer = msgSender;
//         _mint(msg.sender, 100 * 10**uint(decimals()));
//     }
    
//     function getTrustedForwarder() public override view returns(address) {
//         return trustedForwarder;
//     }

//     function setTrustedForwarder(address forwarder) public {
//         require(_msgSender() == deployer, "Only deployer can update it");

//         trustedForwarder = forwarder;
//     }
// }

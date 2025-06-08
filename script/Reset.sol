// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {TugWar} from '../src/contracts/TugWar.sol';
import {Script} from 'forge-std/Script.sol';

contract TugWarReset is Script {
  /// @notice Deployment parameters for each chain
  mapping(uint256 _chainId => address tugWar) internal _deployedSmartContract;

  function setUp() public {

    // Monad Testnet
    _deployedSmartContract[10_143] = 0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e;

    // Localnet
    _deployedSmartContract[31_337] = 0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e;
  }

  function run() public {
    address tugWar = _deployedSmartContract[block.chainid];


    vm.startBroadcast();
    TugWar tugWarContract = TugWar(tugWar);
    // tugWarContract.reSet(5);
    vm.stopBroadcast();
  }
}

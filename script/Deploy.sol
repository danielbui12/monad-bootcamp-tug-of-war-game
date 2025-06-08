// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {TugWar} from '../src/contracts/TugWar.sol';
import {Script} from 'forge-std/Script.sol';

contract Deploy is Script {
  struct DeploymentParams {
    address owner;
  }

  /// @notice Deployment parameters for each chain
  mapping(uint256 _chainId => DeploymentParams _params) internal _deploymentParams;

  function setUp() public {

    // Monad Testnet
    _deploymentParams[10_143] = DeploymentParams(msg.sender);

    // Localnet
    _deploymentParams[31_337] = DeploymentParams(msg.sender);
  }

  function run() public {
    DeploymentParams memory _params = _deploymentParams[block.chainid];

    vm.startBroadcast();
    new TugWar(_params.owner);
    vm.stopBroadcast();
  }
}

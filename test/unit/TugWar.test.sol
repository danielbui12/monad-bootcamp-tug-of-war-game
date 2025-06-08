// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../src/contracts/TugWar.sol";

contract TugWarContractTest is Test {
  TugWar public tugWarContract;

  function setUp() public {
    tugWarContract = new TugWar();
  }
}

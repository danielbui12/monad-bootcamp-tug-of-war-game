// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../src/contracts/TugWar.sol";

contract TugWarContractTest is Test {
  TugWar public tugWarContract;

  function setUp() public {
    tugWarContract = new TugWar(vm.addr(1));
  }

  function testPull() public {
    tugWarContract.pull(true);  // team1
    require(tugWarContract.team1Score() == 1);
    require(tugWarContract.ropePosition() == -1);
  }

  function testPull2() public {
    tugWarContract.pull(false);  // team2
    require(tugWarContract.team2Score() == 1);
    require(tugWarContract.ropePosition() == 1);
  }

  function testGetRopePosition() public view {
    console.log(tugWarContract.ropePosition());
    require(tugWarContract.ropePosition() == 0);
  }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../src/contracts/TugWar.sol";

contract TugWarContractTest is Test {
  TugWar public tugWarContract;

  address public owner = vm.addr(1);
  address public player1 = vm.addr(2);
  address public player2 = vm.addr(3);

  function setUp() public {
    tugWarContract = new TugWar(owner);
  }

  // prefix
  // test*
  function test_pull() public {
    vm.prank(player1);
    uint8 team1ScoreBefore = tugWarContract.team1Score();
    tugWarContract.pull(true);
    uint8 team1ScoreAfter = tugWarContract.team1Score();
    assertEq(team1ScoreAfter, team1ScoreBefore + 1);
  }

  function test_pull_game_over() public {
    for (uint8 i = 0; i < 5; i++) {
      tugWarContract.pull(false);
    }
    uint8 winStatus = tugWarContract.getWinStatus();
    assertEq(winStatus, 2);

    vm.expectRevert();
    tugWarContract.pull(false);
  }

  function test_reSet() public {
    vm.prank(player2);
    vm.expectRevert();
    tugWarContract.reSet(5);

    vm.prank(owner);
    tugWarContract.reSet(10);

    assertEq(tugWarContract.maxScoreDifference(), 10);
  }

  function test_reSet_fuzzing(uint8 randomMaxScoreDifference) public {
    vm.prank(owner);
    tugWarContract.reSet(randomMaxScoreDifference);

    assertEq(tugWarContract.maxScoreDifference(), randomMaxScoreDifference);
  }

}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

contract TugWar {
  int8 public ropePosition;
  uint8 public team1Score;
  uint8 public team2Score;
  uint8 public maxScoreDifference = 5;
  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  function pull(bool isTeam1) public {
    if (team1Score < team2Score) {
      require(team2Score - team1Score < maxScoreDifference, 'Game Over');
    } else {
      require(team1Score - team2Score < maxScoreDifference, 'Game Over');
    }

    if (isTeam1) {
      team1Score++;
      ropePosition--;
    } else {
      team2Score++;
      ropePosition++;
    }
  }

  function getWinStatus() public view returns (uint8) {
    if (team2Score >= maxScoreDifference + team1Score) return 2;
    if (team1Score >= maxScoreDifference + team2Score) return 1;
    return 0;
  }

  function reSet(uint8 _maxScoreDifference) public onlyOwner {
    maxScoreDifference = _maxScoreDifference;
    team1Score = 0;
    team2Score = 0;
    ropePosition = 0;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, 'Not Owner');
    _;
  }
}

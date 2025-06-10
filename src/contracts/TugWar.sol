// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

contract TugWar {
  int8 public ropePosition;
  uint8  _team1Score;
  uint8  _team2Score;
  uint8 _maxScoreDifference = 5;
  
  address public owner;

  constructor(address initialOwner) {
    owner = initialOwner;
  }

  function pull(bool isTeam1) public {
    require(getWinStatus() == 0, "Game over");

    if (isTeam1) {
      _team1Score++;
    } else {
      _team2Score++;
    }
  }

  function getWinStatus() public view returns (uint8) {
    if (_team1Score >= _team2Score + _maxScoreDifference) {
      return 1;
    }
    if (_team2Score >= _team1Score + _maxScoreDifference) {
      return 2;
    }

    return 0;
  }

  // option2, khong can owner
  // chi can validate game da ket thuc chua
  function reSet(uint8 __maxScoreDifference) onlyOwner public {
    ropePosition = 0;
    _team1Score = 0;
    _team2Score = 0;
    _maxScoreDifference = __maxScoreDifference;
  }

  function team1Score() public view returns (uint8) {
    return _team1Score;
  }

  function team2Score() public view returns (uint8) {
    return _team2Score;
  }

  function maxScoreDifference() public view returns (uint8) {
    return _maxScoreDifference;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only Owner");
    _;
  }
}

pragma solidity ^0.4.2;

contract TokenSale {

  uint public fundingLimit;
  uint public startTime;
  address public recipient;

  event Purchase(address purchaser, uint amount);

  function TokenSale(
    address _recipient,
    uint _limit,
    uint _start
  ) {
    fundingLimit = _limit;
    recipient = _recipient;
    startTime = _start;
  }

  function phaseOneEnd()
  constant returns (uint) {
    return startTime + 1 weeks;
  }

  function phaseTwoEnd()
  constant returns (uint) {
    return startTime + 2 weeks;
  }

  function phaseThreeEnd()
  constant returns (uint) {
    return startTime + 4 weeks;
  }

  function () payable {
    if (recipient.send(msg.value)) {
      Purchase(msg.sender, msg.value);
    }
  }

}
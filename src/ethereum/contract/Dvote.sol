pragma solidity ^0.4.17;

contract Dvote {
    address public manager;
    string public contractName;
    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }
    CandidateInfo[] public Candidates;
    mapping(address => bool) public voted;

    struct CandidateInfo {
        string  name;
        uint voteCount;
    }

    function getCandidatesCount() public view returns (uint) {
        return Candidates.length;
    }


    function Dvote ( string memory _name) {
        manager = msg.sender;
        contractName = _name;
    }

    function addCandidate ( string memory newCandidateName) public managerOnly {
        CandidateInfo memory newCandidate = CandidateInfo({
            name: newCandidateName,
            voteCount:0
        });
        Candidates.push(newCandidate);
        // CandidateInfo storage newCandidate = Candidates.push();
        // newCandidate.name = newCandidateName;
    }

    function vote (uint index) public {
        require(!voted[msg.sender]);
        CandidateInfo storage candidate = Candidates[index];
        candidate.voteCount++;
        voted[msg.sender] = true;
    } 

    function finalize()  public view managerOnly returns (string memory) {
        uint mostVotes = 0;
        string memory winner = ' NO WINNER AT THIS TIME';
        for (uint i = 0; i < Candidates.length; i++) {
            if (Candidates[i].voteCount > 0 && Candidates[i].voteCount >= mostVotes){
                if (Candidates[i].voteCount > mostVotes) {
                    mostVotes = Candidates[i].voteCount;
                    winner = Candidates[i].name; 
                } else {
                    mostVotes = Candidates[i].voteCount;
                    winner = 'No winner at this time';
                }

                
                

            }
        }
        return winner;
    }
}
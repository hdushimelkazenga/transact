pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

/**
 * The Transact contract does this and that...
 */
contract Transact {
	struct landTitle {
		uint n;
		string province;
		string district;
		string landNo;
		address owner;
		
	}
	event Thappened(uint _p);
	event fail(landTitle p);
	mapping (string => address)  landtoOwner;
	
	landTitle[] public lands;
	//constructor
	constructor () public{

		lands.push(landTitle(1,"kigali","kicukiro","KK 353 st 32",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		
		lands.push(landTitle(2,"Eastern","Ngoma","Kb 3 st 212",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		lands.push(landTitle(3,"kigali","Nyarugenge","KG 15 st 144",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		lands.push(landTitle(4,"kigali","Gasabo","Kk 123 st 78",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		lands.push(landTitle(5,"Eastern", "Rubavu","GK 3123 st 8",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		lands.push(landTitle(6,"South","Huye","BT 14 st 56",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		lands.push(landTitle(7,"kigali","kicukiro","KK 48 st 45",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		lands.push(landTitle(8,"Nothern","Gicumbi","RB 12 st 78",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		lands.push(landTitle(9,"kigali", "Gasabo","KK 213 st 311",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		lands.push(landTitle(10,"kigali","Nyarugenge","KK 35 st 100",0x90238A3FD960dbCFbF6d2114FA67231aCc752e53));
		
		for(uint i = 0; i< lands.length ; i++)
		{
			
			landtoOwner[lands[i].landNo] = 0x90238A3FD960dbCFbF6d2114FA67231aCc752e53;
		}
	}
		uint public k = lands.length;


	function changeOwner (uint l, address newOwner) public returns(bool) 
	{
		
			emit Thappened(l);
			if(validate(lands[ l-1 ]))
		{
		
			lands[l-1].owner = newOwner;
			
			return true;
			
		}

		return false;
		}
		function validate (landTitle memory l) public returns (bool) 
		{
			//if(landtoOwner[l.landNo] == msg.sender)
			if(l.owner == msg.sender)
				{return true;}
				emit fail(l);
			return false;	
		}
			
}


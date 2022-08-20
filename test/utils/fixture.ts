import { deployContract, Fixture } from "ethereum-waffle";

import * as SafemoonJSON from "../../artifacts/contracts/Safemoon.sol/Safemoon.json";
import { Safemoon } from "typechain";
import { ethers } from "ethers";

interface IFixture {
  safemoon: Safemoon;
}

export const fixture: Fixture<IFixture | any> = async ([wallet, account1, , account2], _) => {
  const safemoon = (await deployContract(wallet as any, SafemoonJSON)) as unknown as Safemoon;
  await safemoon.initialize(/* router address */ ethers.constants.AddressZero);

  return {
    safemoon,
  };
};

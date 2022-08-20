import { deployContract, Fixture } from "ethereum-waffle";

import * as SafemoonJSON from "../../artifacts/contracts/Safemoon.sol/Safemoon.json";
import * as FactoryJson from "../../artifacts/contracts/mock/factory/SafeswapFactory.sol/SafeswapFactory.json";
import * as RouterJson from "../../artifacts/contracts/mock/router/SafeswapRouter.sol/SafeswapRouter.json";
import * as WETH9Json from "../../artifacts/contracts/mock/router/WETH9.sol/WETH9.json";
import { Safemoon, SafeswapFactory, SafeswapRouter, WETH9 } from "typechain";
import { ethers } from "ethers";

interface IFixture {
  safemoon: Safemoon;
}

export const fixture: Fixture<IFixture | any> = async ([wallet, account1, , account2], _) => {
  // const
  const weth = (await deployContract(wallet as any, WETH9Json)) as unknown as WETH9;
  const safemoon = (await deployContract(wallet as any, SafemoonJSON)) as unknown as Safemoon;
  const factory = (await deployContract(wallet as any, FactoryJson, [account1.address])) as unknown as SafeswapFactory;
  const router = (await deployContract(wallet as any, RouterJson, [
    factory.address,
    weth.address,
  ])) as unknown as SafeswapRouter;
  await safemoon.initialize(/* router address */ router.address);

  return {
    safemoon,
    account1,
    account2,
  };
};
